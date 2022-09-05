import request from '@/utils/request'

//登录接口
export function login(data) {
    // 返回一个promise 对象
    return request({
        url:'/sys/login',
        method:'post',
        data
    })
}
// 获取用户资料接口
export function getUserInfo() {
    return request({
        url:'/sys/profile',
        method:'post'
    })
}
// 根据用户id获取用户的详情,这里不写method :get 因为axios方法默认的请求方式就是get
export function getUserDetailById(id){
    return request({
        url:`/sys/user/${id}`
    })
}


export function logout() {

}
