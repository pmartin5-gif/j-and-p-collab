# dreamcloak — Claude version

A redesign of `Peter/Week-9 Project 2/PComp – Midterm Slide Presentation – Peter Martin.pptx` as an HTML slide deck. All of the original styling was discarded and rebuilt from `j-and-p-collab/brief.md` and the Figma frame **01 / Foundations** (node 33:78).

## Present

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8768 --bind 127.0.0.1
```

Use ← / → (or Space, Page Up/Down, Home/End, or click either half of the slide). To make a PDF, print from the browser; each slide prints as one 1920 × 1080 page.

## Content

The text matches the source word for word and in the same order, including its all-lowercase voice.

- **Backgrounds:** the grainy black-and-white image behind each of slides 1–7 was styling and has been removed.
- **"future iterations" collage:** the slide showed product photos: a cape, front and back, with about 60 copies of an LED-strip photo laid across it in rows; a stone; a "+"; and a mobile phone. These are redrawn as one line illustration in ink, with the LED strips in pink, keeping the same arrangement and row counts (two rows on the front, three on the back).
- **"(kill me)" and "(receive)":** both stay as small asides next to their titles, as in the source.
- **Removed:** a stray "." text box on the last slide.

## Design

- **Fonts:** Special Gothic Expanded One for titles; Archivo for text.
- **Layout:** the title sits top-left and the text bottom-right, so each slide balances on the diagonal.
- **Pink `#F62DAE`:** used for two phrases only, "only expression." and "emotions are hard.", plus the LED strips. At 38px the phrases meet the large-text contrast requirement.
- **Added color:** `--ink-muted` (#55524C) for secondary text. It isn't in the Figma frame.

## Files

- `index.html` — slides and content
- `deck.css` — layout and type
- `deck.js` — navigation and scaling (shared with the Farmers Markets deck)
- `fonts/` — bundled fonts with their OFL licenses
