const formatTime = (date, hasTime) => {
  hasTime = hasTime == undefined ? true : hasTime
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (hasTime) {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  } else {
    return [year, month, day].map(formatNumber).join('-')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



/**
 * request 基架
 */
function requestBase(option, isShowLoading) {
  option.data.ClientFrom = 1
  wx.request({
    url: option.url,
    data: option.data,
    header: option.header,
    method: option.method,
    dataType: 'json',

    success: function (res) {
      requestSuccess(res, option)
    },
    fail: requestFail,
    complete: function (res) {
      if (isShowLoading <= 0) {
        wx.hideLoading()
      }
      requestComplete(res)
    },
  })
}

/*******************************************
**功能：request get
**参数列表：
**url(请求地址) data(发送数据) success（成功回调）
**默认参数：请求方式（get）
******************************************/
function requestGet(param) {
  let option = {
    url: param.url,
    data: param.data,
    success: param.success,
    fail: param.fail,
    complete: param.complete,
    showLoading: param.showLoading,
    method: 'GET'
  }
  requestBase(option)
}

/*******************************************
**功能：request post
**参数列表：
**url(请求地址) data(发送数据) success（成功回调）
**默认参数：请求方式（post）
******************************************/
function requestPost(param) {
  let option = {
    url: param.url,
    data: param.data,
    success: param.success,
    fail: param.fail,
    complete: param.complete,
    showLoading: param.showLoading,
    method: 'POST'
  }
  requestBase(option)
}



/**
 * request执行成功
 */
function requestSuccess(res, option) {
  // showToast('成功')

  if (res.data.success) {
    let cb = option.success || serverSuccess
    cb(res)
  } else {
    let cb = option.fail || serverFail
    cb(res)
  }

  let cp = option.complete || serverComplete
  cp(res)

  // 服务器级别请求结果处理
  // if (res.data.success === true) {
  //   let cb = option.success || serverSuccess
  //   cb(res)
  // } else if (res.data.success === false) {	// 失败
  //   let cb = option.fail || serverFail
  //   cb(res)
  // } else {    //请求json时处理
  //   let cb = option.success
  //   cb(res)
  // }
}

/**
 * request执行失败
 */
function requestFail(res) {
  // showToast('网络错误，请重试')
}

/**
 * request执行完成
 */
function requestComplete() {
  // showToast('完成')
}




/**
 * 服务端执行成功
 */
function serverSuccess(res) {
  // showToast('成功')
}

/**
 * 服务端执行失败
 */
function serverFail(res) {

  // showToast('网络连接失败')
}

/**
 * 服务端执行完成
 */
function serverComplete() {
  // showToast('完成')
}



/**
 * 弹出提示框
 */
function showToast(title, mask) {
  mask = mask == undefined ? true : mask
  title = title || ""
  wx.showToast({
    title: title,
    icon: 'success',
    image: '',
    duration: 2000,
    mask: mask,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
}


function console(str) {
  log.info(str);
}

function getTimeStamp() {
  return new Date().getTime()
}


module.exports = {
  showToast: showToast,

  requestBase: requestBase,
  requestGet: requestGet,
  requestPost: requestPost,

  time: {
    getTimeStamp: getTimeStamp,
    formatTime: formatTime
  }
}
