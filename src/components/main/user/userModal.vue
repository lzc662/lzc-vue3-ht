<template>
  <div class='modal'>
    <el-dialog v-model='centerDialogVisible' :title=' isNew === true?"新建用户":"编辑用户"' width='30%' center>
      <el-form
        ref='ruleFormRef'
        :model='modalData'
        label-position='right'
        label-width='80px'
      >
        <el-form-item prop='name' label='用户名'>
          <el-input v-model='modalData.name' placeholder='请输入用户名'></el-input>
        </el-form-item>
        <el-form-item prop='realname' label='真实姓名'>
          <el-input v-model='modalData.realname' placeholder='请输入真实姓名'></el-input>
        </el-form-item>
        <el-form-item v-show='isNew' prop='password' label='密码'>
          <el-input show-password v-model='modalData.password' type='password' placeholder='请输入密码'></el-input>
        </el-form-item>
        <el-form-item prop='cellphone' label='电话号码'>
          <el-input v-model='modalData.cellphone' placeholder='请输入电话号码'></el-input>
        </el-form-item>
        <el-form-item prop='roleId' label='选择角色'>
          <el-select v-model='modalData.roleId' placeholder='请选择角色' class='maxW'>
            <el-option
              v-for='item in roleList.list'
              :key='item.id'
              :label='item.name'
              :value='item.name'
            />
          </el-select>
        </el-form-item>
        <el-form-item prop='departmentId' label='选择部门'>
          <el-select v-model='modalData.departmentId' placeholder='请选择部门' class='maxW'>
            <el-option
              v-for='item in roleList.list'
              :key='item.id'
              :label='item.name'
              :value='item.name'
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class='dialog-footer'>
        <el-button @click='cancellation'>取消</el-button>
        <el-button type='primary' @click='submitList'>
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang='ts'>
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import { userSystemStore } from '@/stores/main/system/system.ts'
import { storeToRefs } from 'pinia'

const { getRoleList, createUser, getUserList, editUser } = (userSystemStore())
const { roleList, userData } = storeToRefs(userSystemStore())
getRoleList()

// 显示 隐藏 控制变量
const centerDialogVisible = ref(false) //对话框
const isNew = ref(true) //对话框中的密码选项
let userId = 0

// 表单数据
const modalData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  password: '',
  departmentId: '',
  roleId: ''
})

// 获取表单实例
const ruleFormRef = ref<InstanceType<typeof ElForm>>()

//取消表单
function cancellation() {
  ruleFormRef.value?.resetFields()
  centerDialogVisible.value = false
}


//修改表单  提交表单
async function submitList() {
  centerDialogVisible.value = false
  ruleFormRef.value?.resetFields()

  // 判断是否为新建数据，isNew为 false 时 为编辑数据
  if (isNew.value === true) {
    await createUser(modalData)
  } else {
    await editUser(userData.value.id, modalData)
  }
  getUserList()
}

// 编辑用户事件
// 暴露给user组件
function editUserData(value = {}) {
  if (JSON.stringify(value).length !== 2) {
    centerDialogVisible.value = true
    isNew.value = false
    for (const key in modalData) {
      modalData[key] = value[key]
    }
  } else {
    centerDialogVisible.value = true
    isNew.value = true
    for (const key in modalData) {
      modalData[key] = ''
    }
  }
  console.log('对话框', value)
}

defineExpose({ editUserData, centerDialogVisible })
</script>
<style lang='less'>

</style>