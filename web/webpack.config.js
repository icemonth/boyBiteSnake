const path = require('path')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
module.exports = function(env = {}, argv){
    const plugins = []
    const entry = {
        app: ['babel-polyfill', path.join(__dirname, 'index.js')],
        vendor: ['react', 'react-router-dom', 'redux']
    }
    const output = {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    }
    const isProduction = env['production']
    if(isProduction){
        plugins.push(new UglifyJsPlugin())
    }
    return({
        plugins,
        devtool: isProduction ? undefined : 'source-map'
    })
}