// pages/profile/community/community.js

import util from "../../../utils/util.js"
import { url } from "../../../utils/config.js"
import { setInfo } from "../profile_set.js"

import { app, ask, load, cache, appdata, log } from "../../../utils/apps.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: [],
    defaultTitle: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tenant = cache.getTenant()
    if (tenant && tenant.title) {
      this.setData({ defaultTitle: tenant.title })
    }
    this.getCommunity()
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

  getCommunity: function () {
    var _this = this
    ask.get({
      url: url.getCommunity,
      data: { MaxResultCount: 999, SkipCount: 0 },
      showLoading: true,
      success: function (res) {
        var sommunitys = res.data.result.items
        var tenant = cache.getTenant()
        var index = 0
        if (tenant) {
          for (var i = 0; i < sommunitys.length; i++) {
            if (sommunitys[i].id == tenant.communityId) {
              index = i
              break
            }
          }
        }
        _this.setData({
          array: sommunitys,
          index: index
        })
      }
    })
  },


  bindPickerChange: function (e) {
    var _this = this

    this.setData({
      index: e.detail.value
    })


  },

  onSubmitBtn: function () {
    var _this = this
    var i = _this.data.index
    var tenancyId = _this.data.array[i].tenancyId
    var communityId = _this.data.array[i].id
    var title = _this.data.array[i].title
    _this.changeCommunity({
      tenantId: tenancyId,
      communityId: communityId,
      title: title,
    })
  },


  changeCommunity: function (input) {
    var _this = this
    var tenant = cache.getTenant()
    // 切换同物业小区
    if (tenant && input.tenantId == tenant.tenantId) {
      cache.setTenant(input)
      _this.setCommunity(input)
    } else {
      // 切换不同物业的小区

      // 先切换租户登录
      ask.post({
        url: url.userSign,
        data: {
          Code: appdata.userInfo.code,
        },
        success: function (res) {
          // 切换租户成功了再切换小区
          cache.setTenant(input)
          cache.setToken(res.data.result)

          _this.setCommunity(input)
        },

        header: { "Abp.TenantId": input.tenantId },
        showLoading: true,
        enableToken: false
      })
    }

  },

  setTenant: function (input) {

  },

  setCommunity: function (data) {
    setInfo({
      currentTenancyId: data.tenantId,
      currentCommunityId: data.communityId,
      currentCommunityName: data.title,
    }, function () {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    })
  }
})