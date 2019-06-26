const path = require('path')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = function(env = {}, argv){
    const baseConfig = {
        entry: {
            app: ['babel-polyfill', path.join(__dirname, './index.js')],
            vendor: ['react', 'react-router-dom', 'redux']
        },

        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[hash].js',
            chunkFilename: '[name].js',
            publicPath: '/'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader?cacheDirectory=true'],
                    exclude: path.join(__dirname, './node_modules')
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'less-loader']
                    })
                } 
            ]
        },
        resolve: {
            alias: Object.assign({},
                ...['pages', 'component', 'lib', 'router', 'api', 'store','mock'].map(
                    v => ({
                        [v]: path.join(__dirname, `${v}`)
                    })
                )
            )
        }
    }

    const isProduction = env['production']
    // plugins
    const plugins = [
        new htmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico',
            inject: true,
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true 
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }) 
    ]
    if(isProduction){
        plugins.push(new UglifyJsPlugin())
    }
    //devtool 
    const devtool = isProduction ? undefined : 'inline-source-map'
    
    //devServer
    const devServer = isProduction ? {} : {
        port: 5000,
        contentBase: path.join(__dirname, '/dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        proxy: {
            '/api': 'http://localhost:5553',
            changeOrigin: true,
        }
    }
    
    return Object.assign(
        baseConfig,
       ...[{ plugins }, { devServer }, { devtool }]
    )
}