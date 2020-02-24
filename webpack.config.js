const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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
                {loader: "css-loader", options: {
                    modules: true
                }}
            ]},
            {test: /\.js$/, use: [
                {loader: "babel-loader"}
            ]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin() 
    ],
    devServer: {
        contentBase: "./dist",
        port: 8080,
        hot: true,
        open: true,
        proxy: {
            "/*": {
                target: "http://localhost:3000",
                bypass: function(req, res, proxyOptions) {
                  if (req.headers.accept.indexOf("html") !== -1) {
                    console.log("Skipping proxy for browser request.");
                    return "/index.html";
                  }
                }
            }
        }
        
    },
    mode: "development",
    // devtool: "source-map"
}