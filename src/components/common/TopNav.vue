<template>
  <div id="topnav">
    <div class="header-bottom-wrap">
      <nav class="category">
        <ul class="category-list">
          <li class="category-item">
            <a
              href="javascript:;"
              class="category-link"
              :class="{ currentIndex: currentIndex == 100 }"
              @click="goHome"
              >首页</a
            >
          </li>
          <li
            class="category-item"
            v-for="(item, index) in categoryNav"
            :key="item._id"
          >
            <a
              href="javascript:;"
              class="category-link"
              :class="{ currentIndex: currentIndex == index }"
              @click="
                getCategoryArticle({
                  index: index,
                  categoryID: item._id,
                  categoryTitle: item.title,
                  categoryChilren: '',
                  categoryChilrenTitle: ''
                })
              "
              >{{ item.title }}</a
            >
            <i class="iconfont icon-unfold" v-if="item.children.length > 0"></i>
            <ul v-if="item.children.length > 0">
              <li v-for="child in item.children" :key="child._id">
                <a
                  href="javascript:;"
                  @click="
                    getCategoryArticle({
                      index: index,
                      categoryID: '',
                      categoryTitle: '',
                      categoryChilren: child._id,
                      categoryChilrenTitle: child.childrenTitle
                    })
                  "
                  >{{ child.childrenTitle }}</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="right-btn">
        <button @click="goWrite">
          <i class="iconfont icon-mianxingyumaobi"></i>
          <span>写文章</span>
        </button>
      </div>
    </div>
    <div class="small-category-btn" @click="SidebarBarNavShow(true)">
      <button @click="goWrite">
        <i class="iconfont icon-mianxingyumaobi"></i>
      </button>
      <i class="iconfont icon-other"></i>
    </div>
    <transition name="slide">
      <div class="sidebar-bar-nav" v-show="sidebarBarNav">
        <div class="sidebar-bar-logo">
          <div>前端社</div>
        </div>
        <ul class="sidebar-bar-list">
          <li class="nav-item">
            <a href="javascript:;" class="category-link" @click="goHome"
              >首页</a
            >
          </li>
          <li
            class="category-item"
            v-for="(item, index) in categoryNav"
            :key="item._id"
          >
            <a
              href="javascript:;"
              class="category-link"
              :class="{ currentIndex: currentIndex == index }"
              @click="
                getCategoryArticle({
                  index: index,
                  categoryID: item._id,
                  categoryTitle: item.title,
                  categoryChilren: '',
                  categoryChilrenTitle: ''
                })
              "
              >{{ item.title }}</a
            >
            <i
              class="iconfont icon-unfold"
              v-if="item.children.length > 0"
              @click="openChildNav"
            ></i>
            <ul v-if="item.children.length > 0" style="display: none">
              <li v-for="child in item.children" :key="child._id">
                <a
                  href="javascript:;"
                  @click="
                    getCategoryArticle({
                      index: index,
                      categoryID: '',
                      categoryTitle: '',
                      categoryChilren: child._id,
                      categoryChilrenTitle: child.childrenTitle
                    })
                  "
                  >{{ child.childrenTitle }}</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </transition>
    <div
      class="sidebar-bar-mask"
      v-show="sidebarBarNav"
      @click.stop="SidebarBarNavShow(false)"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TopNav',
  data () {
    return {
      sidebarBarNav: false,
      currentIndex: 100
    }
  },
  methods: {
    goWrite () {
      this.$router.push({ name: 'write' })
    },
    openChildNav (e) {
      const ul = e.target.nextElementSibling
      const display = ul.style.display
      ul.style.display = display === 'none' ? 'block' : 'none'
    },
    SidebarBarNavShow (bool) {
      this.sidebarBarNav = bool
    },
    async getCategoryArticle (obj) {
      this.SidebarBarNavShow(false)
      this.currentIndex = obj.index
      const moveY = document.getElementById('silder').clientHeight
      window.scrollTo(0, moveY + 10)
      this.$store.commit('changeArticleListLoading', true)
      this.$store.commit('changeArticleLimit', 10)
      try {
        const { data: res } = await this.axios.get('api/posts/category?categoryID=' + obj.categoryID + '&categoryChilren=' + obj.categoryChilren + '&limit=' + this.articleLimit)
        if (obj.categoryChilrenTitle) {
          this.$store.commit('changeCurrentCategoryTitle', '<i class="iconfont icon-fenlei"></i>' + obj.categoryChilrenTitle)
        } else if (obj.categoryTitle) {
          this.$store.commit('changeCurrentCategoryTitle', '<i class="iconfont icon-fenlei"></i>' + obj.categoryTitle)
        }
        this.$store.commit('changeCurrentCategory', obj.categoryID)
        this.$store.commit('changeCurrentCategoryChilren', obj.categoryChilren)
        this.$store.commit('changeArticleList', res)
        this.$store.commit('changeIsSearch', false)
        this.$store.commit('changeBackShow', true)
        this.$store.commit('changeArticleMroe', true)
        this.$store.commit('changeArticleListLoading', false)
      } catch (err) {
        this.$store.commit('changeArticleListLoading', false)
      }
    },
    goHome () {
      if (this.$route.query.search) {
        this.$router.push({ path: '/', query: {} })
        // 故意让路由参数变化而不刷新页面,所以此处强制刷新一下
        this.$router.go(0)
      } else {
        this.$router.go(0)
      }
    }
  },
  computed: {
    ...mapState(['categoryNav', 'ArticleMroe', 'articleListLoading', 'articleLimit'])
  },
  created () {
    if (this.categoryNav.length > 0) {
      return
    }
    this.axios.get('api/categories')
      .then(res => { this.$store.commit('changeCategoryNav', res.data) })
      .catch((err) => {
        this.$message.error('获取分类列表失败')
        return err
      })
  }
}
</script>

