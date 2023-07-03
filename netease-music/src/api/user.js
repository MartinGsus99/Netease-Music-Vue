import requests from "./api"  //引入二次封装的axios
export const getUserFollows = (params) => requests({ url: '/user/follows ', method: 'get', data: params })