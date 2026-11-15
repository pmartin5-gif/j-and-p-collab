# Dreamcloak Foundations redesign

The redesigned deck is `Dreamcloak - Foundations Redesign.pptx`. The matching PDF provides a preview with the intended fonts embedded, independent of local font activation.

The source is the eight-slide `PComp – Midterm Slide Presentation – Peter Martin.pptx` in this folder. The original presentation and the final-presentation PDF remain unchanged.

## Design reference

Follow [brief.md](../../brief.md) and only [01 / Foundations](https://www.figma.com/design/h71lCJkzfm0uZ0YpqQbSxB/hello-world?node-id=33-78), including its contents. Use its applied fonts and visible colors where printed labels differ.

This iteration uses Archivo for headings and body text and Special Gothic Expanded One for prominent display text. It uses the frame's light background, dark text, and restrained pink and magenta emphasis. Titles remain concise, and the cover title stays on one line. Other parts of the Figma file are outside the design reference.

## Content and editability

The deck retains eight slides in the original order: Dreamcloak, Feedback, Problem, Community, Research, Playtesting, Live demo, and Future iterations. Copy is shorter while preserving the original qualifications, personal framing, and reported participant observation. The original wording remains in speaker notes.

PowerPoint text remains native and editable. The future-iterations slide preserves the original garment photograph, individual LED image overlays, stone image, and phone image as image objects. The garment mockup is grouped so it can move as one composition. The textured backgrounds have been replaced by the selected Foundations styling.

## Fonts and viewing

The `fonts/` directory includes the two typefaces and their SIL Open Font Licenses. Install those fonts when editing or presenting the PowerPoint on another computer. The PowerPoint file references them rather than embedding them. The PDF preserves their appearance without font installation.

Local Keynote can open the PowerPoint and its native objects. Its preview in this environment continues to substitute fonts despite registration attempts. The PDF therefore supplies the checked visual reference. It renders from the same native text and image geometry, loading the bundled fonts directly for rendering.

## Verification

The source and all eight redesigned slide previews were visually reviewed. Final text-fit checks report no overflow. Package integrity and layout checks verify eight slides at the original 10 × 5.625-inch dimensions, valid XML relationships, native text objects, and preserved image assets. Microsoft PowerPoint execution has not been checked.

The presentation service rejected its initial edit before saving, and the local Artifact Tool runtime was unavailable. The completed local copy uses the source Office Open XML package and native font rendering. Intermediate build and validation files are isolated in the ignored `.build/` directory.
