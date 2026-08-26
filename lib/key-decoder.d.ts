import { Transform, TransformEvents } from 'bare-stream'
import { BufferEncoding } from 'bare-buffer'

interface KeyDecoderOptions {
  /** Encoding used to decode incoming byte data into characters. Defaults to `'utf8'`. */
  encoding?: BufferEncoding
  /**
   * Milliseconds to wait for further bytes after a lone escape character before treating it as the
   * `escape` key. Defaults to `500`.
   */
  escapeCodeTimeout?: number
}

interface KeyDecoderEvents extends TransformEvents {
  data: [key: Key]
}

/**
 * Transform stream that decodes ANSI input escape sequences from a readable stream into `Key`
 * objects.
 */
interface KeyDecoder<M extends KeyDecoderEvents = KeyDecoderEvents> extends Transform<M> {
  /** The encoding used to decode incoming byte data into characters. */
  readonly encoding: BufferEncoding
}

declare class KeyDecoder {
  /**
   * Create a `KeyDecoder`, optionally configuring the input `encoding` and `escapeCodeTimeout`.
   * @param opts - Options controlling the `encoding` and `escapeCodeTimeout` used to decode input;
   * see `KeyDecoderOptions`.
   */
  constructor(opts?: KeyDecoderOptions)
}

/** A single decoded key press, including its name, raw sequence, and modifier state. */
interface Key {
  /** The decoded key name, e.g. `'up'`, `'return'`, or a single character. */
  readonly name: string
  /** The raw input sequence the key was decoded from. */
  readonly sequence: string
  /** Whether the Ctrl modifier was held. */
  readonly ctrl: boolean
  /** Whether the Meta (Alt) modifier was held. */
  readonly meta: boolean
  /** Whether the Shift modifier was held. */
  readonly shift: boolean
}

declare class Key {
  /**
   * Create a `Key` with the given `name`, raw `sequence`, and modifier flags.
   * @param name - The decoded key name, e.g. `'up'`, `'return'`, or a single character.
   * @param sequence - The raw input sequence the key was decoded from.
   * @param ctrl - Whether the Ctrl modifier was held.
   * @param meta - Whether the Meta (Alt) modifier was held.
   * @param shift - Whether the Shift modifier was held.
   */
  constructor(name: string | number, sequence: string, ctrl: boolean, meta: boolean, shift: boolean)
}

declare namespace KeyDecoder {
  export type { KeyDecoderOptions, KeyDecoderEvents, Key }
}

export = KeyDecoder
