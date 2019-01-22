[![Build Status](https://dev.azure.com/PiotrLadonski/DotFall/_apis/build/status/dotfall%20-%201%20-%20CI?branchName=master)](https://dev.azure.com/PiotrLadonski/DotFall/_build/latest?definitionId=2?branchName=master)

# DotFall
Simple game written using Phaser 3 and Typescript.
Main aim is to fall with the ball as long as you can.

To build the game, run `npm install` in project root and then
- `gulp` for one-time production build with minifying and obfuscating
- `gulp watch` for continuous watching for changes (useful for development)

To launch the game, open created `dist/index.html`.
<br/>Build process is poorly configured, so after adding new file to `src` your need to restart gulp.

### Gulp tasks
- `bundle` - creates uglified and obfuscated `bundle.js` file in `dist` directory from all `.ts` files in `src`
- `copy-html` - copies all `.html` files from `src` to `dist`
- `copy-css` - copies all `.css` files from `src` to `dist`
- `copy-assets` - copies `assets` folder from `src` to `dist`
- `copy-other` - copies `.png`,`.xml`,`.ico`,`.svg`,`.webmanifest` files from `src` to `dist` (favicon files)
- `copy-all` - runs `copy-html`, `copy-css`, `copy-assets` and `copy-other` at once
- `watch` - runs `copy-all` once and then looks for changes in `.ts` files. On detection runs bundling, but without uglifying and obfuscating. Needs breaking with keyboard interrupt to stop.
- `default` - runs `copy-all` and `bundle`
