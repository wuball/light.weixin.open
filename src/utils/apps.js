import { time, requestBase } from "util.js"
var app = getApp()
var appdata = app.globalData





const getTenant = () => {
  if (appdata.tenant) {
    return appdata.tenant
  }
  var tenant = wx.getStorageSync("tenant")
  if (tenant) {
    appdata.tenant = tenant
    return tenant
  }
}

const setTenant = (data) => {
  var tenant = wx.getStorageSync("tenant") || {}
  appdata.tenant = appdata.tenant || {}
  if (data.tenantId) {
    appdata.tenant.tenantId = data.tenantId
    tenant.tenantId = data.tenantId
  }
  if (data.communityId) {
    appdata.tenant.communityId = data.communityId
    tenant.communityId = data.communityId
  }
  if (data.title) {
    appdata.tenant.title = data.title
    tenant.title = data.title
  }
  wx.setStorageSync('tenant', tenant)
}

const getUserInfo = () => {
  if (appdata.userInfo) {
    return appdata.userInfo
  }
  var userInfo = wx.getStorageSync("userInfo")
  if (userInfo) {
    appdata.userInfo = userInfo
    return userInfo
  }
}

const setUserInfo = (data) => {
  var userInfo = wx.getStorageSync("userInfo") || {}
  appdata.userInfo = appdata.userInfo || {}
  if (data.code) {
    appdata.userInfo.code = data.code
    userInfo.code = data.code
  }
  if (data.nickname) {
    appdata.userInfo.nickname = data.nickname
    userInfo.nickname = data.nickname
  }
  if (data.birthday) {
    appdata.userInfo.birthday = data.birthday
    userInfo.birthday = data.birthday
  }
  if (data.address) {
    appdata.userInfo.address = data.address
    userInfo.address = data.address
  }
  if (data.phoneNumber) {
    appdata.userInfo.phoneNumber = data.phoneNumber
    userInfo.phoneNumber = data.phoneNumber
  }
  if (data.avatarUrl) {
    appdata.userInfo.avatarUrl = data.avatarUrl
    userInfo.avatarUrl = data.avatarUrl
  }
  wx.setStorageSync('userInfo', userInfo)
}


const getToken = (callback) => {
  if (appdata.token) {
    var s = appdata.token.expireTime - time.getTimeStamp();
    if (s <= 0) {
      // Token 过期处理
      if (s < 3600000) {
        // 准备提前换取 token
        appdata.refreshToken = true
      }
      return undefined
    }
    return appdata.token.accessToken
  }

  var token = wx.getStorageSync("token")
  if (token) {
    if (time.getTimeStamp() > token.expireTime) {
      // Token 过期处理
    }
    appdata.token = token
    return token.accessToken
  }
}

const setToken = (data) => {
  var token = wx.getStorageSync("token") || {}
  appdata.token = appdata.token || {}
  if (data.accessToken) {
    appdata.token.accessToken = data.accessToken
    token.accessToken = data.accessToken
  }
  if (data.expireInSeconds) {
    var now = time.getTimeStamp()
    var expireTime = now + data.expireInSeconds * 1000
    appdata.token.expireTime = expireTime
    token.expireTime = expireTime
  }
  wx.setStorageSync('token', token)
}

const requestGet = (param) => {
  // param.enableToken = param.enableToken == undefined ? true : param.enableToken
  var header = {}
  // if (param.enableToken && this.getToken()) {
  //   header.Authorization = 'Bearer ' + this.getToken()
  // }
  if (getToken()) {
    header.Authorization = 'Bearer ' + getToken()
  }
  if (param.header) {
    Object.assign(header, param.header)
  }
  let option = {
    url: param.url,
    data: param.data,
    success: param.success,
    fail: param.fail,
    complete: param.complete,
    header: header,
    method: 'GET'
  }
  requestBase(option, appdata.isShowLoading)

}

const requestPost = (param) => {
  // param.enableToken = param.enableToken == undefined ? true : param.enableToken
  var header = {}
  // if (param.enableToken && getToken()) {
  //   header.Authorization = 'Bearer ' + getToken()
  // }

  if (getToken()) {
    header.Authorization = 'Bearer ' + getToken()
  }
  if (param.header) {
    Object.assign(header, param.header)
  }
  let option = {
    url: param.url,
    data: param.data,
    success: param.success,
    fail: param.fail,
    complete: param.complete,
    header: header,
    method: 'POST'
  }
  requestBase(option, appdata.isShowLoading)
}

// 根据 loading 的叠加层数控制 loading
const showLoading = (title, mask) => {
  appdata.isShowLoading++
  mask = mask == undefined ? true : mask
  title = title || ""
  wx.showLoading({
    title: title,
    mask: mask,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
}

const hideLoading = (title, mask) => {
  appdata.isShowLoading--
  if (appdata.isShowLoading <= 0) {
    wx.hideLoading()
  }
}

const consoleLog = (...contents) => {
  // arguments
  console.log(contents)
}



module.exports = {
  app: app,
  appdata: appdata,

  log: {
    info: consoleLog
  },

  cache: {
    getTenant: getTenant,
    setTenant: setTenant,

    getUserInfo: getUserInfo,
    setUserInfo: setUserInfo,

    getToken: getToken,
    setToken: setToken,
  },

  ask: {
    "get": requestGet,
    "post": requestPost,
  },

  load: {
    show: showLoading,
    hide: hideLoading,
  },
}




// module.exports = {
//   accessToken: { "set": setAccessToken },
//   tenant: { "get": getTenant, "set": setTenant },
//   userInfo: { "get": getUserInfo, "set": setUserInfo },
//   token: { "get": getToken, "set": setToken },
//   tenant: { "get": getTenant, "set": setTenant },
//   request: { "get": appGet, "set": appPost },
// }