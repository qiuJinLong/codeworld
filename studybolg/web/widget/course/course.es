import './course.less';
import store from '../store';
const  mapState = Vuex.mapState;

 let course = {
     init() {
         const vm = new Vue({
             store,
             el: '#app',
             computed: {
                coursedata() {
                    console.log("$$$$");
                    console.log(store);
                    console.log(store.state.database.coursedata);
                    return store.state.database.coursedata;
                }
             },

             // computed: mapState({
             //    coursedata: state => state.database.coursedata
             // }),

             data: {
                 isShow: false,
                 msg: '文章列表',
             },
             methods: {
                initpage:function(){
                    let me=this;
                    this.$store.dispatch('addInfo', {
                         me
                    });
                }
             },
             mounted(){
                this.initpage();
                //console.log('数据1：',this.datas)           
             }
         });
     }
 };
 export
 default course;