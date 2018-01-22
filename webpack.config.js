const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        stats: 'minimal'
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
                use: [
                    { 
                        loader: "style-loader",
                        options: {
                            singleton: true
                        }
                    },
                    { 
                        loader: "css-loader"
                    }
                ]
            }, {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}