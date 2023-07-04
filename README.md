# wmr-demo

Sample [WMR](https://wmr.dev/) project

WMR is a toolchain that supports _unbundled development_. Google that for 
more info. 

In a nutshell, unbundled web apps rely on in-browser support for 
ES Modules instead of running a bundler like Webpack. The problem, currently, 
is that the web developer community relies on NPM modules - and they don't load
easily from their landing place in the `node_modules` folder. _Import Maps_ 
help with that, but leave the developer to discover and map the files.

> The sole purpose behind designing Snowpack 1.0 was very simple — _install npm
packages to run directly in the browser_.

- [Snowpack — What is Unbundled Development?](https://medium.com/habilelabs/snowpack-what-is-unbundled-development-8562205d0539)

## WMR vs Snowpack

This is a variation of my earlier 
[snowpack-demo](https://github.com/sgamon/snowpack-demo) project.
Snowpack, sadly, is abandoned. 

WMR is part of the Preact project, so its installer assumes you are using
Preact. Ths demo assumes the use of W3C Web Components.  

### import maps and bare imports

If you look at the `index.js` file, you will the use ofe bare imports. How
is this possible?

Both WMR and Snowpack support bare imports, but they map the imports in their
own config files, rather than use a standard import map. In this sample repo,
I moved the aliases to `alias.mjs`, to make it easy to update using
helper scripts. This file is imported in the standard `wmr.config.js` file.

Maintaining alias definitions is a side-chore, so I provided generator scripts
that create module and component files, and the alias definition at the same
time.

## What is this demo?

This is a minimal WMR project. It suggests a sensible folder structure.
Two sample modules are loaded - both print output to the browser console. Also,
a sample web component, made with [Lit](https://lit.dev/), is included.
Finally, there is an animation effect provided by a NPM module.

### /public/index.html

A spare file to host the demo. Loads `index.js` with type `module` to 
activate ES Module support. Also, note the web component, 
`<hello-world-element>`.

### /public/index.js

This is where all the importing happens. Note the imports do not use paths, but
instead use bare import specifiers. This is not enabled by import maps, but
with WRM's own alias settings in `wmr.config.js`.

### /public/modules/*

There is a javascript file, `hello-world.js`, and a typescript file, 
`hello-from-typescript.ts`. Both print a greeting to the browser console. Note
that typescript "just works" with no setup or fiddling.

### /public/components/hello-world-element.js

This is a web component, created with Lit Element.

### /wmr.config.js

Basic config file, but imports aliases from an external module.

### /dist

When you run WMR's build system (`npm run build`), it delivers the files to
this folder. This is what you would deliver to your production website. For
example, if you use AWS Amplify, you would zip this folder and deploy it.

Use `npm run test` to serve the files in this folder. The sample repo includes
built files so you can see the compiled result without running the build
command.

### /bin

Helper scripts.

## NPM Commands

### start

Runs WRM dev server, which monitors the `node_modules` folder, and
reloads the browser on code changes. Beware though - it is easy to crash the
dev server with code errors. Be prepared to restart it frequently.

### build

This command will pick off NPM modules, transpile typescript, and create a 
deployable app (aka, site) in the `build` folder.

## Code Generators

### Components

    npm run new-component <component-name>

Creates a stub file in the `components` folder, and adds an alias to the 
config file.

### Modules

    npm run new-module <moduleName>

Creates a stub file in the `modules` folder, and adds an alias to the 
config file.

