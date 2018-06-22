import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  external: ['react'],
  output: {
    format: 'cjs',
    name: 'ReactGetUserMedia',

  },
  plugins: [
    nodeResolve({
      customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
    }),
    babel({
      exclude: '**/node_modules/**'
    }),
    commonjs()
  ]
}
