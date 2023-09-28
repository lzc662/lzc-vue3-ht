import lzcRequest from '@/service'

// 用户列表网络请求
export function fetchUserList(listInfo: any) {
  return lzcRequest.post({
    url: '/users/list',
    data: {
      ...listInfo
    }
  })
}

// 删除用户
export function fetchDeleteUser(id: Number) {
  return lzcRequest.delete({
    url: `/role/${id}`
  })
}

// 获取所有角色
export function fetchRoleList() {
  return lzcRequest.post({
    url: '/role/list',
    data: {
      offset: 0, size: 10
    }
  })
}

// 获取所有部门
export function getDepartment() {
  return lzcRequest
}

// 创建用户角色
export function newUserData(userInfo: any) {
  console.log('aciton', userInfo)
  return lzcRequest.post({
    url: '/users',
    data: {
      // ...userInfo, 暂时禁用
      'name': 'james',
      'realname': '詹姆斯',
      'password': '123456',
      'cellphone': 13322223338,
      'departmentId': 1,
      'roleId': 1
    }
  })
}

// 编辑用户角色
export function fetchEditUser(id: number, userInfo: any) {
  console.log('修改成功')
  console.log(id, userInfo)
  return lzcRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}