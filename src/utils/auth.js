import Cookies from 'js-cookie'

const TokenKey = 'hrsass-ihrm-token' //设置cookie的key
const timeKey = 'hrsass-timestamp-key' //设置时间戳的key


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getTimeStamp() {
  return Cookies.get(timeKey)
}

export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}


