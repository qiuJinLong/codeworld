/*
* webpack 基础配置
*/
const webpack = require("webpack");
const _ = require("lodash");
const path = require("path");
const precss = require('precss');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //把css从js分离出来
const entryPath = path.join(__dirname, '../web/views');
const rootPath = path.join(__dirname, '..');

const jsEntris = {
	"index-index": "F:\\workspace\\studycopy\\web\\views\\index\\index-index.entry.es",
	"common": "F:\\workspace\\studycopy\\web\\views\\common\\common.entry.es"
};

const widgetPage = {
	"course":"F:\\workspace\\studycopy\\web\\widget\\course\\course.html",
	"header":"F:\\workspace\\studycopy\\web\\widget\\header\\header.html",
	"footer":"F:\\workspace\\studycopy\\web\\widget\\footer\\footer.html"
};

const _entris = Object.assign(jsEntris),
	_module = {
		rules: [
			{
				//设置对应的资源后缀
				test: /\.(css)$/,
				//设置后缀对应的加载器
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader"
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: function() {
									return [
										precss({browsers: "last 3 versions"})
									];
								}
							}
						}
					]
				})
			},
			{
				test: /\.es$/,
				loader: "babel-loader",
				options: {
					"presets": ["es2015", "stage-0"],
					"plugins": ["transform-runtime"]
				},
				exclude: path.resolve(__dirname, "../node_module")
			},
			{
				test: /\.less$/i,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader"
						},
						{
							loader: "less-loader"
						}
					]
				})
			}
		]
	},
	_resolve = {
		extensions : [".vue", ".js", ".es", ".less"],
		alias: {
			vue: "vue/dist/vue.js"
		}
	};

let _devLoaders = _.clone(_module.rules);
let _prodLoaders = _.clone(_module.rules);

_devLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=assets/images/[name].[ext]'
});
_prodLoaders.push({
	test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=assets/images/[name].[hash:5].[ext]'
});

const webpackConfig = {
	dev: {
		entry:_entris,
		module: {
			rules: _devLoaders
		},
		resolve: _resolve
	},
	prod: {
		entry:_entris,
		module: {
			rules: _prodLoaders
		},
		resolve: _resolve
	},
	TemplatePage: widgetPage
};

module.exports = webpackConfig;
module.exports.rootPath = rootPath;
