# Get Package Name

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/get-package-name/blob/main/LICENSE) [![Build Status](https://travis-ci.org/i-like-robots/get-package-name.svg?branch=main)](https://travis-ci.org/i-like-robots/get-package-name) [![npm version](https://img.shields.io/npm/v/get-package-name.svg?style=flat)](https://www.npmjs.com/package/get-package-name)

Extracts the name of a package from its file path.

```js
const getPackageName = require('get-package-name')
getPackageName('./project/node_modules/@babel/parser/lib/index.js') // @babel/parser
```


## Installation

This is a [Node.js] package available through the [npm] registry. Before installing, download and install Node.js. Node.js 12 or higher is required.

Installation is done using the [npm install] command:

```sh
$ npm install --save-dev get-package-name
```

[Node.js]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[npm install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally


## API

### getPackageName(modulePath, [moduleFolder])

Returns the package name for the given module file path.

#### modulePath

An absolute or relative path to a module.

#### moduleFolder

The name of the folder in which packages are installed. Defaults to `"node_modules"`.


## License

This package is MIT licensed.
