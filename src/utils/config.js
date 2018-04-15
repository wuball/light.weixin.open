// 测试环境
const host = "http://localhost:2244"
// api
const hostApi = `${host}/api`
const hostAppApi = `${host}/api/services/app`
const url = {
  // 请求域
  host: host,
  // api
  hostApi: hostApi,
  hostAppApi: hostAppApi,
  // 登錄
  accountSign: `${hostAppApi}/account/WeixinSignInApp`,
  // setTenant
  userSign: `${hostApi}/TokenAuth/SimpleAuthenticate`,
  // 选择小区
  getCommunity: `${hostAppApi}/HostCommunity/GetAll`,
  // 设置用户信息
  setInfo: `${hostAppApi}/account/setInfo`,

  // 地址url
  address: {
    // 获取地址列表
    getall: `${hostAppApi}/address/getall`,
    // 获取地址详情
    "get": `${hostAppApi}/address/get`,
    // 添加地址
    create: `${hostAppApi}/address/create`,
    // 修改地址/设置默认地址
    update: `${hostAppApi}/address/update`,
  },

  feedback: {
    create: `${hostAppApi}/feedback/create`
  },

  // 模块
  category: {
    getall: `${hostAppApi}/category/getAll`,
  },

  // 商品模块
  commodity: {
    getall: `${hostAppApi}/commodity/getAll`,
    "get": `${hostAppApi}/commodity/get`,
  }
}
module.exports = {
  url: url
}
