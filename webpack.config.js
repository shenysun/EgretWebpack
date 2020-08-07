const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/Main.ts'),
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'egret webpack',
            template: path.resolve(__dirname, './index.html'),
            libScripts: [
                "libs/modules/egret/egret.js",
                "libs/modules/egret/egret.web.js",
                "libs/modules/eui/eui.js",
                "libs/modules/assetsmanager/assetsmanager.js",
                "libs/modules/tween/tween.js",
                "libs/modules/promise/promise.js"
            ],
            bundleScripts: ["/bundle.js"]
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'publish')
    },
    module: {
        rules: [{
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
};