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
// 获取单个部门详情
export function getDepartDetail(id){
    return request({
        url:`/company/department/${id}`,
    })
}

// 保存编辑的数据
export function updateDepartments(data){
    return request({
        method:'put',
        url:`/company/department/${data.id}`,
        data
    })
}