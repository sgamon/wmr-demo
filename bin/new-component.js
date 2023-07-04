let fs = require('fs')
let path = require('path')
let kebabCase = require('lodash.kebabcase')
let camelCase = require('lodash.camelcase')

async function execute(){
  let config = await import('../alias.mjs')
  let newconfig = config.default
  // console.log(newconfig)
  // process.exit()

  let [name] = process.argv.slice(2)
  name = camelCase(name)
  let fileName = kebabCase(name)
  
  newconfig[fileName] = `../app/components/${fileName}`
  
  let componentSource = `
  import {LitElement, html} from 'lit';
  
  class ${name} extends LitElement {
    render() {
      return html\`hello world\`
    }
  }
  
  customElements.define('${fileName}', ${name})
  
  export default ${name}
  `.trim()
  let componentPath = path.resolve(__dirname, '..', 'app', 'components', `${fileName}.ts`)
  fs.writeFileSync(componentPath, componentSource)
  
  let configPath = path.resolve(__dirname, '..', 'alias.mjs')
  let configSource = `export default  ${JSON.stringify(newconfig, null, 2)}`.trim()
  fs.writeFileSync(configPath, configSource)
  
  console.log(`
    created ${fileName} in ./app/components/${fileName}.ts
    restart dev server to add named import
  `)
}

execute()
