<template>
  <div class='user'>

    <!--    查询区域-->
    <div class='search box'>
      <search @queryClick='searchClick' @resetClick='resetList'></search>
    </div>

    <!--   表格区域-->
    <div class='content box'>
      <content ref='refTable' @editClick='editUserClick' @newUserClick='newClick'></content>
    </div>

    <userModal ref='refNewUserModal'></userModal>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import search from '@/components/main/user/userSearch.vue'
import content from '@/components/main/user/userContent.vue'
import userMoadl from '@/components/main/user/userModal.vue'

// 获取表格实例
const refTable = ref<InstanceType<typeof content>>()
const refNewUserModal = ref<InstanceType<typeof userMoadl>>()

// 查询事件
function searchClick(value) {
  refTable.value!.fetchUserListAction(value)
}

// 重置表格
function resetList() {
  refTable.value!.fetchUserListAction()
}

// 新建用户显示
function newClick() {
  refNewUserModal.value!.centerDialogVisible = true
  refNewUserModal.value!.editUserData()
}

// 编辑用户点击
function editUserClick(value) {
  refNewUserModal.value!.editUserData(value)
}
</script>

<style scoped lang='less'>


.user {
  //background-color: skyblue;
  .box {
    border-radius: 6px;
    background-color: #fff;
  }

  .search {
    margin-bottom: 20px;

  }

  .content {
    margin-top: 10px;

  }


}
</style>