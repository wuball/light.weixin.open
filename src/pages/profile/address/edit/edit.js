// pages/profile/address/edit/edit.js
import { url } from "../../../../utils/config.js"
import { setInfo } from "../../profile_set.js"

import { app, ask, load, cache, appdata, log } from "../../../../utils/apps.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    nickname: "",
    phoneNumber: "",
    houseNumber: "",
    isDefault: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.getAddress(options.id)
    }
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

  getAddress: function (id) {
    var _this = this

    var addresss = appdata.addresss
    var data = {}

    for (var i = 0; i < addresss.length; i++) {
      if (addresss[i].id == id) {
        data = addresss[i]
        break
      }
    }

    _this.setData({
      id: data.id,
      nickname: data.nickname,
      phoneNumber: data.phoneNumber,
      houseNumber: data.houseNumber,
      isDefault: data.isDefault,
    })

    // ask.get({
    //   url: url.address.get,
    //   data: { id: id },
    //   showLoading: true,
    //   success: function (res) {
    //     var data = res.data.result
    //     _this.setData({
    //       id: data.id,
    //       nickname: data.nickname,
    //       phoneNumber: data.phoneNumber,
    //       houseNumber: data.houseNumber,
    //       isDefault: data.isDefault,
    //     })
    //   }
    // })
  },

  onFormSubmit: function (e) {
    load.show()
    var nickname = e.detail.value.nickname
    var phoneNumber = e.detail.value.phoneNumber
    var houseNumber = e.detail.value.houseNumber
    var isDefault = e.detail.value.isDefault
    // var title = e.detail.value.title
    var postdata = e.detail.value
    postdata.communityId = cache.getTenant().communityId
    var posturl = url.address.create
    if (this.data.id) {
      posturl = url.address.update
      postdata.id = this.data.id
    }
    ask.post({
      url: posturl,
      data: postdata,
      showLoading: true,
      success: function () {
        appdata.reloadCount++
        if (postdata.isDefault) {
          setInfo({
            address: postdata.houseNumber
          })
        } else {
          wx.navigateBack()
        }
      }
    })




  }
})