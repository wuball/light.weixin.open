import { url } from "../../utils/config.js"

import { app, ask, load, cache, appdata, log } from "../../utils/apps.js"

function setInfo(data, callback) {
  var keyCount = Object.keys(data).length
  ask.post({
    url: url.setInfo,
    data: data,
    showLoading: true,
    success: function (res) {
      if (res.data.result >= keyCount) {
        setTimeout(function () {
          wx.showToast({
            title: '设置成功',
          })
        }, 600)
      } else if (res.data.result > 0) {
        setTimeout(function () {
          wx.showToast({
            title: '部分设置成功',
          })
        }, 600)
      } else {
        setTimeout(function () {
          wx.showToast({
            title: '设置失败',
          })
        }, 600)
      }

      cache.setUserInfo(data)
      appdata.reloadCount++
      if (callback) {
        callback()
      } else {
        wx.navigateBack()
      }
    }
  })
}



module.exports = {
  setInfo: setInfo,
}