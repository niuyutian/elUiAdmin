import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params){
    return request({
        url: "/sys/role",
        params
    })
}
//读取企业信息
export function getCompanyInfo(id){
    return request({
        url: `/company/${id}`,
    })
}
// 删除
export function deleteRole(id){
    return request({
        url: `/sys/role/${id}`,
        method:'delete'
    })
} 
export function getRoleDetail(id){
    return request({
        url: `/sys/role/${id}`,
    })
}
export function updateRole(data){
    return request({
        url: `/sys/role/${data.id}`,
        method:'put',
        data
    })
}
// 新增
export function addRole(data){
    return request({
        url: `/sys/role`,
        method:'post',
        data
    })
}
// 给角色分配权限
export function assignPerm(data) {
    return request({
      url: '/sys/role/assignPrem',
      method: 'put',
      data
    })
  }