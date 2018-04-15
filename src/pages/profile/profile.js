// pages/profile/profile.js
import { app, ask, load, cache, appdata, log } from "../../utils/apps.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: null
    },
    items: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    if (cache.getUserInfo()) {
      this.setItem()
    } else {
      setTimeout(function () {
        _this.onLoad()
      }, 1000)
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


  setItem: function () {
    var tenant = cache.getTenant()
    var userInfo = cache.getUserInfo()
    log.info(userInfo)

    var items = [
      { id: 0, action: "phonenumber/phonenumber", icon: "/images/profile/shouji.png", title: "手机", content: userInfo.phoneNumber },
      { id: 1, action: "birthday/birthday", icon: "/images/profile/shengri.png", title: "生日", content: userInfo.birthday },
      { id: 2, action: "community/community", icon: "/images/profile/shequ.png", title: "当前社区", content: tenant ? tenant.title : "请选择所在小区" },
      { id: 3, action: "address/address", icon: "/images/profile/dizhi.png", title: "默认门牌号", content: userInfo.address },
      { id: 4, action: "vip/vip", icon: "/images/profile/v1.png", title: "会员", content: userInfo.vip },
      { id: 5, action: "about/about", icon: "/images/profile/guanyu.png", title: "关于", content: "" },
      { id: 6, action: "feedback/feedback", icon: "/images/profile/jianyi.png", title: "建议/反馈", content: "" },
    ]
    this.setData({
      userInfo: userInfo,
      items: items
    })
  },


  setValue: function (e) {

  },

  setDate: function (e) {

  }
})