<template>
    <div>
        <!-- 面包屑 -->
        <div class="section">
            <div class="location my-location">
                <span>当前位置：</span>
                <router-link to="">首页</router-link>
                <router-link to="">购物商城</router-link>
            </div>
        </div>

        <!--页面头部 分类列表和轮播图  -->
        <div class="section">

            <div class="wrapper">

                <div class="wrap-box">

                    <!--类别菜单-->

                    <div class="left-220" style="margin:0;">

                        <div class="banner-nav">

                            <ul>

                                <!--此处声明下面可重复循环-->
                                <li v-for="item in top.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">{{ subitem.title }}&nbsp;
                                            </span>
                                        </p>

                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>

                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>

                                            <dd>
                                                <router-link to="" v-for="subitem in item.subcates" :key="subitem.id"></router-link>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <!--/类别菜单-->

                    <!--幻灯片-->

                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel trigger="click" style="height:100%">
                                <el-carousel-item class="my-carousel__container" v-for="item in top.sliderlist" :key="item.id">
                                    <!-- :src表示活的数据 -->
                                    <img :src="item.img_url" :alt="item.title">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>

                    <!--/幻灯片-->

                    <!-- 侧边栏 - 推荐商品列表, 抽取为公共组件 -->
                    <app-aside :list="top.toplist"></app-aside>
                </div>
            </div>
        </div>

        <!-- 页面主体 商品列表预览, 抽取为子组件 -->
        <list-main></list-main>
    </div>
</template>

<script>
import AppAside from './subcom/CommonAside.vue';
import ListMain from './subcom/ListMain.vue'

export default {
    //注册侧边栏和商品详情子组件
    components: {
        AppAside,
        ListMain
    },

    data() {
        return {
            top: {
                catelist: [],
                sliderlist: [],
                toplist: []
            }
        }
    },
    methods: {
        //获取页面顶部数据
        getTop() {
            this.$http.get(this.$api.goodsTop).then(res => {
                if (res.data.status == 0) {
                    this.top = res.data.message;
                    // console.dir(res.data.message);
                }
            })
        }
    },
    created() {
        this.getTop();
    }

}
</script>

<style scoped>
.my-location{
    
    position: absolute;
    left: 0px;
    top: 0px;
}
.my-carousel__container{
     height: 341px; 
}
</style>