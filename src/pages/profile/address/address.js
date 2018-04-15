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
    items: appdata.addresss || []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (appdata.addresss) {
      this.setData({
        items: appdata.addresss
      });
    }
    this.addressGetAll()

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
    if (appdata.reloadCount) {
      appdata.reloadCount--
      this.onLoad()
    }
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

  addressGetAll: function () {
    var _this = this
    var tenant = cache.getTenant()
    ask.get({
      url: url.address.getall,
      data: {
        communityId: tenant.communityId,
        maxResultCount: 8,
        skipCount: _this.data.index * 8
      },
      showLoading: true,
      success: function (res) {
        appdata.addresss = res.data.result.items
        _this.setData({
          items: res.data.result.items
        })
      }
    })
  },

  showmenu: function (e) {
    let _this = this
    let id = e.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['编辑', '删除', '复制'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0: log.info("编辑");
            wx.navigateTo({
              url: '/pages/profile/address/edit/edit?id=' + id,
            });
            break
          case 1: log.info("删除"); break
          case 2: log.info("复制");
            wx.setClipboardData({
              data: _this.data.items[id].title + "\n" + _this.data.items[id].content,
              success: function (res) {
                util.showToast("复制成功")
              },
              fail: function (res) { },
              complete: function (res) { },
            });
            break
        }
      },
      fail: function (res) {
        log.info(res.errMsg)
      }
    })
  },

  edit: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/profile/address/edit/edit?id=' + id,
    })
  }
})