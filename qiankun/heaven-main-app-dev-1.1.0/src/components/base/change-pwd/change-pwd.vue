<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible="showDialog"
      width="500px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closePwd"
    >
      <el-form label-width="100px" :model="forgerForm" ref="forgerForm" :rules="rules">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="forgerForm.oldPassword" show-password />
        </el-form-item>
        <el-form-item label="密码" prop="newPassword">
          <el-input v-model="forgerForm.newPassword" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="forgerForm.confirmPassword" show-password />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePwd">取 消</el-button>
        <el-button type="primary" @click="confirmPwd" :disabled="confirmPwdDisabled">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name: 'ChangePwd',
    props: {
        showDialog: {
            type: Boolean,
            default: false
        }
    },
    data () {
        const chineseValidate = (rule, value, callback) => {
            let reg = /([\u4e00-\u9fa5]|[\ufe30-\uffa0])/;
            if (reg.test(value)) {
                callback(new Error('密码不能包含中文'));
            }
            callback();
        };
        const validatePass = (rule, value, callback) => {
            let passwordreg = /^[A-z](?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[0-9]).{8,20}$/;
            if (!passwordreg.test(value)) {
                callback(new Error('密码不符合规则'));
                this.$notify.warning({
                    title: '警告',
                    message: '必须以字母开头，包含字母数字特殊符号长度8-20位',
                    type: 'warning'
                });
            }
            callback();
        };
        return {
            confirmPwdDisabled: false, // 忘记密码disabled
            forgerForm: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            rules: {
                oldPassword: [
                    {
                        required: true,
                        message: '请输入原密码',
                        trigger: 'blur'
                    },
                    {
                        validator: chineseValidate,
                        trigger: 'blur'
                    }
                ],
                newPassword: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        validator: chineseValidate,
                        trigger: 'blur'
                    },
                    {
                        validator: validatePass,
                        trigger: 'blur'
                    }
                ],
                confirmPassword: [
                    {
                        required: true,
                        message: '请再次输入密码',
                        trigger: 'blur'
                    },
                    {
                        validator: chineseValidate,
                        trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.forgerForm.newPassword) {
                                callback(new Error('两次密码不一致'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        // 修改密码
        confirmPwd () {
            this.$refs.forgerForm.validate((valid) => {
                if (valid) {
                    this.closePwd();
                    // this.confirmPwdDisabled = true;
                    // changePwd(this.forgerForm).then(res => {
                    //   if (res.data.code === 200) {
                    //     this.$notify.success({
                    //       title: '成功',
                    //       message: '修改成功,3秒后跳转到登录页!'
                    //     });
                    //     setTimeout(() => {
                    //       this.$router.replace('/login');
                    //     }, 3000);
                    //   }
                    // })
                }
            });
        },
        // 关闭修改密码弹窗
        closePwd () {
            this.$refs.forgerForm.resetFields();
            this.$emit('update:showDialog', false);
        }
    }
};
</script>
