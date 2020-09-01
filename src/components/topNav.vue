<template>
  <div id="topnav">
    <div class="header-bottom-wrap">
      <nav class="category">
        <ul class="category-list">
          <li class="category-item">
            <router-link to="/" class="category-link">首页</router-link>
          </li>
          <li class="category-item">
            <router-link to="category" class="category-link">前端</router-link>
            <i class="iconfont icon-unfold"></i>
            <ul>
              <li>
                <router-link to="category">javaScritp</router-link>
              </li>
              <li>
                <router-link to="category">jQuery</router-link>
              </li>
              <li>
                <router-link to="category">React</router-link>
              </li>
              <li>
                <router-link to="category">Vue</router-link>
              </li>
              <li>
                <router-link to="category">Angular</router-link>
              </li>
            </ul>
          </li>
          <li class="category-item">
            <router-link to="category" class="category-link">后端</router-link>
            <i class="iconfont icon-unfold"></i>
            <ul>
              <li>
                <router-link to="category">Flask</router-link>
              </li>
              <li>
                <router-link to="category">Django</router-link>
              </li>
              <li>
                <router-link to="category">Express</router-link>
              </li>
            </ul>
          </li>
          <li class="category-item">
            <router-link to="category" class="category-link">其他技术</router-link>
          </li>
          <li class="category-item">
            <router-link to="category" class="category-link">游戏圈</router-link>
            <i class="iconfont icon-unfold"></i>
            <ul>
              <li>
                <router-link to="category">欧陆风云4</router-link>
              </li>
              <li>
                <router-link to="category">钢铁雄心4</router-link>
              </li>
              <li>
                <router-link to="category">王国风云2</router-link>
              </li>
              <li>
                <router-link to="category">Stellaris(群星)</router-link>
              </li>
              <li>
                <router-link to="category">文明5</router-link>
              </li>
              <li>
                <router-link to="category">文明6</router-link>
              </li>
            </ul>
          </li>
          <li class="category-item">
            <router-link to="category" class="category-link">闲聊</router-link>
          </li>
        </ul>
      </nav>
      <div class="right-btn">
        <button @click="toWrite">
          <i class="iconfont icon-mianxingyumaobi"></i>
          <span>写文章</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  methods: {
    toWrite () {
      if (!this.$store.state.isLogin) {
        this.$store.commit('changeRegShow', false)
        this.$store.commit('changeLoginBox', true)
      } else {
        this.$router.push({ name: 'write' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-bottom-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f5f5f5;
  background-color: #fff;
  .category {
    .category-list {
      display: flex;
      justify-content: flex-start;
      .category-item {
        position: relative;
        .category-link {
          display: inline-block;
          padding: 13px 20px;
          border-bottom: 2px solid transparent;
          font-size: 14px;
          color: #304455;
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
          li {
            width: 200px;
            text-align: left;
            padding: 10px 0 10px 10px;
            a {
              display: block;
              width: 100%;
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
</style>
