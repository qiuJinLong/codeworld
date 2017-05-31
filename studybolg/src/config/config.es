import path from "path";
import _ from "lodash";

const config = {
	//默认生产环境
    "env": "production",
    //端口号配置
    "port": 3000,
    //模板所在的目录
    "webpackConf": path.join(__dirname, "../..", "config/webpack.dev.js"),
    //swig 需要搜索的模板文件路径
    "viewDir": path.join(__dirname, '..', 'views'),    
    //是否启用swig资源缓存
    "swigCache": "memory", //如果不需要的话就设置为false
    //静态文件所在的目录
    "staticDir": path.join(__dirname, '..')
}

export default config;