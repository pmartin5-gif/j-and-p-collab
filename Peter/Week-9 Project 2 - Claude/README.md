# Farmers Markets — Claude version

A redesign of `Peter/Week-9 Project 2/Peter_Yiran – Final Presentation Template.pdf` as an HTML slide deck. All of the original styling was discarded and rebuilt from `j-and-p-collab/brief.md` and the Figma frame **01 / Foundations** (node 33:78).

## Present

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
```

| Action | Keys |
| --- | --- |
| Next | → · Space · Page Down · click the right half |
| Previous | ← · Page Up · click the left half |
| First / last | Home / End |

The URL keeps the slide number (`#7`). To make a PDF, print from the browser; each slide prints as one 1920 × 1080 page.

## Content

The text matches the source PDF word for word. Only layout, type and color changed.

- The source's last slide ("Previous presentation examples" with a "here" link) was removed at Peter's request.
- **Decision pathing (slide 8):** the cartoon fork illustration was redrawn as two typeset columns. Every sticky note is transcribed exactly and sorted the same way: Farmers Market, and Supermarket split into "Farmers markets are bad" and "Supermarkets are good".
- **Wins on Experience (slide 9):** the photographed quadrant matrix was redrawn as a vector plot. Each note keeps its position and category (farmer's market only, both, supermarket only). The note text was too small to read on the slide, so it isn't shown, as in the original.
- **Removed images:** the Pokémon avatars on the persona slides were placeholder characters, not research content. The background gradient circles were decorative.
- **Redrawn icons:** the eight recommendation icons were redrawn as line icons in ink.

## Design

Revised for the updated brief, which asks for loud color on top-level title slides, artful composition and flow, and subtle decorative elements.

- **Fonts:** Special Gothic Expanded One for titles and persona names; Archivo for everything else.
- **Title slide:** a full pink (`#F62DAE`) field with ink type (4.5:1).
- **Elsewhere, pink appears only at display size and only on the experience/sentiment thread:** "Wins on Experience", "Clear advantage is sentimental", "Maximize Experience", and the farmer's-market-only notes in the matrix. The persona quotes have a pink rule, and the job-story answers use `#B30089`, which is legible at body size.
- **Composition and flow:**
  - The methodology and future-research steps sit on a connected timeline.
  - The research statement is set larger than the other three goals.
  - The insight columns step down toward the third insight.
  - On slide 8, the decision path forks into its two columns.
- **Decoration, all in ink or pink:**
  - a leaf sprig (title slide, last slide)
  - a dot pattern (title slide, recommendation slides)
  - diamonds as timeline nodes, bullets, the fork junction and the recommendations divider
- **Added color:** `--ink-muted` (#55524C) for secondary text. It isn't in the Figma frame.
- **Numbering:** the "01–05" labels stay small and muted.

## Files

- `index.html` — slides and content
- `deck.css` — layout and type
- `deck.js` — navigation and scaling
- `fonts/` — bundled fonts with their OFL licenses
