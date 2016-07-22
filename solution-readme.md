# Installation
- `brew install node`
- `npm install`
- `./node_modules/.bin/babel src/es6 --out-dir src/transpiled && ./node_modules/.bin/browserify src/transpiled/GildedRose.js --standalone GildedRose > src/GildedRose.js`