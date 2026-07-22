// SVGO config for Veilburner icon / sigil / seal SVGs.
//
// Goals:
//  - strip editor cruft (metadata, comments, redundant ids/defs, Figma frame clips)
//  - drop baked width/height, keep the viewBox so icons scale responsively when inlined
//  - hand ALL color control to CSS by converting fills to `currentColor`, so a single
//    file serves every nav state (static / hover / active) via CSS `color`.
//
// Usage:  npx svgo -f public/images/nav-glyphs        (optimize a whole folder in place)
//         npx svgo input.svg -o output.svg            (single file)
export default {
  multipass: true,
  js2svg: { indent: 2, pretty: true },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,                 // keep viewBox — needed for responsive inline sizing
          convertColors: { currentColor: true }, // white/#fff/etc → currentColor (CSS drives the color)
        },
      },
    },
    'removeDimensions',                                   // remove width/height, rely on viewBox
    { name: 'removeAttrs', params: { attrs: '(clip-path|clip-rule)' } }, // drop the Figma frame clip
  ],
};
