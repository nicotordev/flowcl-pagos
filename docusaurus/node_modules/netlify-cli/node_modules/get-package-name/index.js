const path = require('path')

/**
 * @param {string} modulePath Path to a module file
 * @param {string} [packageFolder="node_modules"] The dependency folder name
 * @return {string} The package name if it is found or undefined
 */
module.exports = function getPackageName(modulePath, packageFolder = 'node_modules') {
  if (typeof modulePath === 'string' && modulePath.includes(packageFolder)) {
    const segments = modulePath.split(path.sep)
    const index = segments.lastIndexOf(packageFolder)

    if (index > -1) {
      const name = segments[index + 1] || ''
      const scopedName = segments[index + 2] || ''

      if (name[0] === '@') {
        return scopedName ? `${name}/${scopedName}` : undefined
      }

      if (name) {
        return name
      }
    }
  }
}
