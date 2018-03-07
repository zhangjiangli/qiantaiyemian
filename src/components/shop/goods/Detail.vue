<template>
    <div>
        商品细节部分
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodsDetail.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" alt="">
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{goodsDetail.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsDetail.goodsinfo.zhaiyao}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsDetail.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsDetail.goodsinfo.market_price}}.00</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{goodsDetail.goodsinfo.sell_price}}.00</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- 用element-ui的组件 v-model双向数据绑定-->
                                                <el-input-number size="mini" :min="1" v-model="num"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsDetail.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                                <button class="add" onclick="cartAdd(this,'/',0,'/cart.html');">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>
                        <!-- 商品详情与评论 -->
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <!-- <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a class="selected" href="javascript:;">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" class="">商品评论</a>
                                        </li>
                                    </ul>
                                </div> -->
                            <el-tabs type="border-card">
                                <el-tab-pane label="商品介绍">
                                    <div v-html="goodsDetail.goodsinfo.content"></div>
                                </el-tab-pane>
                                <el-tab-pane label="商品评论">
                                    <comment :id="id"></comment>
                                </el-tab-pane>
                                
                            </el-tabs>
                            <!--/选项卡-->

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <app-aside :list="goodsDetail.hotgoodslist"></app-aside>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//引入公共右侧边栏-商品列表 
import AppAside from './subcom/CommonAside.vue'
import Comment from './subcom/CommonComment.vue'

//导入插件的css与js以及jquery
import '@/lib/imgzoom/css/magnifier.css'
import '@/lib/imgzoom/js/magnifier.js'
import $ from 'jquery'

export default {
    components: {
        AppAside,
        Comment
    },
    data() {
        return {
            //拿到首页页面点击商品跳转的id
            id: this.$route.params.id,
            //购物车初始数量
            num: 1,
            goodsDetail: {
                goodsinfo: {},
                imglist: [],
                hotgoodslist: []
            }


        }
    },
    methods: {
        //根据当前id获取数据
        getGoodsDetail() {
            this.$http.get(this.$api.goodsDetail + this.id).then(res => {
                if (res.data.status == 0) {
                    //将数据赋给data中的goodsDetail
                    this.goodsDetail = res.data.message;
                }
            })
        },

        //放大镜初始化方法
        fdj() {
            $(function() {

                var magnifierConfig = {
                    magnifier: "#magnifier1",//最外层的大容器
                    width: 370,//承载容器宽
                    height: 370,//承载容器高
                    moveWidth: null,//如果设置了移动盒子的宽度，则不计算缩放比例
                    zoom: 3//缩放比例
                };

                //因为我们使用v-for动态生成列表，调用该方法时不能保证列表已经构建完毕, 所以延时一下
                //调用这个插件，必须保证放大镜相关的DOM节点都已正常构建渲染
                setTimeout(function() {
                    var _magnifier = $().imgzoon(magnifierConfig);
                }, 200);



            })
        }

    },

    created() {
        this.getGoodsDetail();
    },

    // 商品详情页面的右侧列表, 可以点击切换不同的商品进行预览
    // 但是默认情况下当前页面切换到当前页面不会触发组件的重新渲染, 为了解决这个问题,
    // 我们可以监听route对象的变化, 因为切换商品后, route.params.id变化了, 我们监听它, 
    // 然后主动发起http请求, 调用接口获取新id的数据进行视图刷新

    watch: {
        $route() {
            this.id = this.$route.params.id;
            this.getGoodsDetail();
        },

        // 监听放大镜图片数据的变化, 变化后重新调用插件初始化方法
        goodsDetail() {
            this.fdj();
        }
    },

    //视图挂载到页面上了, 这里可操作DOM
    mounted() {
        this.fdj();
    },



}
</script>

<style scoped>

</style>