# cn-translator-cli

[![Greenkeeper badge](https://badges.greenkeeper.io/WindomZ/cn-translator-cli.svg)](https://greenkeeper.io/)
Translator for Chinese command-line interfaces

![v0.1.2](https://img.shields.io/badge/version-v0.1.2-orange.svg)
![status](https://img.shields.io/badge/status-beta-yellow.svg)

Inspired by <[axetroy/translate-cli](https://github.com/axetroy/translate-cli)>

## Installation

```bash
npm install -g cn-translator-cli
```

## Usage

**tfc** is short for *Translator for Chinese*

```bash
$ tfc -h

  Usage: tfc [options] [contents...]

  translator for Chinese

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -f, --from <lang>          From Language, short locale name(e.g. en, zh)
    -t, --to <lang>            To Language, short locale name(e.g. zh, en)
    -p, --platform <platform>  Translation platform(e.g. baidu, youdao, google
```

## Example

```bash
$ tfc 你好世界
# >>> Hello world

$ tfc 'Hello world'
# >>> 你好世界
```

## License

The [MIT License](https://github.com/WindomZ/cn-translator-cli/blob/master/LICENSE)
