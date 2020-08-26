<template>
  <div id="login">
    <el-card shadow="always" class="loginbox" id="loginbox">
      <div class="logo-con">
        <div class="logobox">
          <img src="../assets/images/logo.png" class="logoimg" />
        </div>
      </div>
      <div class="title">登陆</div>
      <div class="form-box">
        <div class="username-box" id="usernamebox">
          <div :class="'form-tips ' + colorStyle.blueUsername">昵称</div>
          <el-input
            v-model="userLogin.username"
            class="login-input username"
            @focus="changeColorUsername"
            @blur="changeColorUsername"
          ></el-input>
          <div class="tips-text">中文字母组合,最少两位</div>
        </div>
        <div class="email-box">
          <div :class="'form-tips ' + colorStyle.blueEmail">登陆邮箱</div>
          <el-input
            v-model="userLogin.email"
            class="login-input email"
            @focus="changeColorEmail"
            @blur="changeColorEmail"
          ></el-input>
          <div class="tips-text" v-show="colorStyle.regShow">使用邮箱注册登录</div>
        </div>
        <div class="password-box">
          <div :class="'form-tips ' + colorStyle.bluePassword">密码</div>
          <el-input
            ref="passwordInput"
            :type="colorStyle.passwordShow"
            v-model="userLogin.password"
            class="login-input password"
            @focus="changeColorPassword"
            @blur="changeColorPassword"
          >
            <i
              slot="suffix"
              class="iconfont see"
              :class="[colorStyle.blueEye, colorStyle.iconEye]"
              @click="changePasswordShow"
            ></i>
          </el-input>
          <div class="tips-text" v-show="colorStyle.regShow">密码最少三位</div>
        </div>
      </div>
      <div class="tool-wrap" v-if="!colorStyle.regShow">
        <div class="retrieve">
          <a href="javascript:;" class="reg-btn">忘记密码</a>
        </div>
        <div class="reg">
          <a href="javascript:;" class="reg-btn" @click="renderReg">立即注册</a>
        </div>
      </div>
      <div class="login-btn" v-if="!colorStyle.regShow">
        <el-button type="primary">快速登录</el-button>
      </div>
      <div class="tool-wrap" v-if="colorStyle.regShow">
        <div class="retrieve">
          已有账号?
          <a href="javascript:;" class="reg-btn" @click="renderReg">去登录</a>
        </div>
      </div>
      <div class="login-btn" v-if="colorStyle.regShow">
        <el-button type="primary">立即注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Login',
  data () {
    return {
      userLogin: {
        email: '',
        password: '',
        username: ''
      },
      colorStyle: {
        blueUsername: '',
        blueEmail: '',
        bluePassword: '',
        blueEye: '',
        iconEye: 'icon-close-eye',
        passwordShow: 'password',
        regShow: false
      }
    }
  },
  methods: {
    changeColorUsername () {
      this.colorStyle.blueUsername = this.colorStyle.blueUsername ? '' : 'blueFont'
    },
    changeColorEmail () {
      this.colorStyle.blueEmail = this.colorStyle.blueEmail ? '' : 'blueFont'
    },
    changeColorPassword () {
      this.colorStyle.bluePassword = this.colorStyle.bluePassword ? '' : 'blueFont'
      this.colorStyle.blueEye = this.colorStyle.blueEye ? '' : 'blueFont'
    },
    changePasswordShow () {
      this.colorStyle.passwordShow = this.colorStyle.passwordShow === 'password' ? 'text' : 'password'
      this.colorStyle.iconEye = this.colorStyle.iconEye === 'icon-close-eye' ? 'icon-browse' : 'icon-close-eye'
    },
    renderReg () {
      // this.colorStyle.regShow = !this.colorStyle.regShow
      // const height = $('#loginbox')[0].offsetHeight
      // $('#loginbox').animate({ height: height + 45 + 'px' }, 'fast', 'linear')
      this.colorStyle.regShow = !this.colorStyle.regShow
      $('#usernamebox').slideToggle('fast')
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  position: relative;
}

.loginbox {
  // width: 300px;
  // height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  transition: all 0.5s;
}

.logo-con {
  width: 100%;
  text-align: center;
  .logobox {
    width: 100px;
    height: 50px;
    margin: 0 auto;
    .logoimg {
      width: 100%;
    }
  }
}

.title {
  font-size: 14px;
  color: #bbb;
}

.form-box {
  margin: 30px 0 0 0;
  .email-box,
  .password-box,
  .username-box {
    position: relative;
  }
  .form-tips {
    position: absolute;
    z-index: 9;
    font-size: 14px;
    color: #bbb;
    left: 15px;
    top: -8px;
    padding: 0 5px;
    background-color: #fff;
    transition: all 0.5s;
  }
  .tips-text {
    font-size: 12px;
    position: absolute;
    color: #bbb;
    right: 12px;
    bottom: 0;
  }
  .username-box {
    display: none;
  }

  // .addtransition {
  //   transition: all 0.5s;
  // }

  // .close-login {
  //   height: 0;
  // }

  .blueFont {
    color: #409eff;
  }
  .see {
    position: absolute;
    right: 0;
    top: 8px;
    font-size: 24px;
    cursor: pointer;
  }
}

.email,
.password,
.username {
  margin-bottom: 30px;
}

.tool-wrap {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  a {
    color: #409eff;
  }
}

.login-btn {
  margin: 20px 0 10px 0;
}

// .regfade-enter {
//   opacity: 1;
// }
// .regfade-enter {
//   opacity: 1;
// }

// .regfade-enter-active,
// .regfade-leave-active {
//   transition: all 0.5s;
// }

// .regfade-leave-to {
//   opacity: 1;
// }
</style>
