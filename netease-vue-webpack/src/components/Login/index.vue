<template lang="">
  <div class='login-container'>
    <div class='login-infor-container'>请使用微信扫描二维码登录:{{ this.loginStatus }}</div>
    <div class="qrcode-container">
    
      <div id="qrCode" ref="qrCodeDiv" class='qrCode'></div>
    </div>
  
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import axios from 'axios'
export default {
  name: "Login",
  data () {
    return {
      loginStatus: '未登录'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getQRCode(this.generateQRCode())
      this.qrcodeScanStatus(this.loginKey)
    })
  },
  methods: {
    generateQRCode: function () {
      axios.get('http://127.0.0.1:3000/login/qr/key').then((res) => {
        if (res.data.code == 200) {
          let unikey = res.data.data.unikey
          this.loginKey = unikey
          return unikey
        } else {
          return ''
        }
      }
      )
    },

    getQRCode: function (unikey) {
      axios.get('http://127.0.0.1:3000/login/qr/create?key=' + unikey).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          let qrcodeImg = res.data.data.qrurl
          this.bindQRCode(qrcodeImg)
        }
      })
    },

    bindQRCode: function (qrcodeUrl) {
      new QRCode(this.$refs.qrCodeDiv, {
        text: qrcodeUrl,
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      })
    },

    qrcodeScanStatus (unikey) {
      axios.get('http://127.0.0.1:3000/login/qr/check?key=' + unikey).then((res) => {
        console.log(res.data.code)
        let code = res.data.code
        if (code == 800) {
          this.loginStatus = res.data.message
        } else if (code == 803) {
          this.$router.push({ path: '/home' })
        }
      })
    }
  }
}
</script>
<style >
.login-container {
  width: 100%;
  height: 100%;
  background-color: #111;
  position: relative;
}
.qrcode-container {
  background-color: #111;
  width: 100%;
  height: 100%;
  margin: 0 auto; /*水平居中*/
  position: relative;
}

.login-infor-container {
  color: white;
  font-size: 20px;
}

.qrCode {
  display: inline-block;
  margin: 0 auto; /*水平居中*/
  position: relative;
  top: 15%;
}
img {
  width: 200px;
  height: 200px;
  background-color: #fff;
  padding: 6px;
}
</style>