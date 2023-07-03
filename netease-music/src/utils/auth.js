/*
 * @Author: Aruver
 * @Date: 2022-06-24 10:37:51
 * @LastEditors: Aruver
 * @qq: 37919926
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setCookie (key, data) {
  Cookies.set(key, data)
}

export function getCookie (key) {
  let data = Cookies.get(key)
  if (data === 'undefined' || data === undefined) {
    data = '{}'
  }
  return JSON.parse(data)
}

export function setLocalStorage (storageName, storageValue) {
  storageValue = typeof storageValue === 'object' ? JSON.stringify(storageValue) : storageValue
  localStorage.setItem(storageName, storageValue)
}

export function getLocalStorage (storageName) {
  let paramValue = null
  try {
    paramValue = JSON.parse(localStorage.getItem(storageName))
  } catch {
    paramValue = localStorage.getItem(storageName)
  }
  return paramValue
}

export function removeLocalStorage (storageName) {
  localStorage.removeItem(storageName)
}
