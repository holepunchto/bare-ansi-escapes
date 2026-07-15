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

## License

Apache-2.0

<!-- bare-refgen:api start -->
## API

### Functions

#### `cursorUp(n?: number): string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L6)

Return the ANSI escape sequence that moves the cursor up `n` lines.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `n?` | `number` | — | Number of lines to move up; defaults to `1`. |

#### `cursorDown(n?: number): string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L7)

Return the ANSI escape sequence that moves the cursor down `n` lines.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `n?` | `number` | — | Number of lines to move down; defaults to `1`. |

#### `cursorForward(n?: number): string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L8)

Return the ANSI escape sequence that moves the cursor forward `n` columns.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `n?` | `number` | — | Number of columns to move forward; defaults to `1`. |

#### `cursorBack(n?: number): string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L9)

Return the ANSI escape sequence that moves the cursor back `n` columns.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `n?` | `number` | — | Number of columns to move back; defaults to `1`. |

#### `cursorNextLine(n?: number): string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L10)

Return the ANSI escape sequence that moves the cursor to the start of the line `n` lines down.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `n?` | `number` | — | Number of lines down to move; defaults to `1`. |

#### `cursorPreviousLine(n?: number): string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L11)

Return the ANSI escape sequence that moves the cursor to the start of the line `n` lines up.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `n?` | `number` | — | Number of lines up to move; defaults to `1`. |

#### `cursorPosition(column: number, row?: number): string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L13)

Return the ANSI escape sequence that moves the cursor to `column` and, if given, `row`.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `column` | `number` | — | Zero-based column to move the cursor to. |
| `row?` | `number` | — | Zero-based row to move the cursor to; defaults to `0` (the current row). |

#### `scrollUp(n?: number): string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L22)

Return the ANSI escape sequence that scrolls the display up `n` lines.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `n?` | `number` | — | Number of lines to scroll the display up; defaults to `1`. |

#### `scrollDown(n?: number): string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L23)

Return the ANSI escape sequence that scrolls the display down `n` lines.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `n?` | `number` | — | Number of lines to scroll the display down; defaults to `1`. |

### Constants and variables

#### `constants: { ESC: string; CSI: string; SGR: (n: number) => string }`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L1)

The raw escape sequence building blocks: `ESC`, `CSI`, and the `SGR` (Select Graphic Rendition) sequence builder.

#### `cursorHide: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L3)

ANSI escape sequence that hides the cursor.

#### `cursorShow: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L4)

ANSI escape sequence that shows the cursor.

#### `eraseDisplayEnd: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L15)

ANSI escape sequence that erases the display from the cursor to the end.

#### `eraseDisplayStart: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L16)

ANSI escape sequence that erases the display from the start to the cursor.

#### `eraseDisplay: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L17)

ANSI escape sequence that erases the entire display.

#### `eraseLineEnd: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L18)

ANSI escape sequence that erases the line from the cursor to the end.

#### `eraseLineStart: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L19)

ANSI escape sequence that erases the line from the start to the cursor.

#### `eraseLine: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L20)

ANSI escape sequence that erases the entire line.

#### `modifierReset: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L25)

SGR escape sequence that resets all modifiers.

#### `modifierBold: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L26)

SGR escape sequence that enables bold text.

#### `modifierDim: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L27)

SGR escape sequence that enables dim text.

#### `modifierItalic: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L28)

SGR escape sequence that enables italic text.

#### `modifierUnderline: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L29)

SGR escape sequence that enables underlined text.

#### `modifierNormal: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L30)

SGR escape sequence that resets bold/dim to normal intensity.

#### `modifierNotItalic: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L31)

SGR escape sequence that disables italic text.

#### `modifierNotUnderline: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L32)

SGR escape sequence that disables underlined text.

#### `colorBlack: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L34)

SGR escape sequence that sets the foreground color to black.

#### `colorRed: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L35)

SGR escape sequence that sets the foreground color to red.

#### `colorGreen: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L36)

SGR escape sequence that sets the foreground color to green.

#### `colorYellow: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L37)

SGR escape sequence that sets the foreground color to yellow.

#### `colorBlue: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L38)

SGR escape sequence that sets the foreground color to blue.

#### `colorMagenta: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L39)

SGR escape sequence that sets the foreground color to magenta.

#### `colorCyan: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L40)

SGR escape sequence that sets the foreground color to cyan.

#### `colorWhite: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L41)

SGR escape sequence that sets the foreground color to white.

#### `colorDefault: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L42)

SGR escape sequence that resets the foreground color to the default.

#### `colorBrightBlack: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L43)

SGR escape sequence that sets the foreground color to bright black.

#### `colorBrightRed: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L44)

SGR escape sequence that sets the foreground color to bright red.

#### `colorBrightGreen: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L45)

SGR escape sequence that sets the foreground color to bright green.

#### `colorBrightYellow: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L46)

SGR escape sequence that sets the foreground color to bright yellow.

#### `colorBrightBlue: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L47)

SGR escape sequence that sets the foreground color to bright blue.

#### `colorBrightMagenta: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L48)

SGR escape sequence that sets the foreground color to bright magenta.

#### `colorBrightCyan: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L49)

SGR escape sequence that sets the foreground color to bright cyan.

#### `colorBrightWhite: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/index.d.ts#L50)

SGR escape sequence that sets the foreground color to bright white.

## `bare-ansi-escapes/key-decoder`

### KeyDecoder

#### `new KeyDecoder(opts?: KeyDecoderOptions)`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L19)

Create a `KeyDecoder`, optionally configuring the input `encoding` and `escapeCodeTimeout`.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `opts?` | `KeyDecoderOptions` | — | Options controlling the `encoding` and `escapeCodeTimeout` used to decode input; see `KeyDecoderOptions`. |

#### `encoding: BufferEncoding`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L15)

The encoding used to decode incoming byte data into characters.

### Key

#### `new Key(name: string | number, sequence: string, ctrl: boolean, meta: boolean, shift: boolean)`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L31)

Create a `Key` with the given `name`, raw `sequence`, and modifier flags.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string \| number` | — | The decoded key name, e.g. `'up'`, `'return'`, or a single character. |
| `sequence` | `string` | — | The raw input sequence the key was decoded from. |
| `ctrl` | `boolean` | — | Whether the Ctrl modifier was held. |
| `meta` | `boolean` | — | Whether the Meta (Alt) modifier was held. |
| `shift` | `boolean` | — | Whether the Shift modifier was held. |

#### `ctrl: boolean`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L25)

Whether the Ctrl modifier was held.

#### `meta: boolean`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L26)

Whether the Meta (Alt) modifier was held.

#### `name: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L23)

The decoded key name, e.g. `'up'`, `'return'`, or a single character.

#### `sequence: string`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L24)

The raw input sequence the key was decoded from.

#### `shift: boolean`

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L27)

Whether the Shift modifier was held.

### Types

#### `KeyDecoderOptions`

```ts
interface KeyDecoderOptions {
  encoding?: BufferEncoding
  escapeCodeTimeout?: number
}
```

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L4)

#### `KeyDecoderEvents`

```ts
interface KeyDecoderEvents extends TransformEvents {
  data: [key: Key]
}
```

[source](https://github.com/holepunchto/bare-ansi-escapes/blob/v2.2.3/key-decoder.d.ts#L9)
<!-- bare-refgen:api end -->