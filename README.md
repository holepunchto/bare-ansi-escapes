# bare-ansi-escapes

Parse and produce ANSI escape sequences.

```
npm i bare-ansi-escapes
```

## Usage

``` js
const ansiEscapes = require('bare-ansi-escapes')

readableStream
  .pipe(new ansiEscapes.KeyDecoder())
  .on('data', (key) => console.log(key))
```

## License

Apache-2.0
