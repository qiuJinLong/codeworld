/*
* 开发环境配置
*/
const conf = require('./webpack.conf');
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const options = {
	output: {
		path: path.join(__dirname, "../build/"),
		publicPath: "/",
		filename:"assets/scripts/[name].bundle.js"
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'assets/scripts/[name].bundle.js'
        }),        
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './web/views/common/pages/layout.html'),
            filename: './views/common/pages/layout.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './web/views/index/pages/index.js'),
            filename: './views/index/pages/index.html',
            inject: false,
            chunks: ['vendor', 'common', 'index-index']
        }),
        
        //widget目录下的html编译
        new HtmlWebpackPlugin({
            template: "F:\\workspace\\studycopy\\web\\widget\\course\\course.html",
            filename: './widget/course/course.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: "F:\\workspace\\studycopy\\web\\widget\\header\\header.html",
            filename: './widget/header/header.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: "F:\\workspace\\studycopy\\web\\widget\\footer\\footer.html",
            filename: './widget/footer/footer.html',
            inject: false
        }),

        //分离js和css
        new ExtractTextPlugin("assets/styles/[name].css")
	]
}

const _options = Object.assign(options, conf.dev);

module.exports = _options;