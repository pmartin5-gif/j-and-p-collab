# borkilator Week 9

An interface redesign of the Week-8 image borkilator. The image-processing engine and worker are preserved; the layout, styling, and interface copy have been rebuilt. This iteration lives entirely in `Peter/Week-9 Project 1` and leaves the Week-8 original intact.

## Run

Open [index.html](index.html) in a modern browser. There is no build step or runtime dependency. Fonts are included locally with their licenses.

For background-worker processing, serve this folder over HTTP from your terminal:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765`. Opening the HTML directly uses the existing cooperative main-thread fallback.

## Use

1. **Choose image:** select a still PNG, JPEG, or WebP. The empty image area opens the same picker. Each new image begins unchanged.
2. **Prepare a pass:** adjust effects or choose Stretch, Fragment, or Encode. Reset controls sets effects to zero; it does not change the image. Controls and presets retain their original values and behavior.
3. **Apply pass:** process the current result. Apply again to accumulate the same effect, or adjust the controls first.
4. **Compare and revisit:** switch between Result and Original, use Undo/Redo, choose an earlier history state to branch, and toggle Fit image / Actual pixels.
5. **Keep your work:** Export PNG saves the current result. Save session embeds the original image and applied passes in a version-3 JSON file; Open session reconstructs it. Unapplied control changes are not saved. Save before closing or refreshing the tab.

All processing stays in the browser. Images retain color, transparency, dimensions, and aspect ratio. Images over 8192 pixels per side or 16,777,216 pixels total require explicit proportional reduction. The 100 MiB image limit, 128 MiB session limit, 64-pass limit, and existing history budget are unchanged. While viewing Original, applying a pass and exporting still operate on the current result.

## Preserved behavior and new labels

Internal fields and saved-file identifiers are unchanged. The names below describe the existing effects, not new algorithms.

| Interface label | Existing field | Behavior |
| --- | --- | --- |
| Vertical stretch | `pull` | Extends column fragments into trails |
| Band shift | `shift` | Displaces horizontal bands with wrapping |
| Pixel offset | `slip` | Offsets blocks through the pixel sequence |
| Brightness sort | `sort` | Sorts column segments from light to dark |
| Digital pattern | `weave` | Introduces checks and interrupted bars |
| Tone reduction | `crush` | Reduces tonal steps and increases contrast |
| Static | `grain` | Adds brightness noise |
| Channel corruption | `cosmic` | Replaces one random RGB channel per targeted pixel, preserving alpha |
| Fragment size | `scale` | Sets effect fragment size |
| Effect blend | `mix` | Blends the pass with its input; 75 is full effect, higher values amplify the difference |

Pattern seed still determines repeatable placement. About the controls provides descriptions. Version-3 sessions without `cosmic` still replay with it disabled. Earlier procedural saves remain supported only by the [original Week-8 archive](https://github.com/pmartin5-gif/HelloWorld/tree/main/Week-8/image%20borkilator/archive/2026-11-07_15-47-32), not this upload-based interface.

## Sources

- [Repository brief](../../brief.md)
- [Selected Foundations section](https://www.figma.com/design/h71lCJkzfm0uZ0YpqQbSxB/hello-world?node-id=33-78)
- [Original image borkilator](https://github.com/pmartin5-gif/HelloWorld/tree/main/Week-8/image%20borkilator)

The Figma reference is limited to node `33:78` and its contents, including inner frame `33:79`. Do not inspect or draw design cues from any other part of the file. Use the selected section's actual visible colors and applied fonts when its printed labels disagree with its appearance. Hidden content is not a visual reference.

The implementation uses buildless HTML, CSS, and JavaScript. Figma inspection is read-only. The selected section supplies visual cues; its demonstration text is not application content. Interface copy was reimagined under the user's instructions rather than inherited from the earlier interface.

## Typography in the selected section

Applied fonts and measurements from visible text layers, in Figma pixels:

| Text role | Applied font | Size / line height |
| --- | --- | --- |
| Section title | Archivo Regular | 48 / 56.64 |
| Archivo title specimen | Archivo Bold | 48 / 56.64 |
| Large pink specimen | Special Gothic Expanded One Regular | 72 / 84.46 |
| Body and introduction | Archivo Regular | 15 / 24 |
| Supporting text | Archivo Regular | 13 / 20.8 |
| Small uppercase label | Archivo Bold | 11 / 17.6 |
| Code and spacing labels | JetBrains Mono Regular | 13 / 20.8 |

The large pink specimen reads “Zilla Slab / a line with character.” but its applied font is **Special Gothic Expanded One**. Follow the applied font as the visual cue; the wording does not establish Zilla Slab as a font choice.

## Colors in the selected section

Use these observed fills as color cues:

| Element | Visible fill |
| --- | --- |
| Inner frame background | `#FAF9F5` |
| Paper swatch | `#EEEBE4` |
| Ink swatch and primary text | `#1B1B1B` |
| Supporting text | `#66645E` |
| Line swatch | approximately `#C9C9C9` |
| Accent swatch, large specimen, and spacing bars | `#FF00B2` |
| Display accent swatch | `#C4008D` |
| Soft swatch | `#470063` |

Several printed hex labels differ from their visible swatches. Preserve the visible palette as the design reference rather than substituting the printed values. Color roles and accessible pairings for the eventual design still need to be determined in context.

## Layout and styling cues

The inner frame is 1440 × 1212, with vertical auto-layout, 64-pixel padding, and a 24-pixel gap. Its visible spacing specimens show 4, 8, 12, 16, 24, 32, 48, and 64.

The composition uses a light background, dark readable text, generous space, aligned rows, a thin horizontal divider, and strong typographic hierarchy. Pink supplies the most prominent emphasis, with deeper magenta and purple present in the palette. These are reference cues; the assignment's responsive layout and interaction behavior remain undecided.

## Files and checks

- `index.html` and `style.css`: rebuilt structure and presentation.
- `app.js`: the original controller with revised copy, accessible control descriptions, a control guide, and exposed preset selection state.
- `engine.js` and `worker.js`: byte-for-byte copies of the source processing engine and worker.
- `tests/`: copied engine/controller regression suites, with added checks for control labels, help, and preset accessibility state.
- `documentation.md`: iteration intent, execution, evidence, and verification limits.
- `assets/fonts/`: Archivo, Special Gothic Expanded One, JetBrains Mono, and their SIL Open Font Licenses, from the Google Fonts repository.

Node is only needed for development checks:

```sh
npm ci
npm test
node --check app.js
node --check engine.js
node --check worker.js
```

The controller harness uses development-only `jsdom` and simulated Canvas/PNG APIs. It checks workflow and pixel preservation but does not establish native browser layout, image decoding, PNG downloads, or responsive rendering. Browser QA in this environment is blocked: the preview server cannot bind a local port, and browser security policy rejects local-file navigation. Open the HTML in your own browser to review this first visual iteration. No deployment or Git commit has been performed.

## Design requirements

Follow [brief.md](../../brief.md): typography-led design, accessible and readable layouts, balanced composition, restrained color accents, minimal orientation labels, and subtle decoration. Keep title-page titles to one line. Use user-developed content without invented facts or substantive messaging changes. Review contrast, keyboard focus, and responsive readability in the eventual implementation.
