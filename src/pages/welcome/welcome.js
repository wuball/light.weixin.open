// pages/welcome/welcome.js

import util from "../../utils/util.js"
import light from "../../utils/light.js"
import { url } from "../../utils/config.js"
import { app, ask, load, cache, appdata, log } from "../../utils/apps.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    load.show("初始化中")
    this.login()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



  login: function () {
    var _this = this
    // 登陆获取code
    wx.login({
      success: function (res) {
        var userdata = {}
        userdata.code = res.code

        // 获取用户信息
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: function (res) {
            Object.assign(userdata, res);
            log.info("success")
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          },
          fail: function (res) {
            log.info("fail")
            // _this.serverLogin(userdata)
          },
          complete: function (res) {
            // 不管用户是否授权用户资料都执行登录
            log.info("complete")
            _this.serverLogin(userdata)
          },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  serverLogin: function (userdata) {
    var _this = this
    ask.post({
      url: url.accountSign,
      data: userdata,
      success: function (res) {
        cache.setUserInfo(res.data.result)
        if (res.data.result.currentCommunityId) {
          cache.setTenant({
            communityId: res.data.result.currentCommunityId,
            title: res.data.result.currentCommunityName
          })
        }
        _this.setAccessToken(res.data.result.currentTenancyId, _this.getCategorys)
      },
    });
  },

  setAccessToken: function (tenantId, callback) {
    var _this = this
    var tenant = cache.getTenant()
    if (!tenantId && !(tenant && tenant.tenantId)) {
      wx.redirectTo({
        url: '/pages/profile/community/community'
      })
      return
    }

    var isReToken = false

    if (tenant) {// 本地有缓存的情况
      if (tenant.tenantId == tenantId) {// 判断缓存与用户信息是否一致
        if (cache.getToken()) {// 一致则验证 token 是否过期
          // 没过期则不处理
        } else {
          // 过期则重新获取
          isReToken = true
        }
      } else {
        // 不一致则使用用户信息重新获取 token
        isReToken = true
        tenant.tenantId = tenantId
        cache.setTenant(tenant)
      }
    } else {// 本地无缓存的情况
      //根据用户信息获取 token
      isReToken = true
      tenant.tenantId = tenantId
      cache.setTenant(tenant)
    }

    if (isReToken) {
      log.info("isReToken", isReToken)
      _this.refreshToken(callback)
    } else {
      log.info("isReToken", isReToken)
      if (callback) {
        callback()
      } else {
        load.hide()
      }
    }

  },

  refreshToken: function (callback) {
    var _this = this
    var tenant = cache.getTenant()
    ask.post({
      url: url.userSign,
      data: {
        Code: appdata.userInfo.code,
      },
      success: function (res) {
        appdata.refreshToken = false
        cache.setToken(res.data.result)
        if (callback) {
          callback()
        }
      },
      header: { "Abp.TenantId": tenant.tenantId },
      enableToken: false
    })
  },

  getCategorys: function () {
    var _this = this
    ask.get({
      url: url.category.getall,
      data: {
        communityId: cache.getTenant().communityId,
        maxResultCount: 999,
        skipCount: 0
      },
      success: function (res) {
        appdata.categorys = res.data.result.items
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  }
})