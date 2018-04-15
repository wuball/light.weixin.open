import util from "../../../utils/util.js"
// import { app, ask, load, cache, appdata, log } from "../../../utils/apps.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 0, title: "电话", content: "028-8888888" },
      { id: 1, title: "邮箱", content: "bw@github.com" },
      { id: 2, title: "官网", content: "www.github.com" },
      { id: 3, title: "技术支持", content: "www.github.com" },
    ]

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
  onbindtap: function (e) {
    let _this = this
    let id = e.currentTarget.dataset.id
    switch (id) {
      case 0:
        wx.makePhoneCall({
          phoneNumber: _this.data.items[id].content //仅为示例，并非真实的电话号码
        })
        break
      // case 1: break
      // case 2:
      //   break
    }
  },

  onbindlongpress: function (e) {
    let _this = this
    let id = e.currentTarget.dataset.id
    wx.setClipboardData({
      data: _this.data.items[id].content,
      success: function (res) {
        util.showToast("复制成功")
      },
      fail: function (res) { },
      complete: function (res) { },
    });
  }
})