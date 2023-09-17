import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  output: { file: packageJson.module, format: 'esm' },
  plugins: [
    external(),
    resolve(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    typescript(),
    terser(),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes(`"use client"`)) {
      return;
    }
    warn(warning);
  },
};
