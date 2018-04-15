//app.js

App({
  onLaunch: function () {
    // var one = {
    //   a: 1,
    //   b: 2
    // }
    // var two = {
    //   b: 1,
    //   c: 3
    // }
    // var three = Object.assign(one, two)
    // log.info('one', one)
    // log.info('three', three)

    // util.showToast()
    // util.showLoading()
    // setTimeout(() => {
    //   util.hideLoading()
    // }, 2000)


    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     setTimeout(() => {

    //     }, 3000)
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  onShow: function () {
    if (this.globalData.refreshToken) {
      this.refreshToken()
    }
  },

  globalData: {
    userInfo: null,
    tenant: null,
    token: null,

    reloadCount: 0,
    isShowLoading: 0,
    refreshToken: false
  },


  // setAccessToken: function (tenantId, callback) {
  //   var _this = this
  //   var tenant = this.getTenant()
  //   if (!tenantId && !(tenant && tenant.tenantId)) {
  //     wx.navigateTo({
  //       url: '/pages/profile/community/community'
  //     })
  //     return
  //   }

  //   var isReToken = false

  //   if (tenant) {// 本地有缓存的情况
  //     if (tenant.tenantId == tenantId) {// 判断缓存与用户信息是否一致
  //       if (this.getToken()) {// 一致则验证 token 是否过期
  //         // 没过期则不处理
  //       } else {
  //         // 过期则重新获取
  //         isReToken = true
  //       }
  //     } else {
  //       // 不一致则使用用户信息重新获取 token
  //       isReToken = true
  //       tenant.tenantId = tenantId
  //       this.setTenant(tenant)
  //     }
  //   } else {// 本地无缓存的情况
  //     //根据用户信息获取 token
  //     isReToken = true
  //     tenant.tenantId = tenantId
  //     this.setTenant(tenant)
  //   }

  //   if (isReToken) {
  //     log.info("isReToken", isReToken)
  //     this.refreshToken(callback)
  //   } else {
  //     log.info("isReToken", isReToken)
  //     if (callback) {
  //       callback()
  //     } else {
  //       wx.hideLoading()
  //     }
  //   }

  // },

  // getTenant: function () {
  //   if (this.globalData.tenant) {
  //     return this.globalData.tenant
  //   }
  //   var tenant = wx.getStorageSync("tenant")
  //   if (tenant) {
  //     this.globalData.tenant = tenant
  //     return tenant
  //   }
  // },

  // setTenant: function (data) {
  //   var tenant = wx.getStorageSync("tenant") || {}
  //   this.globalData.tenant = this.globalData.tenant || {}
  //   if (data.tenantId) {
  //     this.globalData.tenant.tenantId = data.tenantId
  //     tenant.tenantId = data.tenantId
  //   }
  //   if (data.communityId) {
  //     this.globalData.tenant.communityId = data.communityId
  //     tenant.communityId = data.communityId
  //   }
  //   if (data.title) {
  //     this.globalData.tenant.title = data.title
  //     tenant.title = data.title
  //   }
  //   wx.setStorageSync('tenant', tenant)
  // },

  // getUserInfo: function () {
  //   if (this.globalData.userInfo) {
  //     return this.globalData.userInfo
  //   }
  //   var userInfo = wx.getStorageSync("userInfo")
  //   if (userInfo) {
  //     this.globalData.userInfo = userInfo
  //     return userInfo
  //   }
  // },

  // setUserInfo: function (data) {
  //   var userInfo = wx.getStorageSync("userInfo") || {}
  //   this.globalData.userInfo = this.globalData.userInfo || {}
  //   if (data.code) {
  //     this.globalData.userInfo.code = data.code
  //     userInfo.code = data.code
  //   }
  //   if (data.nickname) {
  //     this.globalData.userInfo.nickname = data.nickname
  //     userInfo.nickname = data.nickname
  //   }
  //   if (data.birthday) {
  //     this.globalData.userInfo.birthday = data.birthday
  //     userInfo.birthday = data.birthday
  //   }
  //   if (data.address) {
  //     this.globalData.userInfo.address = data.address
  //     userInfo.address = data.address
  //   }
  //   if (data.phoneNumber) {
  //     this.globalData.userInfo.phoneNumber = data.phoneNumber
  //     userInfo.phoneNumber = data.phoneNumber
  //   }
  //   if (data.avatarUrl) {
  //     this.globalData.userInfo.avatarUrl = data.avatarUrl
  //     userInfo.avatarUrl = data.avatarUrl
  //   }
  //   wx.setStorageSync('userInfo', userInfo)
  // },

  // refreshToken: function (callback) {
  //   log.info("refreshToken starting")

  //   var _this = this
  //   var tenant = this.getTenant()
  //   log.info("tenant", tenant)
  //   this.appPost({
  //     url: url.userSign,
  //     data: {
  //       Code: _this.globalData.userInfo.code,
  //     },
  //     success: function (res) {
  //       _this.globalData.refreshToken = false
  //       _this.setToken(res.data.result)
  //       log.info("callback", callback)
  //       if (callback) {
  //         callback()
  //       }
  //     },

  //     header: { "Abp.TenantId": tenant.tenantId },
  //     showLoading: true,
  //     enableToken: false
  //   })
  // },

  // getToken: function (callback) {
  //   if (this.globalData.token) {
  //     var s = this.globalData.token.expireTime - util.getTimeStamp();
  //     if (s <= 0) {
  //       // Token 过期处理
  //       if (s < 3600000) {
  //         // 准备提前换取 token
  //         this.globalData.refreshToken = true
  //       }
  //       return undefined
  //     }
  //     return this.globalData.token.accessToken
  //   }

  //   var token = wx.getStorageSync("token")
  //   if (token) {
  //     if (util.getTimeStamp() > token.expireTime) {
  //       // Token 过期处理
  //     }
  //     this.globalData.token = token
  //     return token.accessToken
  //   }
  // },

  // setToken: function (data) {
  //   var token = wx.getStorageSync("token") || {}
  //   this.globalData.token = this.globalData.token || {}
  //   if (data.accessToken) {
  //     this.globalData.token.accessToken = data.accessToken
  //     token.accessToken = data.accessToken
  //   }
  //   if (data.expireInSeconds) {
  //     var now = util.getTimeStamp()
  //     var expireTime = now + data.expireInSeconds * 1000
  //     this.globalData.token.expireTime = expireTime
  //     token.expireTime = expireTime
  //   }
  //   wx.setStorageSync('token', token)
  // },

  // appGet: function (param) {
  //   param.enableToken = param.enableToken == undefined ? true : param.enableToken
  //   var header = {}
  //   if (param.enableToken && this.getToken()) {
  //     header.Authorization = 'Bearer ' + this.getToken()
  //   }
  //   if (param.header) {
  //     Object.assign(header, param.header)
  //   }
  //   let option = {
  //     url: param.url,
  //     data: param.data,
  //     success: param.success,
  //     fail: param.fail,
  //     complete: param.complete,
  //     showLoading: param.showLoading,
  //     header: header,
  //     method: 'GET'
  //   }
  //   util.request(option)

  // },

  // appPost: function (param) {
  //   param.enableToken = param.enableToken == undefined ? true : param.enableToken
  //   var header = {}
  //   if (param.enableToken && this.getToken()) {
  //     header.Authorization = 'Bearer ' + this.getToken()
  //   }
  //   if (param.header) {
  //     Object.assign(header, param.header)
  //   }
  //   let option = {
  //     url: param.url,
  //     data: param.data,
  //     success: param.success,
  //     fail: param.fail,
  //     complete: param.complete,
  //     showLoading: param.showLoading,
  //     header: header,
  //     method: 'POST'
  //   }
  //   util.request(option)
  // },

  // // 根据 loading 的叠加层数控制 loading
  // showLoading: function (title, mask) {
  //   this.globalData.isShowLoading++
  //   mask = mask == undefined ? true : mask
  //   title = title || ""
  //   wx.showLoading({
  //     title: title,
  //     mask: mask,
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },

  // hideLoading: function (title, mask) {
  //   this.globalData.isShowLoading--
  //   if (this.globalData.isShowLoading <= 0) {
  //     wx.hideLoading()
  //   }
  // }

})