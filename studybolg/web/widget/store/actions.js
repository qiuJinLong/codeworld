import * as types from './mutation-types.js'

//文章模块列表
export
const addInfo = ({ commit }, {	me }) => {

	me.$http.get('index/getdata').then(response => {
		var datas = response.body;
		console.log("得到的", datas)
		commit(types.ADD_INFO, {
			datas
		})
	}, response => {
		console.error(response);
	});
}

//得到书籍列表数据
export
const getBookDescList = ({commit}, {me}) => {

    me.$http.get("/bookDesK/getData").then(response => {
        var datas = response.body;
        commit(types.GET_BOOKDESC_INFO, {
            datas
        });
    }, response => {
        console.error(response);
        console.error("书籍列表模块");
    });
};

//得到书的总共页数
export 
const getBookTotalPage = ({commit}, {me, bookdata}) => {

    me.$http.get("" + bookdata + "").then(response => {
        var datas = response.body.data;
        commit(types.GET_BOOK_TOTAL_PAGE, {
            datas
        });
        me.booklength = datas - 2;
        me.bookSidePage = me.booklength - 1; //倒数第二页
        me.init(me);
    }, response => {
        console.error(response);
        console.error("书籍模块");
    });
}