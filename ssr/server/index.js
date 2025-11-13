require('ignore-styles')
require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
})

require('./server-ssr.js')