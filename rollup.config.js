import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/react-get-user-media.js',
    format: 'cjs',
    exports: 'named',
    sourcemap: true
  },
  external: ['react'],
  plugins: [
    nodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
}
