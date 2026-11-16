# Design System: Slide Deck + Portfolio Website

Sources: `Foundations.jpg` (values from the existing website), `brief.md` (working principles), the assignment brief.
Values not found in those sources are marked **Proposed** (my suggestion, to confirm) or `TBD`. Nothing else is invented.

---

## 1. Person and task

**Two services:** a 16:9 slide deck and a portfolio website. They must read as the same brand, and each may adapt to its medium.

**Person (assumption to check):** someone who views the same project in the deck, then on the website, and judges the work from it.

**Task (assumption to check):** look at one slide or one website section and, within a few seconds,
1. know where they are, and
2. find the one key idea.

**How to check:** show a partner one slide and one website section for 3 seconds each. Ask "What was the key word?" and "Which part is this?" Correct answers mean the rules work.

---

## 2. Rule sheet

### 2.1 Must stay, may adapt, must never happen

| Must stay (both services) | May adapt (per medium) | Must never happen |
| --- | --- | --- |
| The six color tokens and their roles | Type sizes (larger in the deck) | Body text in any color other than Ink |
| Archivo for body and interface, Special Gothic Expanded for display | Number of columns; which `space/*` steps are used, or multiples of them in the deck | Action `#F62DAE` used for small text or links |
| A sparse Canvas background | Where the wayfinding label sits (deck: corner; web: header) | Adding to or changing the content |
| Titles on one line | Size of the emphasis word | Highlighting a number only because it is a number |
| Loud color only on key words, one or two per screen | Form of decoration, as long as it never competes with the type | Labels that do not help someone orient |
| Generous line height (web body is 15 / 24) | | Layouts that weigh heavily to one side |

### 2.2 Color

| Token | Variable | Hex | Role | Contrast on Canvas |
| --- | --- | --- | --- | --- |
| Canvas | `--paper` | `#EEEBE4` | Reading surface | n/a |
| Ink | `--ink` | `#1B1B1B` | Main text | 14.47 : 1 |
| Line | `--line` | `#C9C9C9` | Quiet boundaries | 1.39 : 1 |
| Action | `--decoration` | `#F62DAE` | Text decoration, style elements | 2.99 : 1 |
| Display accent | `--accent-display` | `#B30089` | Large editorial emphasis | 5.38 : 1 |
| Soft | `--soft` | `#470063` | Supporting areas | 12.18 : 1 |

Contrast ratios are calculated with the WCAG 2.1 formula.

- Action is 2.99 : 1, just under the 3 : 1 large-text threshold. Use it for shapes, underlines, bars and very large display type only. Text placed on an Action fill is Ink (4.84 : 1).
- Emphasized text uses Display accent.
- Line is for decorative boundaries only. Never separate information with Line alone; add spacing or text.
- Text on a Soft fill is Canvas (12.18 : 1).

### 2.3 Type

Rule: the deck scale is the web scale × 2 (`--scale: 2`), except display titles, which are set to fit one line.

| Role | Font | Web (px) | Deck 1920 × 1080 (px) |
| --- | --- | --- | --- |
| Body | Archivo | 15 / 24 | 30 / 48 |
| Supporting text | Archivo | 13 / 20.8 | 26 / 41.6 |
| Label (uppercase, bold) | Archivo | 11 / 17.6 | 22 / 35.2 |
| Subheading | Archivo Bold | 22 / 28 | 44 / 56 |
| Lead sentence | Archivo | 18 / 28 | 36 / 56 |
| Section or slide title | Special Gothic Expanded One | 28–48, fluid | 56 |
| Cover title | Special Gothic Expanded One | 36–144, fluid | 200 |

- Web body, supporting and label sizes are the values measured from the Foundations frame, as reported in Peter's README. The other rows were set while building Plant Mood.
- The cover title is always one line. Slide titles also stayed on one line at 56 px in the deck. On narrow web screens section titles may wrap.
- Secondary text uses `--ink-muted` `#55524C` (proposed by Peter, 6.9 : 1 on Canvas). It is not in the Foundations frame.

### 2.4 Space

`space/4 · 8 · 12 · 16 · 24 · 32 · 48 · 64` (px).
New work uses token names. Literals in the existing website are replaced with tokens when touched. The deck may use multiples of these steps.

### 2.5 Reusable part: emphasis word

The `brief.md` rule "sparse background, loud color only on key words" as one component, used in both services.

| Item | Rule |
| --- | --- |
| Content | One word or short phrase inside a sentence |
| Default state | Display accent text, bold |
| Decoration (optional) | An Action underline or bar. The text itself is never Action |
| Count | At most one or two per screen |
| Placement | Within the line, without tipping the layout to one side |
| In the deck | May be larger. One key idea per slide |
| On the web | Keeps body size. Its underline must differ from link underlines: `TBD` |
| Never | Used to highlight a number, carry meaning by color alone, or cover a whole paragraph |

Interaction behavior (hover, focus, transitions) is not decided yet: `TBD`.

### 2.6 Wayfinding label

- Shows only what a person needs to know where they are.
- Deck: the section name. Web: the current section or page.
- The same information is never shown twice.

---

## 3a. What building Plant Mood showed

June's deck (7 slides) and a one-page website were built from the same two files, `plant-mood/shared/system.css` (tokens, fonts, emphasis word, label) and one small stylesheet per medium. Text is unchanged from the original deck. Open `plant-mood/deck/index.html` and `plant-mood/site/index.html`.

| Rule | Held in both? | Note |
| --- | --- | --- |
| Six color tokens, two font roles | Yes | Shared file; neither medium redefines them |
| Emphasis word: one per screen, Display accent | Yes | "guesswork." (slide 2), "understanding" (3), "guess" (6) |
| Action pink only at very large display size | Yes | Only the cover word "Mood", 200 px in the deck |
| Cover: title top-left, supporting text bottom-right | Yes | Same diagonal balance on both |
| Labels only for orientation | Adapted | The deck keeps the source's small labels (COMMUNITY, PROBLEM). The site adds one thing: the current section name in a bar at the top |
| Type sizes | Adapted | Deck = web × 2 |
| Columns | Adapted | Site collapses to one column under 800 px; the table becomes stacked rows |
| Hover or focus behavior | Added | Focus ring is Display accent, 3 px (×2 in the deck) |

New rules this build required:
- Source credits and image attributions are content. They stay, set as supporting text with an uppercase label.
- A table is allowed. Header cells use the label style; rows are separated by Line plus spacing, so Line is never the only separator.
- Where a source slide runs several bullets into one paragraph, they may be split into list items. Wording stays identical.
- Speaker notes from the original deck were not carried over.

---

## 3. My design (sketch)

One small task drawn in both services with the same frame. The test is whether a partner can read it without explanation.

```
[Deck slide, 16:9]                     [Website section]

Section name (small, corner)           Header: current section name

One-line title with the                One-line title with the
**emphasis word**                      **emphasis word**

One or two sentences of body           Body 15 / 24, short paragraph
```

Real content (project name, copy, images) has not been provided, so this shows the frame only. When content exists it goes into the same frame unchanged.

---

## 4. Partner check

| | Small task | Rules used |
| --- | --- | --- |
| June | `TBD` | `TBD` |
| Peter | `TBD` | `TBD` |

Each person explains: the rules they used, any new rule they added, and how they checked contrast.
Anything the partner cannot explain is a rule to rewrite here.

---

## 5. Open items

- [ ] Confirm the person and task (section 1)
- [ ] Confirm the proposed deck type sizes in Figma
- [ ] Web heading sizes, supporting text color, `--accent` value
- [ ] Interaction behavior
- [ ] Peter's and June's tasks
