// rollup.config.js

import { terser } from 'rollup-plugin-terser';

export default [
  // UMD build (for browsers)
  {
    input: 'src/pokemon-search.js',
    output: {
      file: 'dist/pokemon-search.min.js',
      format: 'umd',
      name: 'PokemonSearchComponent',
      sourcemap: true,
    },
    plugins: [terser()],
  },
  // ES module build
  {
    input: 'src/pokemon-search.js',
    output: {
      file: 'dist/pokemon-search.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [terser()],
  },
];

