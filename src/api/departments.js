import request from '@/utils/request'
// 获取组织架构
export function getDepartments(){
    return request({
        url: "/company/department"
    })
}
// 删除组织架构
export function delDepartment(id){
    return request({
        url:`/company/department/${id}`,
        method :'delete'
    })
}
// 新增组织架构
export function addDepartment(data){
    return request({
        url:`/company/department`,
        method :'post',
        data
    })
}