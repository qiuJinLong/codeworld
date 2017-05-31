import * as types from '../mutation-types.js'
const state = {
	coursedata: [],
	bookDescList: {
		booknamelist:""
	},
	bookTotalPage: {
		totalPage:"",
		lastPage:""
	}
}
// mutations
const mutations = {
	[types.ADD_INFO](state, {datas}) {
		state.coursedata = datas.course;        
	},

	[types.GET_BOOKDESC_INFO](state, {datas}) {
		state.bookDescList = {
			booknamelist: datas.booknamelist
		}
	},
	
	[types.GET_BOOK_TOTAL_PAGE](state, {datas}) {
		datas = parseInt(datas) - 2;
		state.bookTotalPage = {
			totalPage: "hard p"+datas,
			lastPage: "hard fixed back-side p"+(datas - 1)
		}
	}

}

export default {
	state,
	mutations
}
