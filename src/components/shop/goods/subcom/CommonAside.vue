<template>
    <div>
        <div class="left-220">
            <h3>推荐商品</h3>
            <ul class="side-img-list">

                <li v-for="(item,index) in list" :key="item.id">
                    <div class="img-box">
                        <label>{{index+1}}</label>
                        <img :src="item.img_url">
                    </div>
                    <div class="txt-box">
                        <router-link :to="{name:'goodsDetail',params:{id:item.id}}">{{item.title}}</router-link>
                        <!-- <a href="/goods/show-98.html">{{item.title}}</a> -->
                        <!-- 设置日期管道符 过滤 设置时间格式-->
                        <span>{{item.add_time | date}}</span>
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
    //接收父组件List传过来的数据
    props: ['list'],

    //局部过滤器
    filters: {
        //日期过滤器
        date(tplDate){
            let date=new Date(tplDate);
            return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

        }
    }
}   
</script>

<style scoped lang="less">
.left-220{
    height: 100%;
    background: #fff;
    

    h3{
        padding: 20px 0 10px 0;
        margin-left: 16px; 
        margin-right: 16px;
        border-bottom: 1px #ccc solid;
    }
    

}
</style>