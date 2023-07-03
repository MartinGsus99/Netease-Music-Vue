//对于axios进行二次封装
import axios from "axios"
//底下的代码也是创建axios实例
let requests = axios.create({
  //基础路径
  baseURL: "/",
  //请求不能超过5S
  timeout: 5000,
})

//请求拦截器（可以在请求发出去之前，做一些事情）
requests.interceptors.request.use((config) => {
  return config
})

//响应拦截器（在数据返回之后，做一些事情）
requests.interceptors.response.use(
  (res) => {
    //相应成功
    return res.data
  },
  (err) => {
    //响应失败
    alert("服务器响应数据失败")
  }
)
export default requests