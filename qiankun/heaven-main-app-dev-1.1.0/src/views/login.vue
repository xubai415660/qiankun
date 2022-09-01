<template>
  <div class="page">
    <div class="page-title">乾坤微应用专题</div>
    <div class="page-container flex-col-c">
      <div class="page-container-card flex-row-end">
        <el-form class="login-form" ref="form" :model="form" :rules="rules" @keyup.enter.native="submit">
          <p class="login-form-title">登录</p>
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <template slot="prefix">
                <i class="input-icon input-icon-name"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码">
              <template slot="prefix">
                <i class="input-icon input-icon-password"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-footer">
      <p>国家电网有限公司版权所有</p>
      <p>Copyright @2021 -2030 Stater Grid Corporation of China(SGCC).All rights reserved</p>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login';
import { getMicroApps } from '@/api/system';
import { mapActions } from 'vuex';
export default {
    name: 'Login',
    data () {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    created () {
        // 清除 storage store 中保存的数据
        this.clearAllStore();
    },
    methods: {
        ...mapActions('common', {
            // 清空store
            clearAllStore: 'clearAllStore',
            // 保存用户信息
            setLogin: 'setLogin',
            // 保存用户可访问的微应用信息
            setUserMicroApps: 'setUserMicroApps'
        }),
        submit () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    login(this.form).then((res) => {
                        if (res.data.code === 200) {
                            this.setLogin(res.data.data);
                            this.getMicroApps();
                        }
                    });
                }
            });
        },
        // 获取微应用列表
        getMicroApps () {
            getMicroApps().then((res) => {
                console.log('获取微应用列表成功!', res);
                if (res.data.code === 200) {
                    this.setUserMicroApps(res.data.data.filter((i) => i.menus.length));
                    this.$router.replace('/');
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
@import '~@/common/style/var.scss';
.page {
    width: 100%;
    height: 100%;
    background-color: $color-primary;
    overflow-x: hidden;
    &-title {
        position: fixed;
        left: 0;
        top: 50px;
        width: 100%;
        z-index: 2;
        text-align: center;
        font-size: 50px;
        font-weight: 700;
        line-height: 66px;
        color: #ffffff;
        letter-spacing: 26px;
        text-shadow: $color-primary 1px 0 0, $color-primary 0 1px 0, $color-primary -1px 0 0, $color-primary 0 -1px 0;
    }
    &-container {
        width: 1347px;
        height: 723px;
        background: url(~@/assets/images/login/page_bg.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &-card {
            width: 1114px;
            height: 472px;
            background: url(~@/assets/images/login/card_bg.png) no-repeat #fff;
            box-shadow: 0 2px 12px 0 #0000001a;
            border-radius: 16px;
        }
        .login-form {
            width: 415px;
            padding-right: 35px;
            padding-top: 104px;
            &-title {
                font-size: 30px;
                font-weight: bold;
                line-height: 40px;
                color: #333333;
                letter-spacing: 20px;
                padding-left: 10px;
                text-align: center;
                margin-bottom: 40px;
            }
            ::v-deep.el-form-item {
                margin-bottom: 30px;
            }
            ::v-deep.el-input {
                border: none !important;
            }
            ::v-deep.el-input__inner {
                height: 40px;
                line-height: 40px;
                padding-left: 36px;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
            }
            .input-icon {
                width: 16px;
                height: 16px;
                display: inline-block;
                background-size: 100% 100%;
                margin-top: 12px;
                margin-left: 6px;
                &.input-icon-name {
                    background-image: url(~@/assets/images/login/icon_name.png);
                }
                &.input-icon-password {
                    background-image: url(~@/assets/images/login/icon_pwd.png);
                }
            }
            .el-button {
                width: 100%;
                margin-top: 10px;
                height: 40px;
                box-shadow: 0 3px 12px #0e7c6c;
                border-radius: 4px;
                font-size: 16px;
            }
        }
    }
    &-footer {
        position: fixed;
        left: 0;
        bottom: 20px;
        width: 100%;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        line-height: 24px;
        color: #12c6ad;
    }
}
</style>
