# borkilator — Week 9, Claude version

A redesign of the Week-8 image borkilator (`HelloWorld/Week-8/image borkilator`). The functionality is unchanged. The layout, styles and interface text were rebuilt from `j-and-p-collab/brief.md` and the Figma frame **01 / Foundations** (node 33:78).

## Run

Open `index.html` in a browser. There is no build step.

Background processing needs the folder to be served over HTTP:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8766`.

## What changed from Week 8

| Part | Status |
| --- | --- |
| `engine.js`, `worker.js` | Byte-for-byte copies of Week 8 |
| `app.js` | Week 8 logic. Visible text rewritten; each slider description is now shown under the slider and linked to it for screen readers |
| `index.html`, `style.css` | New |
| `tests/` | Copied from Week 8, unchanged |

Effects, defaults, ranges, presets, seeds, cumulative passes, history and branching, undo/redo, compare, fit/actual size, export, session save/open (version 3) and size limits all behave as in Week 8.

### Renamed controls

| Week 8 | Now | Saved-file field |
| --- | --- | --- |
| Vertical pull | Vertical stretch | `pull` |
| Band shift | Band shift | `shift` |
| Data slip | Pixel slip | `slip` |
| Pixel sort | Brightness sort | `sort` |
| Digital weave | Pattern | `weave` |
| Tone crush | Tone crush | `crush` |
| Signal noise | Noise | `grain` |
| Cosmic particle | Channel hits | `cosmic` |
| Fragment scale | Fragment size | `scale` |
| Pass mix | Mix | `mix` |
| Pattern seed | Seed | `seed` |
| Dragged / Fractured / Encoded / Clear | Stretch / Fragment / Encode / Reset | preset keys unchanged |
| borkilate | Apply pass | |
| Save / Open settings | Save / Open session | |

## Design system

From Figma 01 / Foundations:

| Token | Value | Use here |
| --- | --- | --- |
| `--paper` | #EEEBE4 | Page background |
| `--ink` | #1B1B1B | Text, buttons, selected states |
| `--line` | #C9C9C9 | Rules and borders |
| `--decoration` | #F62DAE | Slider fill and the word "image" on the empty screen |
| `--accent-display` | #B30089 | Focus rings and error messages |
| `--soft` | #470063 | Button hover |

- **Type:** Special Gothic Expanded One for the wordmark and the empty-screen title. Archivo for everything else, with 15/24 body text. No monospace.
- **Spacing:** 4, 8, 12, 16, 24, 32, 48, 64.
- **Added color:** `--ink-muted` (#55524C, 6.9:1 on paper) for secondary text. It isn't in the Figma frame.
- **Contrast:** #F62DAE is 3.2:1 on paper, so it's used only for large type and graphics.

Fonts are bundled in `assets/fonts` with their OFL licenses.

## Tests

```sh
npm install
npm test
```

`npm test` runs the pixel-engine checks and the controller workflow in a simulated browser (jsdom). It doesn't check visual layout.

## Known gaps

- The code comments in `app.js` (the "book" chapters) are from Week 8 and still use the old control names.
