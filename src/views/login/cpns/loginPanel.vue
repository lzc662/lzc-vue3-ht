<template>
  <div class='loginPanel'>
    <h2 class='title'>后台管理系统</h2>
    <div class='tabs'>
      <div class='top'>
        <el-tabs
          type='border-card'
          :stretch='true'
          v-model='activeName'>

          <!--          账号登陆-->
          <el-tab-pane name='account'>
            <template #label>
              <span class='custom-tabs-label'>
                <el-icon><UserFilled /></el-icon>
                <span style='margin-left: 6px;'>账号登陆</span>
              </span>
            </template>
            <div class='account '>
              <el-form label-width='60px'
                       size='large'
                       :model='account'
                       :rules='accountRules'
                       ref='refForm'
              >
                <el-form-item label='账号' prop='userAccount'>
                  <el-input placeholder='请输入账号' v-model='account.userAccount' />
                </el-form-item>
                <el-form-item label='密码' prop='userPassword'>
                  <el-input
                    v-model='account.userPassword'
                    type='password'
                    placeholder='请输入密码'
                    show-password
                  />
                </el-form-item>

              </el-form>
            </div>


          </el-tab-pane>

          <!--          手机号登陆-->
          <el-tab-pane name='phone' :inline='true'>
            <template #label>
              <span class='custom-tabs-label'>
                <el-icon><Iphone /></el-icon>
                <span style='margin-left: 6px;'>手机号登陆</span>
              </span>
            </template>
            <el-form label-width='100px' size='large'>
              <el-form-item label='手机号'>
                <el-input v-model='account.userAccount' />
              </el-form-item>
              <el-form-item label='请输入验证码'>
                <el-input v-model='account.userAccount' />
              </el-form-item>
              <el-form-item>
                <el-button ref='phoneCodeBtn' size='default' :loading='isLoading' @click='phoneCode()'>
                  <template #loading>
                    {{ codeTime > 9 ? codeTime : '0' + codeTime }}秒后
                  </template>
                  获取验证码
                </el-button>
              </el-form-item>

            </el-form>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
    <div class='controls'>
      <el-checkbox v-model='isRemember'>记住密码</el-checkbox>
      <span class='forgetPwd'>忘记密码</span>
    </div>
    <div class='loginBtn'>
      <el-button class='maxW' type='primary' @click='loginNow()'>立即登录</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { locationCache } from '@/utils/cache'
import { loginStore } from '@/stores/login/login'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

// router实例
const router = useRouter()

// tabs当前活跃name
const activeName = ref('account')

//用户账号密码
const account = reactive({
  userAccount: locationCache.getCache('account') ?? '',
  userPassword: locationCache.getCache('password') ?? ''
})
// 账号密码验证规则
const accountRules: FormRules = {
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,10}$/, message: '账号必须六位以上', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,10}$/, message: '必须六位以上的数字', trigger: 'blur' }
  ]
}

// 手机号登陆获取验证码
let codeTime = ref<number>()
let isLoading = ref<any>(false)
const phoneCode = () => {
  console.log(codeTime)
  codeTime.value = 10 //等待时间
  isLoading.value = true
  let timer = setInterval(() => {
    if (codeTime.value) {
      codeTime.value--
      if (codeTime.value <= 0) {
        clearTimeout(timer)
        isLoading.value = false
      }
    }
  }, 1000)
}

//记住密码
let isRemember = ref(true)

// 立即登陆按钮点击事件
const refForm = ref<InstanceType<typeof ElForm>>()//表单验证实例对象
const { getUserInfo } = loginStore()  //获取loginStroe实例
const loginNow = () => {
  refForm.value?.validate(vali => {
    // 格式正确时执行的操作
    if (vali) {
      // 记住密码
      if (isRemember.value) {
        locationCache.setCache('account', account.userAccount)
        locationCache.setCache('password', account.userPassword)
      }
      //删除记住密码缓存
      else if (!isRemember.value) {
        locationCache.clearCache()
      }
      const user = {
        name: account.userAccount,
        password: account.userPassword
      }
      getUserInfo(user).then(() => {
        ElMessage({
          message: '登陆成功',
          grouping: false,
          type: 'success'
        })

      })

    } else {
      ElMessage({
        message: '格式不正确',
        grouping: false,
        type: 'error'
      })
      // 跳转页面
      router.push('/main')
    }
  })


}
</script>

<style scoped lang='less'>

.loginPanel {
  .yzm-img {
    width: 50px;
    height: 20px;
    background-color: pink;
  }

  width: 350px;
  border: 1px silver solid;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  //background-color: pink;
  padding: 16px 30px;

  .tabs {
    margin-top: 10px;;
    width: 100%;
  }

  .controls {
    cursor: pointer;
    display: flex;
    font-size: 14px;
    color: #3d99ff;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
}


</style>