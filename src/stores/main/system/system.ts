import { defineStore } from 'pinia'
import {
  fetchUserList,
  fetchDeleteUser,
  fetchRoleList,
  newUserData,
  fetchEditUser
} from '@/service/module/main/system/actionUser'
import { reactive } from 'vue'

export const userSystemStore = defineStore('system', () => {

  // 用户列表
  const systemUserList = reactive({
      userList: [],
      totalCount: 0
    }
  )

  // 部门列表
  const roleList = reactive({
    list: [],
    totalCount: 0
  })

  // 编辑用户信息
  const userData = reactive({})

  // 获取用户列表
  async function getUserList(listInfo: any = { offset: 0, size: 20 }) {
    const res = await fetchUserList(listInfo)
    systemUserList.userList = res.data.list
    systemUserList.totalCount = res.data.totalCount
    // console.log(systemUserList)
  }

  //删除用户数据
  async function deleteUser(id: number) {
    const res = await fetchDeleteUser(id)
  }

  // 获取部门信息列表
  async function getRoleList() {
    const res = await fetchRoleList()
    roleList.list = res.data.list
    roleList.totalCount = res.data.totalCount
  }

  // 创建用户信息
  async function createUser(userInfo) {
    const res = await newUserData(userInfo)
    if (res.data !== '创建成功') {
      console.log('创建成功')
    }
  }

  // 编辑用户信息
  async function editUser(id: number, userInfo: any) {
    const res = await fetchEditUser(id, userInfo)
    console.log('res', res)
  }

  return { getUserList, systemUserList, deleteUser, getRoleList, roleList, createUser, userData, editUser }

})
