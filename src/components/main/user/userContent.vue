<template>
  <div class='userContent'>
    <!--    头部-->
    <div class='header'>
      <div class='title'>用户列表</div>
      <el-button primary type='primary' text @click='newInfo'>新建数据</el-button>
    </div>
    <!--    表格区域-->
    <div class='table'>

      <el-table
        :data='systemUserList.userList'
        :border='true'
        style='width: 100%'
        size='large'

      >
        <el-table-column align='center' type='selection' />
        <el-table-column align='center' label='序号' width='70' type='index' />
        <el-table-column align='center' label='用户名' prop='name' width='120'></el-table-column>
        <el-table-column align='center' label='真实姓名' prop='realname' width='120'></el-table-column>
        <el-table-column align='center' label='手机号码' prop='cellphone' width='150'></el-table-column>
        <el-table-column align='center' label='状态' prop='enable' width='90'>
          <template #default='scope'>
            <el-button :type='scope.row.enable ? "primary":"danger"' size='small' plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align='center' label='创建时间' prop='createAt'>
          <template #default='scope'>
            {{ formateUtc(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align='center' label='更新时间' prop='updateAt'>
          <template #default='scope'>
            {{ formateUtc(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align='center' width='180' label='操作'>
          <template #default='scope'>
            <el-button @click='editUserClick(scope.row)' type='primary' :icon='EditPen' size='small' text>编辑</el-button>
            <el-button @click='deleteUserClick(scope.row)' type='danger' :icon='Delete' size='small' text>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页 -->
    <div class='pagingtion'>
      <el-pagination
        v-model:current-page='currentPage'
        v-model:page-size='currentPageSize'
        :page-sizes='[1, 5,10,20]'
        small='small'
        layout='total, sizes, prev, pager, next, jumper'
        :total='systemUserList.totalCount'
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
      />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { userSystemStore } from '@/stores/main/system/system'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { formateUtc } from '@/utils/format'

const emit = defineEmits(['newUserClick', 'editClick'])

// 获取store实例对象
const userStore = userSystemStore()


// 分页数据
// 每页显示几条数据 显示第几页的数据
const currentPage = ref(1) //进入页数
const currentPageSize = ref(5) //默认加载条数

// 发送列表网络请求
// 获取用户列表
const { systemUserList, userData } = storeToRefs(userStore)
const { getUserList, deleteUser } = userStore
fetchUserListAction()

// 新建数据
function newInfo() {
  // console.log('新建数据')
  emit('newUserClick')
}

// 编辑用户数据
function editUserClick(value) {
  emit('editClick', value)
  userData!.value = value
  // console.log('我是', userData.value)
}

// 删除用户数据
async function deleteUserClick(value) {
  await deleteUser(value.id)
  fetchUserListAction()
}

// 默认页数发生改变
const handleSizeChange = () => {
  fetchUserListAction()
}

// 跳转到第n页
const handleCurrentChange = () => {
  fetchUserListAction()

}

// 定义表单请求函数
// 暴露给父组件
function fetchUserListAction(value: any = {}) {
  const size = currentPageSize.value
  const offset = (currentPage.value - 1) * size

  const listInfo = { ...value, size, offset }

  // 此请求为请求表单数据
  getUserList(listInfo)
}

defineExpose({ fetchUserListAction })

</script>

<style lang='less' scoped>
.userContent {
  padding: 20px;


  .header {
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .pagingtion {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>