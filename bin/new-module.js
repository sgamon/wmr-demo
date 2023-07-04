let fs = require('fs')
let path = require('path')
let camelCase = require('lodash.camelcase')

async function execute(){
  let config = await import('../alias.mjs')
  let newconfig = config.default

  let [name] = process.argv.slice(2)
  // preserve case of fist letter, in case we are naming a class
  let firstLetter = name.charAt(0)
  let fileName = firstLetter + camelCase(name).slice(1)

  newconfig[name] = `../app/modules/${fileName}`

  let moduleSource = `
  export function ${name}() {
    
  }
  `.trim()
  let modulePath = path.resolve(__dirname, '..', 'app', 'modules', `${fileName}.ts`)
  fs.writeFileSync(modulePath, moduleSource)

  let configPath = path.resolve(__dirname, '..', 'alias.mjs')
  let configSource = `export default  ${JSON.stringify(newconfig, null, 2)}`.trim()
  fs.writeFileSync(configPath, configSource)

  console.log(`
    created ${fileName} in ./app/modules/${fileName}.ts
    restart dev server to add named import
  `)
}

execute()