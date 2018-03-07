<template>
    <div class="tab-content" style="display: block;">
        <!--网友评论-->
        <div class="comment-box">
            <!--评论-->
            <form id="commentForm" name="commentForm" class="form-box">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <!-- 发表评论 -->
                <div class="conn-box">
                    <div class="editor">

                        <textarea id="txtContent" v-model="submitComments.commenttxt" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                    </div>
                    <div class="subcon">
                        <input @click="sendComments" id="btnSubmit" type="button" name="submit" value="提交评论" class="submit">
                        <span class="Validform_checktip"></span>
                    </div>
                </div>
            </form>
            <!-- 获取评论总条数 -->
            <ul id="commentList" class="list-box">
                <!-- 控制显示隐藏 当没有数据时候显示 -->
                <p v-if="comments.length==0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                <li v-for="(item,index) in comments" :key="index">
                    <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="inner-box">
                        <div class="info">
                            <span>{{item.user_name}}</span>
                            <span>{{item.add_time}}</span>
                        </div>
                        <p>{{item.content}}</p>
                    </div>
                </li>
            </ul>
            <!--放置页码-->
            <div class="page-box" style="margin:5px 0 0 62px">
                <div id="pagination" class="digg">
                    <span class="disabled">« 上一页</span>
                    <span class="current">1</span>
                    <span class="disabled">下一页 »</span>
                </div>
            </div>
            <!--/放置页码-->
        </div>

        <!--/网友评论-->
    </div>
</template>

<script>
export default {
    //接收父组件Detail.vue中传来的id
    props: ['id'],

    data() {
        return {
            //评论列表
            comments: [],

            //提交评论
            submitComments: {
                commenttxt: ''
            },

            //分页
            pageIndex: '1',
            pageSize: '10'

        }
    },

    methods: {
        //获取评论列表
        getComments() {
            // 这个接口比较特殊, 需要一个tablename用来指定评论模块, 还需要id用来指定某模块下某个商品的评论
            let url = `${this.$api.commentList}goods/${this.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
            this.$http.get(url).then(res => {
                if (res.data.status == 0) {
                    this.comments = res.data.message;
                    
                }
            })
        },

        //发表评论
         sendComments(){
             
             let url=`${this.$api.comment}goods/${this.id}`;
            this.$http.post(url,this.submitComments).then(res=>{
                if(res.data.status == 0) {
                    console.log("gggggggggg");
                    // 成功后清空评论框
                    this.submitComments.commenttxt='';
                    // 成功后刷新评论列表
                    this.getComments();
                }
            }) 
        } 
    },

    created() {
        this.getComments();
    },

    // 当用户访问新的商品时, 需要重新调接口获取新商品的评论列表进行渲染
    watch: {
        id() {
            this.getComments();
        }
    }
}
</script>

<style scoped>

</style>