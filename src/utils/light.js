import util from "util.js"
import { url } from "config.js"

function serverLogin(userdata, callback) {
  util.requestPost({
    url: url.accountSign,
    data: userdata,
    success: function (res) {
      callback(res)
    },
    showLoading: true
  });
}




module.exports = {
  serverLogin: serverLogin,
}
