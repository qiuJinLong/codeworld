"use strict";

const indexController = {
	index() {
		return async(ctx, next) => {
			ctx.body = await ctx.render("index/pages/index.html", {
				"title":"一等学堂 学员学习系统"
			});
		}
	},
	getdata() {
		return async(ctx, next) => {
			ctx.body = {
				course:[ { imgsrc:"node", videourl: ""},{ imgsrc:"js", videourl:"gray"} ]
			};
		}
	}
};

export default indexController;