<style lang="less" scoped>
#topnav {
  max-width: 1440px;
  margin: 0 auto;
}
.small-category-btn {
  display: none;
  button {
    padding: 2px 10px;
    margin-right: 10px;
    font-size: 12px;
    color: #409eff;
    cursor: pointer;
    // border: 1px solid #409eff;
    border-radius: 8px;
    i {
      font-size: 12px;
    }
  }
}
.header-bottom-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  .category {
    .category-list {
      display: flex;
      justify-content: flex-start;
      .category-item {
        height: 100%;
        position: relative;
        padding: 0 20px;
        .category-link {
          display: block;
          height: 100%;
          font-size: 14px;
          color: #304455;
          padding: 13px 0;
          border-bottom: 2px solid transparent;
        }
        .currentIndex {
          border-bottom-color: #409eff;
        }
        i {
          font-size: 10px;
          position: absolute;
          right: 6px;
          top: 17px;
          transition: all 0.1s;
        }
        ul {
          display: none;
          position: absolute;
          top: 47px;
          border-top: 1px solid #ccc;
          background-color: #fff;
          border-radius: 0 0 8px 8px;
          padding: 10px 0;
          z-index: 9;
          li {
            width: 200px;
            text-align: left;
            a {
              display: block;
              width: 100%;
              padding: 10px 0 10px 10px;
              font-size: 14px;
              color: #304455;
            }
          }
          li:hover {
            background-color: #f2f2f2;
          }
        }
      }
      .category-item:hover {
        border-bottom-color: #409eff;
      }
      .category-item:hover ul {
        display: block;
      }
      .category-item:hover i {
        transform: rotate(180deg);
      }
    }
  }
  .right-btn {
    button {
      padding: 2px 10px;
      margin-right: 5px;
      font-size: 12px;
      color: #409eff;
      cursor: pointer;
      border: 1px solid #409eff;
      border-radius: 8px;
      i {
        font-size: 12px;
      }
    }
  }
}

@media screen and (max-width: 1020px) {
}

@media screen and (max-width: 760px) {
  .header-bottom-wrap {
    display: none;
  }
  #topnav {
    position: absolute;
    bottom: 5px;
    right: 10px;
    // z-index: 999;
    i {
      font-size: 20px;
    }
    .icon-other {
      background-color: #f5f5f5;
      cursor: pointer;
    }
    .small-category-btn {
      display: block;
    }
    .sidebar-bar-nav {
      width: 90%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      text-align: left;
      background-color: #f5f5f5;
      padding: 5px 0 0 5px;
      z-index: 99;
      overflow: auto;
      .sidebar-bar-logo {
        font-size: 18px;
        font-weight: 700;
      }
      li {
        background-color: #fff;
        margin: 10px 5px 0 0;
        padding: 5px;
        border-radius: 5px;
        padding-left: 10px;
        a {
          display: block;
        }
      }
      .category-item {
        position: relative;
        .iconfont {
          position: absolute;
          right: 5px;
          top: 5px;
        }
        ul {
          border-top: 1px solid #ccc;
          margin-top: 3px;
          li {
            border-bottom: 1px dashed #ccc;
          }
        }
      }
    }
    .sidebar-bar-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 9;
    }
  }
}

@media screen and (max-width: 505px) {
}

.slide-enter-active {
  animation: slide-in 0.2s;
}
.slide-leave-active {
  animation: slide-in 0.2s reverse;
}
@keyframes slide-in {
  0% {
    left: -100%;
    opacity: 0;
  }
  10% {
    left: -90%;
    opacity: 0.1;
  }
  20% {
    left: -80%;
    opacity: 0.2;
  }
  30% {
    left: -70%;
    opacity: 0.3;
  }
  40% {
    left: -60%;
    opacity: 0.4;
  }
  50% {
    left: -50%;
    opacity: 0.5;
  }
  60% {
    left: -40%;
    opacity: 0.6;
  }
  70% {
    left: -30%;
    opacity: 0.7;
  }
  80% {
    left: -20%;
    opacity: 0.8;
  }
  90% {
    left: -10%;
    opacity: 0.9;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
</style>
