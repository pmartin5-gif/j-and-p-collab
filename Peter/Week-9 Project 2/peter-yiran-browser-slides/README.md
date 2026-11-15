# Farmers markets — browser presentation

Open [index.html](index.html) in a current browser. No installation, build step, internet connection or server is required. All 16 slides use native HTML text, bundled fonts and local images.

Use the arrow buttons or Left/Right keys to move through the presentation. `Slides` opens the complete slide list. `?` shows keyboard shortcuts. A URL ending in `#slide-8`, for example, opens slide 8 directly. Select either research board to enlarge it. The enlarged view also links to the full-size image. `Print` includes all 16 slides in landscape format; enable background graphics and use the CSS page size when your browser offers those options.

On smaller screens the layouts stack and scroll to keep text readable. With JavaScript disabled, every slide remains available in document order.

## Design and source

- Content: `../Peter_Yiran – Final Presentation Template.pdf`. All 16 source slides are represented in the original sequence. Copy is edited for clarity and space; participant quotations, research qualifications and substantive findings are retained.
- Design: repository `brief.md` and the updated Figma **01 / Foundations** frame only (`33:78`, inner frame `33:79`). No other Figma frames supplied styling.
- Fonts: Archivo and Special Gothic Expanded One, bundled with their licenses in `assets/fonts/`. All typography is proportional.
- Palette: canvas `#FAF9F5`, paper `#EEEBE4`, ink `#1B1B1B`, muted text `#66645E`, rules `#C9C9C9`, accent `#C4008D`, focus `#470063`. The frame’s brighter pink is reserved in the tokens; readable magenta carries the deck’s emphasis.
- Images: the three persona illustrations and two research boards are cropped directly from the source PDF. They are preserved source content, rather than references for the new visual system. The persona illustrations do not depict the interviewees.
- AI disclosure: slide 15 retains the original reported AI use separately from the Codex-assisted redesign and implementation.
- `source-manifest.json` records the source PDF hash and permitted Figma nodes. The source PDF is unchanged.

## Validation

Run `node --test tests/deck.test.cjs`. The tests use Node’s built-in test runner and the repository’s existing Project 1 installation of `jsdom`; `JSDOM_PATH` can point to a different installation. There are no runtime dependencies.

Checks cover all 16 slides, keyboard and button navigation, direct links, dialog behavior, image assets, original disclosure, print rules, font restrictions and the unchanged source PDF. Browser visual QA and physical printing remain unverified: the current environment blocks both a local preview server and direct filesystem browser navigation.
