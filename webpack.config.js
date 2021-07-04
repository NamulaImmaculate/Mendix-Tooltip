const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pkg = require("./package");
const widgetName = pkg.widgetName;
const name = pkg.widgetName.toLowerCase();

const widgetConfig = {
    entry: `./src/components/${widgetName}Container.ts`,
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: `src/com/mendix/widget/custom/${name}/${widgetName}.js`,
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [ ".ts", ".js" ],
        alias: {
            "tests": path.resolve(__dirname, "./tests")
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            }) },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            }) }, 
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    mode: "development",
    devtool: "source-map",
    externals: [ "react", "react-dom" ],
    plugins: [
        new CopyWebpackPlugin([ { from: "src/**/*.xml" }], { copyUnmodified: true }),
        new ExtractTextPlugin({ filename: `./src/com/mendix/widget/custom/${name}/ui/${widgetName}.css` }),
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

module.exports = widgetConfig;
