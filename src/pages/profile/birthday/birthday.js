// pages/profile/birthday/birthday.js
import { time } from "../../../utils/util.js"
import { setInfo } from "../profile_set.js"
import { app, ask, load, cache, appdata, log } from "../../../utils/apps.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '2016-09-01',
    date_start: '1900-1-1',
    date_end: time.formatTime(new Date(), false),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = cache.getUserInfo()
    if (userinfo && userinfo.birthday) {
      this.setData({
        birthday: userinfo.birthday
      })
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
    if (appdata.reloadCount > 0) {
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

  bindDateChange: function (e) {
    log.info('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },

  onFormSubmit: function (e) {
    var birthday = e.detail.value.birthday
    setInfo({
      birthday: birthday
    })
  }
})