# Keyboard probe results

Tested with `scripts/keyprobe.tsx` in my terminal. "Ink receives" is what `useInput` reports as `input` and `key`.

| Key                | Ink receives                                          | Notes                              |
| ------------------ | ----------------------------------------------------- | ---------------------------------- |
| Enter              | `input="\r"`, `key.return`                            | Confirmed live (0.4)               |
| Ctrl+Enter         | `input="\r"`, `key.return`                            | Confirmed live: identical to Enter, so it can't be used |
| Ctrl+P             | `input="p"`, `key.ctrl`                               | **Publish key**                    |
| Tab                | `key.tab`                                             |                                    |
| Left arrow         | `key.leftArrow`                                       |                                    |
| Right arrow        | `key.rightArrow`                                      |                                    |
| Up arrow           | `key.upArrow`                                         |                                    |
| Down arrow         | `key.downArrow`                                       |                                    |
| Backspace          | `key.backspace`                                       |                                    |
| Paste (multi-line) | one call, `input` holds the whole text, `key` is none | Line breaks arrive as `\r`         |
| Esc                | `input=""`, `key.escape`                                  | Confirmed live. Raw byte `1b`                        |
| Shift+Tab          | `input=""`, `key.tab` + `key.shift`                       | Confirmed live: flags render as `shift+tab`; raw `ESC [ Z` |

Notes from the live run:

- The `raw:` hex lines are broken, not just lossy: Ink calls `stdin.setEncoding('utf8')` (`node_modules/ink/build/components/App.js:255`), so the `data` event delivers a **string**. `[...data].map(b => b.toString(16).padStart(2, "0"))` then calls `String.prototype.toString`, which ignores the radix and returns the character itself, so it prints `0` plus the literal character (e.g. `raw: 0` for Esc, `0[ 0B` for the down arrow) instead of bytes. Trust the `ink:` column; fix the probe if raw bytes are needed.
- Pressing Enter immediately after Esc produced `key=return+meta`, because the `ESC` byte got merged into the following key. Keep the same in mind when Esc returns from edit to navigate mode.

## Bun runtime

- `bun dev` (→ `bun run src/main.tsx`) renders the Ink screen under Bun 1.3.14, and `q` exits cleanly with the shell restored (cursor visible, typing echoes, prompt returns).
- No Ink-under-Bun input problems observed, so the Node fallback is not needed. `bun test` and `bun run typecheck` also pass from the project root.

## Decisions

- Publish with **Ctrl+P**. Update the footer hint from `Ctrl+Enter Publish` to `Ctrl+P Publish`.
- Treat any `input` longer than one character as a paste. Convert `\r\n` and `\r` to `\n`, then insert it as one operation.
- Ignore the focus reports the terminal sends when the window loses or gains focus (they look like `ESC [ O` and `ESC [ I`).
- When Esc exits edit mode, ignore a `key.meta` on the next key so a fast Esc-then-Enter is not misread.
