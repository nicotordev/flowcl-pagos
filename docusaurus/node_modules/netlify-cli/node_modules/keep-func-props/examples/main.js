// Demo of the main usage.
// This file can be directly run:
//   - first install `keep-func-props`
//   - then `node node_modules/keep-func-props/examples/main.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/keep-func-props

import keepFuncProps from 'keep-func-props'

// Any function wrapper works
const wrapper = function (anyFunction) {
  return (...args) => anyFunction(...args)
}

// `betterWrapper` is like `wrapper` but it keeps the function properties
const betterWrapper = keepFuncProps(wrapper)

const getTrue = () => true

// Function `name` and other properties are kept
console.log(getTrue) // `[Function: getTrue]`
console.log(wrapper(getTrue)) // `[Function (anonymous)]`
console.log(betterWrapper(getTrue)) // `[Function: getTrue]`

// Function body is kept when stringified
console.log(String(getTrue)) // () => true
console.log(String(wrapper(getTrue))) // (...args) => anyFunction(...args)
console.log(String(betterWrapper(getTrue)))
// /* Wrapped */
// () => true
