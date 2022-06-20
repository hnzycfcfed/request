import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const pkgName = pkg.name;

const plugins = [
    babel(),
    eslint()
];

const iifeConfig = (file, _plugins = plugins) => {
    return {
        input: 'src/request.js',
        output: [
            { file, format: 'iife', name: pkgName }
        ],
        plugins: _plugins
    }
}

export default [
    {
        input: 'src/request.js',
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ],
        plugins,
        external: ['whatwg-fetch']
    },
    iifeConfig(`dist/${pkgName}.js`),
    iifeConfig(
        `dist/${pkgName}.min.js`,
        [
            ...plugins,
            uglify(),
        ]
    )
]
