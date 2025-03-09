[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/colors-option.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/colors-option)
[![Build](https://github.com/ehmicky/colors-option/workflows/Build/badge.svg)](https://github.com/ehmicky/colors-option/actions)
[![Node](https://img.shields.io/node/v/colors-option.svg?logo=node.js)](https://www.npmjs.com/package/colors-option)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

Let users toggle colors.

This is a thin wrapper around the popular
[`chalk`](https://github.com/chalk/chalk) colors library that adds support for:

- A [`colors` boolean option](#colors)
- The [`NO_COLOR`](https://no-color.org/) and
  [`NODE_DISABLE_COLORS`](https://nodejs.org/api/cli.html#cli_node_disable_colors_1)
  environment variables

# Example

```js
import colorsOption from 'colors-option'

const exampleLibrary = function ({ colors, ...otherLibraryOptions }) {
  const chalk = colorsOption({ colors })
  console.log(chalk.red('example'))
}
```

# Install

```
npm install colors-option
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## colorsOption(options?)

`options`: `object`\
_Return value_: [`Chalk` instance](https://github.com/chalk/chalk#api)

### options

#### colors

_Type_: `boolean`\
_Default_: `undefined`

Whether colors should be enabled/disabled, regardless of terminal support.
Colors support is automatically detected, so this is only meant to override that
default behavior.

The recommended approach is to:

- Add a `colors` boolean programmatic option and/or CLI flag
- Keep its default value `undefined`
- Forward it to `colors-option`

Instead of using
[`chalk/supports-color`](https://github.com/chalk/supports-color), this relies
on Node.js built-in colors detection
[`getColorDepth()`](https://nodejs.org/api/tty.html#tty_writestream_getcolordepth_env)
which:

- Supports the [`NO_COLOR`](https://no-color.org/) and
  [`NODE_DISABLE_COLORS`](https://nodejs.org/api/cli.html#cli_node_disable_colors_1)
  environment variables.
- Does not guess colors detection based on the presence of a
  [`--colors` CLI flag](https://github.com/chalk/supports-color#info). This
  gives finer control and flexibility over how to expose this as a CLI flag.

Please note that `chalk` has a similar
[`level` option](https://github.com/chalk/chalk#chalklevel). However, that
option is an integer from `0` to `3` which makes it hard to toggle colors while
still keeping 256 colors or Truecolor.

#### stream

_Type_:
[`Stream`](https://nodejs.org/api/stream.html#stream_class_stream_writable)\
_Default_: [`process.stdout`](https://nodejs.org/api/process.html#process_process_stdout)

Stream used to detect colors support. This should be the file or terminal where
the colors are output.

# See also

- [`terminal-theme`](https://github.com/ehmicky/terminal-theme): 🎨 Use a color
  theme for your code's terminal output.

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!--
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/colors-option/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/colors-option/commits?author=ehmicky" title="Documentation">📖</a></td>
  </tr>
</table>

-->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
