<template>
    <div class="login">
        <section>
            <!-- rules表示校验规则 要校验必须写上prop -->
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="uname">
                    <el-input type="text" v-model="ruleForm2.user_name" auto-complete="off" label-width="190px"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="upwd">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
export default {
    data() {

        
        return {
            ruleForm2: {
                user_name: '',
                password: ''
            },

            rules2: {
                user_name: [{ required: true, message: "请输入用户名", trigger: "blur" },
                { min: 5, max: 18, message: "用户名长度为5-18位", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            }
        };
    },
    methods: {
        login() {
            this.$http.post(this.$api.login, this.ruleForm2).then(res => {
                if (res.data.status == 0) {
                    this.$alert("登录成功", "提示", {
                        callback: () => {
                            localStorage.setItem('user_name', res.data.message.user_name);
                            // 使用了路由插件后, 就会拥有该对象 push表示路径跳转
                            // this.$router.push({ name: 'admin' });
                            //登录成功成功后，跳转到登录前要访问的地址
                            let nexPage = this.$route.query.next || '/goods/list';
                            this.$router.push({ path: nexPage });
                        }
                    });
                } else {
                    this.$alert(res.data.message);
                }

            });
        },
        submitForm(formName) {
            //validate校验全部表单
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped lang="less">
.login {
    height: 100%;
    background: skyblue;

    section {
        width: 480px;
        height: 250px;
        margin: 0 auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        border: 2px solid #f0f0f0;
        border-radius: 5px;

        form {
            margin-top: 40px;
            .el-input {
                width: 88%;
            }
        }
    }
}
</style>