<template>
  <div id="header">
    <div class="header-wrap">
      <div class="header-top-wrap">
        <div class="top-left">
          <div class="logo">
            <router-link to="/" @click.native="reloadSelf">
              <img class="logon-img" src="../../assets/images/logo.png" />
            </router-link>
          </div>
          <div class="samll-logo">
            <router-link to="/" @click.native="reloadSelf">前端社</router-link>
          </div>
          <div class="header-link">
            <div>
              <a href="javascript:;">前端交流群</a>
            </div>
            <div>
              <a href="javascript:;">文章发布教程</a>
            </div>
            <div>
              <a href="javascript:;">成为管理员</a>
            </div>
          </div>
        </div>
        <div class="top-right">
          <el-input
            placeholder="搜索"
            v-model="searchText"
            class="search"
            size="mini"
          >
            <i slot="prefix" class="iconfont icon-search"></i>
          </el-input>
          <div class="login-btn-wrap" v-if="!isLogin">
            <button class="login-btn" @click="popUpLoginBox(false)">
              登陆
            </button>
            <button class="reg-btn" @click="popUpLoginBox(true)">
              快速注册
            </button>
          </div>
          <div
            class="samll-login-btn"
            @click="popUpLoginBox(false)"
            v-if="!isLogin"
          >
            <i class="iconfont icon-user"></i>
          </div>
          <div class="user-btn" v-if="isLogin">
            <button class="add-btn" @click="goWrite">
              <i class="iconfont icon-addition"></i>
            </button>
            <button class="news-btn">
              <i class="iconfont icon-remind"></i>
            </button>
          </div>
          <div class="user-info" @click="popUpuserToolBox" v-if="isLogin">
            <el-avatar
              :src="
                userInfo.avatar
                  ? userInfo.avatar
                  : 'http://localhost:3000/assets/img/defaultAvatar.png'
              "
              :key="userInfo.avatar"
              size="small"
              class="user-avatar"
            ></el-avatar>
            <transition name="slide">
              <div class="user-tools" v-if="userToolBox">
                <ul>
                  <li>
                    <router-link
                      :to="{ name: 'user', params: { id: userInfo._id } }"
                      class="personal-center"
                    >
                      <div>
                        <el-avatar
                          :src="
                            userInfo.avatar
                              ? userInfo.avatar
                              : 'http://localhost:3000/assets/img/defaultAvatar.png'
                          "
                          :key="userInfo.avatar"
                          size="medium"
                        ></el-avatar>
                      </div>
                      <p>
                        <span>{{ userInfo.nickName }}</span>
                        <span class="explain">个人中心</span>
                      </p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="write">
                      <div>
                        <i class="iconfont icon-mianxingyumaobi"></i>
                      </div>
                      <p>
                        <span>创作文章</span>
                        <span class="explain">分享你的快乐</span>
                      </p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="news">
                      <div>
                        <i class="iconfont icon-remind"></i>
                      </div>
                      <p>
                        <span>系统通知</span>
                        <span class="explain">不定期安排精彩活动哟</span>
                      </p>
                    </router-link>
                  </li>
                  <li>
                    <a href="javasctipt:;" @click="logout">
                      <div>
                        <i class="iconfont icon-084tuichu"></i>
                      </div>
                      <p>退出</p>
                    </a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="samll-header-link">
        <div>
          <a href="javascript:;">前端交流群</a>
        </div>
        <div>
          <a href="javascript:;">文章发布教程</a>
        </div>
        <div>
          <a href="javascript:;">成为管理员</a>
        </div>
      </div>
    </div>
    <div class="split-line"></div>
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  inject: ['reload'],
  name: 'Header',
  data () {
    return {
      searchText: '',
      userToolBox: false,
      dropDow: ''
    }
  },
  methods: {
    reloadSelf () {
      this.$router.go(0)
    },
    popUpLoginBox (bool) {
      this.$store.commit('changeRegShow', bool)
      this.$store.commit('changeLoginBox', true)
    },
    popUpuserToolBox () {
      this.userToolBox = !this.userToolBox
    },
    async logout () {
      try {
        await this.axios.post('api/logout')
        // this.$store.commit('changeIsLogin', false)
        // this.$store.commit('changeuserInfo', {})
        // this.$message.success('退出成功')
        this.$router.go(0)
      } catch (err) {
        this.$message.error('退出失败')
      }
    },
    goWrite () {
      this.$router.push({ name: 'write' })
    }
  },
  computed: {
    ...mapState(['isLogin', 'userInfo'])
  },
  async created () {
    try {
      const { data: res } = await this.axios.get('api/login/status')
      if (res.isLogin) {
        this.$store.commit('changeIsLogin', true)
        this.$store.commit('changeuserInfo', res.userInfo)
      } else {
        if (this.$route.name === 'write') {
          this.$store.commit('changeLoginBox', true)
        }
      }
    } catch (err) {
      this.$message.error(err.message)
    }
  }
}
</script>>

