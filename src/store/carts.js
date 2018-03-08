import Vue from 'vue'
/* 将数据存到本地存储中 */
export default {
    state: {
        carts: JSON.parse(localStorage.getItem('carts')) || {},
        sum:0
    },

    // 定义修改状态的方法, 这里的方法需要通过store.commit(方法名称, 参数)
    mutations: {
        modify(state, data) {
            let { id, num } = data;
            // state.carts[id] = num; 
            Vue.set(state.carts,id,num);
            // 每次状态变化后, 把新的状态记录在本地storage里, 放置页面刷新后数据丢失
            //JSON.stringify()是将js格式转换为字符串格式
            localStorage.setItem('carts',JSON.stringify(state.carts));
            state.sum+=state.carts[id];
            // console.log(state.cart);
        },

        del(state,id){
            // 第一个参数为要删除属性的对象, 第二个参数为属性名
            Vue.delete(state.carts,id)

            // 每次状态变化后, 把新的状态记录在本地storage里, 放置页面刷新后数据丢失
            localStorage.setItem('carts',JSON.stringify(state.carts));
        }


    },

    getters: {
        total(state){
            // values先拿到对象里的val数量, 然后reduce把他们合并相加
            return Object.values(state.carts).reduce((sum, v) => sum += v, 0);
        }
    } 

}