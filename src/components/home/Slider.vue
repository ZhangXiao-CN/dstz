<template>
  <div id="silder">
    <div class="silder-box">
      <swiper :options="swiperOption" v-if="swiperList.length > 0">
        <swiper-slide
          class="swiper-slide"
          v-for="item in swiperList"
          :key="item._id"
        >
          <router-link
            :to="{ name: 'article', params: { id: item._id } }"
            target="_blank"
          >
            <img
              :src="item.thumbnail"
              :key="item.thumbnail"
              class="imgLoaded"
            />
            <img src="../../assets/images/imgLoading.svg" class="imgLoading" />
            <div class="silder-article">
              <div class="silder-article-category">
                <i class="iconfont icon-fenlei"></i>
                {{ item | filterCategory }}
              </div>
              <div class="silder-article-title">{{ item.title }}</div>
              <div class="silder-article-author">
                <el-avatar
                  :src="
                    item.author.avatar
                      ? item.author.avatar
                      : 'http://localhost:3000/assets/img/defaultAvatar.png'
                  "
                  size="small"
                ></el-avatar>
                <span class="silder-author">{{ item.author.nickName }}</span>
                <span class="silder-date">{{
                  item.updateAt.split('T')[0]
                }}</span>
              </div>
            </div>
          </router-link>
        </swiper-slide>
        <!-- 分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="top-articles">
      <div class="top-item" v-for="item in fixList" :key="item._id">
        <router-link
          :to="{ name: 'article', params: { id: item._id } }"
          target="_blank"
        >
          <img v-lazy="item.thumbnail" :key="item.thumbnail" />
          <div class="silder-article">
            <div class="silder-article-category">
              <i class="iconfont icon-fenlei"></i>
              {{ item | filterCategory }}
            </div>
            <div class="silder-article-title">{{ item.title }}</div>
            <div class="silder-article-author">
              <el-avatar
                :src="
                  item.author.avatar
                    ? item.author.avatar
                    : 'http://localhost:3000/assets/img/defaultAvatar.png'
                "
                size="small"
              ></el-avatar>
              <span class="silder-author">{{ item.author.nickName }}</span>
              <span class="silder-date">{{ item.createAt.split('T')[0] }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Silder',
  data () {
    return {
      swiperList: [],
      fixList: [],
      swiperOption: {
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 自动轮播
        autoplay: {
          delay: 2000,
          // 当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        // 开启循环模式
        loop: true,
        speed: 700,
        on: {
          init: function () {
            // 原版懒加载太丑, 手动实现懒加载
            const imgs = document.querySelectorAll('.imgLoaded')
            console.log(imgs)
            for (let i = 0; i < imgs.length; i++) {
              imgs[i].onload = function (e) {
                e.stopPropagation()
                imgs[i].nextElementSibling.style.display = 'none'
                imgs[i].style.display = 'block'
                if (i === imgs.length - 2) {
                  imgs[0].nextElementSibling.style.display = 'none'
                  imgs[0].style.display = 'block'
                }
                if (i === 1) {
                  imgs[imgs.length - 1].nextElementSibling.style.display = 'none'
                  imgs[imgs.length - 1].style.display = 'block'
                }
              }
            }
          }
        }
      }
    }
  },
  created () {
    this.axios.get('api/slides').then(res => {
      this.swiperList = res.data
    }).catch((err) => {
      this.$message.error('获取轮播图失败!')
      return err
    })
    this.axios.get('api/slides/fix').then(res => {
      this.fixList = res.data
    }).catch((err) => {
      this.$message.error('获取轮播图失败!')
      return err
    })
  }
}
</script>

<style lang="less">
#silder {
  display: flex;
  justify-content: flex-start;
  max-width: 1440px;
  max-height: 500 / 40rem;
  margin: 10 / 40rem auto;
  .silder-box {
    position: relative;
    overflow: hidden;
    width: 70%;
    flex: 7;
    border: 2px solid #fff;
    border-radius: 10px;
    margin-right: 7 / 40rem;
    .swiper-container {
      height: 100%;
      .swiper-wrapper {
        height: 100%;
        .swiper-slide {
          height: 100%;
          a {
            height: 100%;
            display: block;
            img {
              width: 100%;
              height: 100%;
              // object-fit: cover;
              display: block;
              border-radius: 10px;
            }
          }
          .imgLoaded {
            display: none;
          }
        }
      }
    }
    // 自定义分页器样式,一定不能加 scoped !!!!!!!!!!
    .swiper-pagination {
      position: absolute;
      width: initial;
      top: 20px;
      right: 20px;
      bottom: initial;
      left: initial;
      .swiper-pagination-bullet {
        width: 16px;
        height: 4px;
        border-radius: 0;
        // background: #fff;
      }
      .swiper-pagination-bullet-active {
        background-color: #409eff;
      }
    }
  }
  .top-articles {
    // position: relative;
    width: 30%;
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .top-item {
      position: relative;
      width: 100%;
      overflow: hidden;
      border: 2px solid #fff;
      border-radius: 10px;
      box-sizing: border-box;
      flex: 1;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      .silder-article {
        padding: 10 / 40rem 20 / 40rem;
      }
      .silder-article-category {
        font-size: 10 / 40rem;
        i {
          font-size: 12 / 40rem;
        }
      }
      .silder-article-title {
        font-size: 14 / 40rem;
      }
      .silder-article-author {
        font-size: 14 / 40rem;
        .el-avatar {
          width: 20px;
          height: 20px;
        }
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .top-item:nth-of-type(1) {
      margin-bottom: 10px;
    }
  }
  .silder-article {
    overflow: hidden;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 10px 20px;
    color: #fff;
    text-align: left;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.2);
    .silder-article-category {
      font-size: 14 / 40rem;
      i {
        color: #a2e1d4;
        font-size: 14 / 40rem;
      }
    }
    .silder-article-title {
      font-size: 22 / 40rem;
      margin: 6 / 40rem 0 8 / 40rem 0;
    }
    .silder-article-author {
      font-size: 16 /40rem;
      span {
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .top-item {
    margin-bottom: 2px !important;
  }
  #silder {
    margin: 4px auto;
    max-height: 400 / 40rem;
  }
  .silder-box {
    margin-right: 2px !important;
  }
  .top-articles .silder-article-author {
    display: none !important;
  }
}

@media screen and (max-width: 768px) {
  .top-item {
    margin-bottom: 0 !important;
  }
  #silder {
    max-height: 300 / 40rem;
  }
  .silder-article {
    display: none !important;
  }
  .swiper-pagination {
    display: none !important;
  }
}

@media screen and (max-width: 505px) {
  #silder {
    max-height: 200 / 40rem;
  }
  #silder {
    margin-right: 3px !important;
  }
  .silder-box {
    margin-right: 0 !important;
  }
}
</style>
