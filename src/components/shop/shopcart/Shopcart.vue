<template>
    <div>
        购物车
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <!-- 绑定一个value值 是由其他商品的selected值共同决定的 -->
                                        <!-- @change表示 switch 状态发生变化时的回调函数-->
                                        <el-switch :value="allSelected" @change="allChange" active-color="#13ce66"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="i in shopCart" :key="i.id">

                                    <td width="48" align="center">
                                        <el-switch v-model="i.selected" active-color="#13ce66"></el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div style="float:left;margin-right:12px">
                                            <img :src="i.img_url" alt="">
                                        </div>
                                        <div style="float:left;line-height:60px">
                                            <span style="display:block;width:100%;height:100%">{{i.title}}</span>
                                        </div>

                                    </td>
                                    <td width="84" align="left" colspan="1">￥{{i.sell_price}}.00</td>
                                    <td width="104" align="center">
                                        <!-- <el-input-number size="small" v-model="$store.state.carts[item.id]" :min="1"></el-input-number> -->
                                        <el-input-number :min="1" v-model="i.buycount"></el-input-number>

                                    </td>
                                    <td width="104" align="center">
                                        ￥{{i.sell_price * i.buycount}}.00
                                    </td>

                                    <td width="54" align="center">
                                        <el-button @click="del(i.id)" type="danger" size="small" plain>删除</el-button>
                                    </td>
                                </tr>
                                <tr v-if="shopCart.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{total}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="$router.go(-1)">继续购物</button>
                            <button class="submit" @click="pay">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shopCart: [],

        }
    },
    //计算属性
    computed: {
        // 定义一个控制全选按钮的属性, 这个属性的值与shopCart里的每一个商品selected值相关
        // 如果所有商品的selected为true, 那么这个属性值就为true, 有一个false, 那么就为false
        allSelected() {
            //every表示数组中的每一个
            return this.shopCart.every(v => v.selected)
        },

        //遍历所有商品 如果是被选中的商品 累加商品的数量
        total() {
            let sum = 0;
            this.shopCart.forEach(v => v.selected && (sum += v.buycount));
            return sum;
        },
        totalPrice() {
            let sum = 0;
            this.shopCart.forEach(v => v.selected && (sum += v.buycount * v.sell_price));
            return sum;
        }
    },
    methods: {
        getshopcargoods() {
            //拿出cart中的所有keys
            let ids = Object.keys(this.$store.state.carts);
            this.$http.get(this.$api.shopcartGoods + ids).then(res => {
                if (res.data.status == 0) {
                    //给每个商品统一添加控制开关selected 默认都为true
                    res.data.message.forEach(v => v.selected = true);
                    // 修改data数据, 视图刷新
                    this.shopCart = res.data.message;
                    // console.log(this.shopCart);
                    for (var count in this.shopCart) {
                        this.shopCart[count].buycount = this.$store.state.carts[this.shopCart[count].id];
                    }
                }
            })
        },

        // 监听全选按钮的点击事件, 得到新的状态值, 然后遍历所有商品依次设为新的状态
        allChange(newStatus) {
            //newStatus为true时候，下面全部开关为true，false也一样
            this.shopCart.forEach(v => v.selected = newStatus);
        },

        // 删除 => 先从goodsList里面删除, 再从全局cart状态里删除
        del(id) {
            this.shopCart = this.shopCart.filter(v => v.id != id); // 找出不删除的商品
            this.$store.commit('del', id);                           // 调用mutaions方法删除
        },

        //立即结算按钮，跳转到信息填写页面
        pay(){
            //先找出被选中的商品，然后提取商品中的id
            let ids=this.shopCart.filter(v=>v.selected).map(v=>v.id)
            console.log(ids);
            // 把选中的商品ID传递到下个页面使用 => 这里的ids记得变成字符串再传递
            this.$router.push({name:'orderSite',params:{ids:ids.join(',')}});
        }
    },
    created() {
        this.getshopcargoods();
    }

}
</script>

<style scoped>
img {
    width: 60px;
    height: 60px;
}
</style>