# require-under
[![Unix Build Status](https://img.shields.io/travis/whitfin/require-under.svg?label=unix)](https://travis-ci.org/whitfin/require-under) [![Windows Build Status](https://img.shields.io/appveyor/ci/whitfin/require-under.svg?label=win)](https://ci.appveyor.com/project/whitfin/require-under)

Simple module to allow registration of namespaces to make your require statements easier to understand. The code itself is tiny, it's just on `npm` to satisfy a need I can't seem to find in existing packages (whilst keeping things simple).

### Examples

```javascript
// require the library module
var under = require('require-under');

// create a new require function
var requireUnder = under.wrap({
  src: process.cwd() + '/src'
});

// require normal modules
requireUnder('some-module');

// require something in /src
requireUnder('src', 'my-module.js');

// optional: assign to the global require
global.require = requireUnder;
```

### Notes

Some people hate doing this (which is fair enough), but I find that it provides an easy abstraction which allows you to move files around any only change paths in a single place. If you don't like it, don't use it :)
