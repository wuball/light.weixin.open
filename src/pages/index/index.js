//index.js
import { url } from "../../utils/config.js"
import { app, ask, load, cache, appdata, log } from "../../utils/apps.js"


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    hostApi: "",
    roleId: 0,
    imgUrls: [
      {
        icon:
        "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        title: "12312"
      },
      {
        icon:
        "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
        title: "2313"
      },
      {
        icon:
        "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
        title: "213213"
      }
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 800,
    moduleOption: appdata.categorys
  },
  onLoad: function () {
    var tenant = cache.getTenant()
    if (tenant && tenant.title) {
      setTimeout(function () {
        wx.showToast({
          title: tenant.title,
        })
      }, 600)
    }
  },
  getUserInfo: function (e) {
    log.info(e)
    appdata.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },


})
