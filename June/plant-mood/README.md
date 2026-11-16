# Plant Mood: deck and website

The 7-slide deck `Plant Mood - Presentation Slides.pptx` (June Nam), restyled with the shared design system in `design-system.md`, plus a one-page website built from the same content. The original file is untouched.

## Open

- Deck: open `deck/index.html` in a browser. Keys: → / Space next, ← back, Home / End. Print to PDF gives one 1920 × 1080 page per slide.
- Website: open `site/index.html`.

## Structure

| Path | What |
| --- | --- |
| `shared/system.css` | Tokens (color, space, type scale), fonts, emphasis word, label, focus ring. Used by both |
| `deck/` | 1920 × 1080 slides. Type scale is the web scale × 2 |
| `site/` | One page, seven sections, one column under 800 px |
| `assets/` | The seven photos from the original deck |
| `shared/fonts/` | Archivo and Special Gothic Expanded One, with OFL licenses |

## Content

All text is word for word from the source slides. Not carried over: speaker notes, the original slide backgrounds and Arial. The two demo thumbnails on slide 6 keep their YouTube links. Alt text on images was written for this version.

## Known gaps

- Not yet tested with a person (see `process.md`).
- Action pink `#F62DAE` is 2.99 : 1 on Canvas. It is used only for "Mood" in the cover title.
- Printed hex values in the Foundations image differ from the visible fills according to Peter's README. These files use the printed values.
- Slide 4 says "Mood"; the speaker notes say "gentleness". Not changed.
