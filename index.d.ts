/** The raw escape sequence building blocks: `ESC`, `CSI`, and the `SGR` (Select Graphic Rendition) sequence builder. */
export const constants: { ESC: string; CSI: string; SGR: (n: number) => string }

/** ANSI escape sequence that hides the cursor. */
export const cursorHide: string
/** ANSI escape sequence that shows the cursor. */
export const cursorShow: string

/**
 * Return the ANSI escape sequence that moves the cursor up `n` lines.
 * @param n - Number of lines to move up; defaults to `1`.
 */
export function cursorUp(n?: number): string
/**
 * Return the ANSI escape sequence that moves the cursor down `n` lines.
 * @param n - Number of lines to move down; defaults to `1`.
 */
export function cursorDown(n?: number): string
/**
 * Return the ANSI escape sequence that moves the cursor forward `n` columns.
 * @param n - Number of columns to move forward; defaults to `1`.
 */
export function cursorForward(n?: number): string
/**
 * Return the ANSI escape sequence that moves the cursor back `n` columns.
 * @param n - Number of columns to move back; defaults to `1`.
 */
export function cursorBack(n?: number): string
/**
 * Return the ANSI escape sequence that moves the cursor to the start of the line `n` lines down.
 * @param n - Number of lines down to move; defaults to `1`.
 */
export function cursorNextLine(n?: number): string
/**
 * Return the ANSI escape sequence that moves the cursor to the start of the line `n` lines up.
 * @param n - Number of lines up to move; defaults to `1`.
 */
export function cursorPreviousLine(n?: number): string

/**
 * Return the ANSI escape sequence that moves the cursor to `column` and, if given, `row`.
 * @param column - Zero-based column to move the cursor to.
 * @param row - Zero-based row to move the cursor to; defaults to `0` (the current row).
 */
export function cursorPosition(column: number, row?: number): string

/** ANSI escape sequence that erases the display from the cursor to the end. */
export const eraseDisplayEnd: string
/** ANSI escape sequence that erases the display from the start to the cursor. */
export const eraseDisplayStart: string
/** ANSI escape sequence that erases the entire display. */
export const eraseDisplay: string
/** ANSI escape sequence that erases the line from the cursor to the end. */
export const eraseLineEnd: string
/** ANSI escape sequence that erases the line from the start to the cursor. */
export const eraseLineStart: string
/** ANSI escape sequence that erases the entire line. */
export const eraseLine: string

/**
 * Return the ANSI escape sequence that scrolls the display up `n` lines.
 * @param n - Number of lines to scroll the display up; defaults to `1`.
 */
export function scrollUp(n?: number): string
/**
 * Return the ANSI escape sequence that scrolls the display down `n` lines.
 * @param n - Number of lines to scroll the display down; defaults to `1`.
 */
export function scrollDown(n?: number): string

/** SGR escape sequence that resets all modifiers. */
export const modifierReset: string
/** SGR escape sequence that enables bold text. */
export const modifierBold: string
/** SGR escape sequence that enables dim text. */
export const modifierDim: string
/** SGR escape sequence that enables italic text. */
export const modifierItalic: string
/** SGR escape sequence that enables underlined text. */
export const modifierUnderline: string
/** SGR escape sequence that resets bold/dim to normal intensity. */
export const modifierNormal: string
/** SGR escape sequence that disables italic text. */
export const modifierNotItalic: string
/** SGR escape sequence that disables underlined text. */
export const modifierNotUnderline: string

/** SGR escape sequence that sets the foreground color to black. */
export const colorBlack: string
/** SGR escape sequence that sets the foreground color to red. */
export const colorRed: string
/** SGR escape sequence that sets the foreground color to green. */
export const colorGreen: string
/** SGR escape sequence that sets the foreground color to yellow. */
export const colorYellow: string
/** SGR escape sequence that sets the foreground color to blue. */
export const colorBlue: string
/** SGR escape sequence that sets the foreground color to magenta. */
export const colorMagenta: string
/** SGR escape sequence that sets the foreground color to cyan. */
export const colorCyan: string
/** SGR escape sequence that sets the foreground color to white. */
export const colorWhite: string
/** SGR escape sequence that resets the foreground color to the default. */
export const colorDefault: string
/** SGR escape sequence that sets the foreground color to bright black. */
export const colorBrightBlack: string
/** SGR escape sequence that sets the foreground color to bright red. */
export const colorBrightRed: string
/** SGR escape sequence that sets the foreground color to bright green. */
export const colorBrightGreen: string
/** SGR escape sequence that sets the foreground color to bright yellow. */
export const colorBrightYellow: string
/** SGR escape sequence that sets the foreground color to bright blue. */
export const colorBrightBlue: string
/** SGR escape sequence that sets the foreground color to bright magenta. */
export const colorBrightMagenta: string
/** SGR escape sequence that sets the foreground color to bright cyan. */
export const colorBrightCyan: string
/** SGR escape sequence that sets the foreground color to bright white. */
export const colorBrightWhite: string
