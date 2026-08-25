# bare-ansi-escapes

Parse and produce ANSI escape sequences.

```
npm i bare-ansi-escapes
```

## Usage

```js
const KeyDecoder = require('bare-ansi-escapes/key-decoder')

readableStream.pipe(new KeyDecoder()).on('data', (key) => console.log(key))
```

## API

See the [`bare-ansi-escapes` reference][reference].

[reference]: https://docs.pears.com/reference/bare/modules/bare-ansi-escapes

## License

Apache-2.0
