const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'javascripts/[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: 'last 2 major versions',
                                    uglify: false
                                }
                            }],
                            'react',
                            'stage-2'
                        ],
                        plugins: [
                            'transform-decorators-legacy'
                        ]
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            minimize: false,
                            localIdentName: '[name]__[local]--[hash:base64:6]'
                        }
                    }
                })
            }, {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        hash: 'sha512',
                        digest: 'hex',
                        name: 'images/[name]-[hash:8].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'all.[contenthash:8].css'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.includes('node_modules');
            }
        })
    ]
}