<template>
  <div class='userSearch'>

    <el-form ref='formRef' size='default' :model='user' label-width='80px' class='demo-form-inline'>
      <el-row :gutter='80'>
        <el-col :span='8' style='margin-bottom: 15px'>
          <el-form-item label='用户名' prop='name'>
            <el-input placeholder='请输入用户名' v-model='user.name' />
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label='真实姓名' prop='realname'>
            <el-input placeholder='请输入真实姓名' v-model='user.realname' />
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label='手机号码' prop='cellphone'>
            <el-input placeholder='请输入手机号码' v-model='user.cellphone' />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter='80'>
        <el-col :span='8'>
          <el-form-item label='状态' prop='enable'>
            <el-select
              style='width: 100%'
              placeholder='请选择状态'
              v-model='user.enable'
            >
              <el-option label='启用' value='0' />
              <el-option label='禁用' value='1' />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label='创建时间' prop='createAt'>
            <el-date-picker
              v-model='user.createAt'
              type='daterange'
              start-placeholder='开始时间'
              range-separator='-'
              end-placeholder='结束时间'
              :default-value='[new Date(2010, 9, 1), new Date(2010, 10, 1)]'
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter='80'>
        <el-col :span='8' :offset='16'>
          <div class='btns'>
            <el-button primary size='large' :icon='RefreshRight' @click='handleResetCick'>重置</el-button>
            <el-button type='primary' primary size='large' :icon='Search' @click='handleQueryClick'>查询</el-button>
          </div>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script setup lang='ts'>
import { RefreshRight, Search } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

// 用户表单数据
const user = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})

// 获取表单实例
const formRef = ref<InstanceType<typeof ElForm>>()

// 定义发射事件
const emit = defineEmits(['resetClick', 'queryClick'])

// 表单重置
function handleResetCick() {
  formRef.value?.resetFields()
  emit('resetClick', user)
}

// 表单查询
function handleQueryClick() {
  // console.log(user)
  emit('queryClick', user)
}

</script>

<style lang='less' scoped>
.userSearch {
  padding: 30px 80px 30px 50px;

  .btns {
    display: flex;
    justify-content: right;

    .el-button {
      height: 35px;
    }
  }
}
</style>