<style lang="less" scoped>
#header {
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 5px 40px 0px rgba(17, 58, 93, 0.1);
  position: sticky;
  top: 0;
  z-index: 999;
}

.header-wrap {
  max-width: 1440px;
  margin: 0 auto;
}

.header-top-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  .top-left {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    .logo {
      margin-right: 20px;
      a {
        display: block;
      }
      .logon-img {
        display: block;
        height: 58px;
        padding-top: 10px;
        padding-left: 10px;
      }
    }
    .header-link {
      white-space: nowrap;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
        padding: 0 20 / 40rem;
        a {
          color: #304455;
        }
      }
    }
  }
  .top-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 28px;
    .search {
      margin-right: 20px;
      .icon-search {
        position: absolute;
        top: 5px;
      }
      .icon-search:active {
        top: 6px;
        cursor: pointer;
      }
    }
    .login-btn-wrap {
      display: flex;
      justify-content: space-around;
      white-space: nowrap;
      button {
        font-size: 14 / 40rem;
        padding: 4 / 40rem 10 / 40rem;
        margin-right: 10 / 40rem;
        border-radius: 8px;
        cursor: pointer;
      }
      .login-btn {
        border: 1px solid #409eff;
        color: #409eff;
      }
      .reg-btn {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}

.user-btn {
  white-space: nowrap;
  .iconfont {
    font-size: 22px;
    cursor: pointer;
  }
}

.user-info {
  position: relative;
  margin: 0 10px 0 5px;
  white-space: nowrap;
  cursor: pointer;
  .user-tools {
    position: absolute;
    top: 45px;
    right: -10px;
    border: 1px solid #ebeef5;
    border-bottom: none;
    background-color: #fff;
    border-radius: 8px;
    z-index: 99;
    li {
      padding: 10px;
      border-bottom: 1px solid #ebeef5;
      text-align: left;
      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #304455;
        div {
          i {
            color: #409eff;
            font-size: 20px;
            margin: 0 6px 0 8px;
          }
        }
        p {
          width: 200px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          margin-left: 5px;
          .explain {
            font-size: 12px;
            color: #bbb;
          }
        }
      }
    }
    li:hover {
      background-color: #f3f3f3;
    }
  }
}

.samll-header-link {
  display: none;
  justify-content: flex-start;
  font-size: 14px;
  padding: 5px 0 5px 15px;
  font-weight: 700;
  div {
    margin-right: 10px;
  }
}

.samll-logo {
  display: none;
  padding-left: 15px;
  font-weight: 900;
  font-size: 18px;
}

.samll-login-btn {
  display: none;
  margin-right: 10px;
  i {
    font-size: 20px;
    cursor: pointer;
  }
}

.slide-enter-active {
  animation: slide-in 0.4s linear;
}
.slide-leave-active {
  animation: slide-in 0.4s linear reverse;
}
@keyframes slide-in {
  0% {
    top: -180px;
  }
  25% {
    top: -120px;
  }
  50% {
    top: 50px;
  }
  75% {
    top: 0px;
  }
  100% {
    top: 45px;
  }
}
.split-line {
  border-top: 1px solid #f5f5f5;
}
@media screen and (max-width: 1020px) {
}

@media screen and (max-width: 760px) {
  .header-link div {
    display: none;
  }
  .samll-header-link {
    display: flex;
  }
  .logo {
    display: none;
  }
  .samll-logo {
    display: block;
  }
}

@media screen and (max-width: 505px) {
  .login-btn-wrap {
    display: none !important;
  }
  .samll-login-btn {
    display: block;
  }
  .header-top-wrap {
    height: 42px;
  }
  .search {
    border-radius: 10px !important;
    overflow: hidden;
    .icon-search {
      top: 2px !important;
    }
  }
}
</style>
