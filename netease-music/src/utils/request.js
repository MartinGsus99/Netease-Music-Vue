import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: "127.0.0.1:3000", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
    // "Access-Control-Allow-Origin": process.env.VUE_APP_BASE_API,
  }
})


export default service
