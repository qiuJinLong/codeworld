##我的学习博客系统
	
	-- 基于KOA2 + swig + Nodejs + VUEX + es6 + webpack + gulp
	-- 该项目用来展示视频学习课程内容，并且带有图书馆功能。
	-- 后端使用node，前端使用Vue这个MVVM框架，用swig模板来渲染页面，作为node与Vue的链接桥梁
	-- 并且使用了组件化的思想，每个模板由widget组成，每个widget就是一个单独的Vue模块
	-- 通过Vuex来管理所有状态的数据响应
	-- 使用Webpack在资源打包的时候，做了一个静态资源的分包脚手架（web/ webAssetsHelp.js）
	-- 通过它来实现生成模板页面时，静态资源能精准、有序的打到模板的指定位置
	-- karma + mocha + selenium + protractor 来做接口、路由、页面模拟点击等的自动化测试
	
	-- npm install / yarn install
	-- npm run deploy
	-- cd build
	-- node learnapp.js
	-- http://localhost:3000
	
	-- 我的另一个项目 https://github.com/qiuJinLong/thumbpraise
	-- 大拇指点赞项目，用到了PHP + KOA2 + swig模板 + x-tag + pjax + es6 + babel + Webpack 
	   + gulp + yarn + karma + jasmine + phantomjs + mocha + supertest + Selenium + protractor等技术



