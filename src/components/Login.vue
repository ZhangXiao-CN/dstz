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
        <transition name="slide">
          <div class="username-box" v-if="regShow">
            <div class="form-tips" :class="{blueFont:colorStyle.blueStyle==='username'}">昵称</div>
            <el-input
              v-model="userLogin.username"
              class="login-input username"
              @focus="changeColor('username')"
              @blur="changeColor"
              @keyup.enter.native="loginOrReg"
            ></el-input>
            <div class="tips-text">中文字母组合,最少两位</div>
          </div>
        </transition>
        <div class="email-box">
          <div class="form-tips" :class="{blueFont:colorStyle.blueStyle==='email'}">登陆邮箱</div>
          <el-input
            v-model="userLogin.email"
            class="login-input email"
            @focus="changeColor('email')"
            @blur="changeColor"
            @keyup.enter.native="loginOrReg"
          ></el-input>
          <div class="tips-text" v-show="regShow">使用邮箱注册登录</div>
        </div>
        <div class="password-box">
          <div class="form-tips" :class="{blueFont:colorStyle.blueStyle==='password'}">密码</div>
          <el-input
            ref="passwordInput"
            :type="colorStyle.passwordShow"
            v-model="userLogin.password"
            class="login-input password"
            @focus="changeColor('password')"
            @blur="changeColor"
            @keyup.enter.native="loginOrReg"
          >
            <i
              slot="suffix"
              class="iconfont see"
              :class="colorStyle.iconEye"
              @click="changePasswordShow"
            ></i>
          </el-input>
          <div class="tips-text" v-show="regShow">密码最少三位</div>
        </div>
      </div>
      <div class="tool-wrap" v-if="!regShow">
        <div class="retrieve">
          <a href="javascript:;" class="reg-btn">忘记密码?</a>
        </div>
        <div class="reg">
          <a href="javascript:;" class="reg-btn" @click="renderReg(true)">立即注册</a>
        </div>
      </div>
      <div class="login-btn" v-if="!regShow">
        <el-button type="primary" @click="login" :loading="loading">{{loadingLoginText}}</el-button>
      </div>
      <div class="tool-wrap" v-if="regShow">
        <div class="retrieve">
          已有账号?
          <a href="javascript:;" class="reg-btn" @click="renderReg(false)">去登陆</a>
        </div>
      </div>
      <div class="login-btn" v-if="regShow">
        <el-button type="primary" @click="reg" :loading="loading">{{loadingRegText}}</el-button>
      </div>
      <div class="closebtn" @click="close">
        <i class="iconfont icon-close"></i>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  inject: ['reload'],
  name: 'Login',
  data () {
    return {
      userLogin: {
        email: '',
        password: '',
        username: ''
      },
      colorStyle: {
        blueStyle: '',
        iconEye: 'icon-close-eye',
        passwordShow: 'password'
      },
      loading: false,
      loadingLoginText: '快速登录',
      loadingRegText: '快速注册'
    }
  },
  methods: {
    changeColor (name) {
      if (!name) return false
      this.colorStyle.blueStyle = name
    },

    changePasswordShow () {
      this.colorStyle.passwordShow = this.colorStyle.passwordShow === 'password' ? 'text' : 'password'
      this.colorStyle.iconEye = this.colorStyle.iconEye === 'icon-close-eye' ? 'icon-browse' : 'icon-close-eye'
    },
    renderReg (bool) {
      this.loadingText = '快速注册'
      this.$store.commit('changeRegShow', bool)
    },
    close () {
      this.$store.commit('changeLoginBox', false)
    },
    async login (e) {
      this.loading = true
      this.loadingLoginText = '登陆中'
      // 设置了捕获错误的拦截器后,需使用 try catch 语句!
      try {
        const { data: res } = await this.axios.post('api/login', {
          email: this.userLogin.email,
          password: this.userLogin.password
        })
        this.$message.success('登陆成功')
        this.reload()
        this.$store.commit('changeuserInfo', res)
        this.$store.commit('changeIsLogin', true)
        this.$store.commit('changeLoginBox', false)
        this.loading = false
        this.loadingLoginText = '快速登录'
      } catch (err) {
        this.$message.error(err.message)
        this.loading = false
        this.loadingLoginText = '快速登录'
      }
    },
    async reg () {
      this.loadingRegText = '注册中'
      try {
        await this.axios.post('api/users', {
          nickName: this.userLogin.username,
          email: this.userLogin.email,
          password: this.userLogin.password,
          role: 'normal',
          status: 1
        })
        this.$store.commit('changeRegShow', false)
        this.$set(this.userLogin, 'username', '')
        this.$set(this.userLogin, 'email', '')
        this.$set(this.userLogin, 'password', '')
        this.$message.success('注册成功!请登陆!')
        this.loadingRegText = '快速注册'
      } catch (err) {
        this.$message.error(err.message)
        this.loadingRegText = '快速注册'
      }
    },
    loginOrReg () {
      if (this.regShow) {
        this.reg()
      } else {
        this.login()
      }
    }
  },
  computed: {
    ...mapState(['regShow', 'userInfo'])
  }
}
</script>

<style lang="less" scoped>
#login {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  z-index: 9999;
}

.loginbox {
  width: 300 / 40rem;
  // height: 370 / 40rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
  text-align: center;
}

.closebtn {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #bbb;
  cursor: pointer;
  i {
    font-size: 18 / 40rem;
    font-weight: 700;
  }
}

.closebtn:hover {
  color: #2c3e50;
}

.logo-con {
  position: relative;
  width: 100%;
  text-align: center;
  z-index: 2;
  .logobox {
    width: 100 / 40rem;
    height: 50 / 40rem;
    margin: 0 auto;
    .logoimg {
      width: 100%;
    }
  }
}

.title {
  position: relative;
  font-size: 14 / 40rem;
  color: #bbb;
  z-index: 2;
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
    font-size: 14 / 40rem;
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
    bottom: 15px;
  }

  .blueFont {
    color: #409eff;
  }
  .see {
    position: absolute;
    right: 0;
    top: 8px;
    font-size: 24 / 40rem;
    cursor: pointer;
  }
}

.username-box {
  z-index: 1;
}

.email,
.password,
.username {
  margin-bottom: 30px;
}

.tool-wrap {
  display: flex;
  justify-content: space-between;
  font-size: 14 / 40rem;
  a {
    color: #409eff;
  }
}

.login-btn {
  margin: 20 / 40rem 0 10 / 40rem 0;
}

.slide-enter-active {
  animation: slide-in 0.3s linear;
}
.slide-leave-active {
  animation: slide-in 0.3s linear reverse;
}
@keyframes slide-in {
  0% {
    top: -70px;
  }
  // 50% {
  //   top: 30px;
  // }
  100% {
    top: 0;
  }
}
</style>
