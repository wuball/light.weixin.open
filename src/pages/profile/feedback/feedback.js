// pages/profile/feedback/feedback.js
import { url } from "../../../utils/config.js"
import { app, ask, load, cache, appdata, log } from "../../../utils/apps.js"
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


  onFormSubmit: function (e) {
    load.show()
    ask.post({
      url: url.feedback.create,
      data: {
        title: e.detail.value.title,
        content: e.detail.value.content,
        communityId: cache.getTenant().communityId
      },
      showLoading: true,
      success: function () {
        setTimeout(function () {
          wx.showToast({
            title: '感谢您的反馈！',
          })
        }, 300)
        wx.navigateBack()
      }
    })
  }
})