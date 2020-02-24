const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-Plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "index.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {test: /\.css$/, use: [
                {loader: "style-loader"},
                {loader: "css-loader"}
            ]},
            {test: /\.js/, use: [
                {loader: "babel-loader"}
            ]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.js"
        }) 
    ],
    devServer: {
        contentBase: "./dist",
        port: 8080,
        hot: true,
        open: true
    },
    mode: "development"
}