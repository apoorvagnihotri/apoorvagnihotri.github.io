# Typography candidates

The first version uses local system fonts. These references are intentionally
saved for a later typography exploration rather than mixed into the structural
build.

## Candidates

- [Datatype](https://franktisellano.github.io/datatype/) — an open-source OFL
  variable font that renders compact charts from text expressions. Best treated
  as a specialized figure or inline-data font rather than a reading face.
- [Rude](https://pixelsurplus.com/products/rude-free-handcrafted-serif-font) —
  a handcrafted display serif. Pixel Surplus distinguishes desktop and web-font
  licenses, so the exact web-use license must be verified before embedding it.
- [Bitcount Grid Single](https://fonts.google.com/specimen/Bitcount+Grid+Single)
  — an expressive pixel-grid family released under the SIL Open Font License.
- [Turret Road](https://fonts.google.com/specimen/Turret+Road) — a geometric,
  futuristic display family released under the SIL Open Font License.
- [Array](https://www.fontshare.com/fonts/array) — a high-personality display
  family from Fontshare. Fontshare permits personal and commercial web use, but
  we should confirm Array's specific open- or closed-source license before
  deciding whether to self-host it or load it through Fontshare's API.
- [Buckwheat](https://befonts.com/buckwheat-font.html) — a vintage display
  collection with regular and rough styles. The downloadable version listed by
  Befonts is licensed for personal use only, so it remains a visual reference
  unless we obtain an appropriate web/commercial license from the designer.

## Readability criteria

The [Datawrapper typography guide](https://www.datawrapper.de/blog/fonts-for-data-visualization)
gives us a useful evaluation framework for both scientific prose and figures:

- Prefer a normal-width, regular-weight face for sustained reading.
- Use strong text/background contrast and comfortable sizes.
- Keep uppercase text to short labels, not paragraphs.
- Confirm the family includes math symbols, reference marks, superscripts,
  accented characters, and any other scholarly glyphs we need.
- For charts and tables, prefer lining and tabular figures so numbers align.
- Use bold for hierarchy and emphasis rather than for long passages.
- Treat experimental, condensed, grid, and handwritten faces as display accents
  unless testing proves they remain comfortable over longer text.

The likely system is therefore a dependable reading family for articles and
data labels, with one expressive family for the name, titles, or small accents.

## Current accents

- **Bungee Hairline** is used for the hero name. Its thin, geometric forms make
  the name feel like a deliberate display mark while leaving the rest of the
  page in the original readable system.
- **Array** is used only for the joking “male, 27, single.” line.
- **Buckwheat TC Rough** remains a visual reference for a future experiment,
  pending a licensed WOFF/WOFF2 webfont kit. The readily available desktop and
  personal downloads are not licensed for public `@font-face` embedding.

## Later experiment

Compare each candidate at the same sizes in these roles:

1. Site name / navigation accent
2. Homepage display heading
3. Section headings
4. Article title and metadata
5. Inline data or figure labels

Long-form article text should remain highly readable. The expressive fonts are
more likely to work as display accents than as the primary article body face.
