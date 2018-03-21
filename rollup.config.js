import fs from 'fs';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const banner = fs.readFileSync("src/banner.txt");

export default [
	// browser-friendly UMD build
	{
		input: 'src/main.js',
		output: {
			name: 'sico.vue-helpers',
			file: pkg.browser,
			format: 'umd',
			banner: banner,
			sourcemap: true
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs() // so Rollup can convert `ms` to an ES module
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	{
		input: 'src/main.js',
		external: ['ms'],
		output: [
			{ banner: banner, file: pkg.main, format: 'cjs' },
			{ banner: banner, file: pkg.module, format: 'es' }
		]
	}
];