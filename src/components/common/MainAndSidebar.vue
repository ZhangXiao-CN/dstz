<template>
  <!-- class="clearfix" -->
  <div id="mainAndSidebar" style="height: initial">
    <div class="article-wrap">
      <slot></slot>
    </div>
    <div class="side-bar-wrap" id="sideBarWrap">
      <div class="side-bar" id="sideBar" style="margin-top: 0">
        <div class="comment-news">
          <div class="side-bar-title">
            <i class="iconfont icon-xinxiaoxi"></i>
            <span>最新评论</span>
          </div>
          <ul v-if="latestedComment && latestedComment.length > 0">
            <li v-for="item in latestedComment" :key="item._id">
              <div class="top-info">
                <router-link
                  v-if="item.author"
                  :to="{ name: 'user', params: { id: item.author._id } }"
                  class="author"
                >
                  <el-avatar
                    :src="
                      item.author.avatar
                        ? item.author.avatar
                        : 'http://localhost:3000/assets/img/defaultAvatar.png'
                    "
                    size="small"
                  ></el-avatar>
                  <p>{{ item.author.nickName }}</p>
                </router-link>
                <div class="create-date">{{ item.createAt | filterDate }}</div>
              </div>
              <div class="comment-text">
                <p v-html="item.content"></p>
              </div>
              <div class="comment-from" v-if="item.post">
                <span class="comment-article">[文章]</span>
                <router-link
                  :to="{ name: 'article', params: { id: item.post._id } }"
                  target="_blank"
                >
                  <p>{{ item.post.title }}</p>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="hot-article">
          <div class="side-bar-title">
            <i class="iconfont icon-praise"></i>
            <span>热门文章</span>
          </div>
          <ul v-if="hotArticles && hotArticles.length > 0">
            <li v-for="item in hotArticles" :key="item.id">
              <div class="article-info">
                <div class="article-info-title">
                  <router-link
                    :to="{ name: 'article', params: { id: item._id } }"
                    target="_blank"
                    >{{ item.title }}</router-link
                  >
                </div>
                <div class="article-info-summary">
                  <div class="summary">{{ item.summary }}</div>
                </div>
                <div class="category-wrap">
                  <div class="category">
                    <i class="iconfont icon-fenlei"></i>
                    <span>{{ item | filterCategory }}</span>
                  </div>
                  <div class="hot-article-date">
                    <span>{{ item.updateAt.split('T')[0] }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['sideScroll'],
  name: 'MainAndSidebar',
  data () {
    return {
      latestedComment: '',
      hotArticles: ''
    }
  },
  methods: {
  },
  created () {
    this.axios.get('api/comments/find/lasted').then(res => {
      this.latestedComment = res.data
    }).catch((err) => {
      this.$message.error('获取最新评论失败! 请刷新后重试, 或联系站长')
      return err
    })
    this.axios.get('api/posts/recommend').then(res => {
      this.hotArticles = res.data
    }).catch((err) => {
      this.$message.error('获取热门文章失败! 请刷新后重试, 或联系站长')
      return err
    })
  },
  mounted () {
    // // this.sideScroll()
    // this.$nextTick(() => {
    //   // this.sideScroll()
    //   const sideBar = document.getElementById('sideBar')
    //   const mainAndSidebar = document.getElementById('mainAndSidebar') // 父盒子
    //   const mainAndSidebarHeigth = mainAndSidebar.offsetHeight // 父盒子高度
    //   const sidBarHeigth = sideBar.offsetHeight // 子盒子的高度
    //   console.log(mainAndSidebarHeigth)
    //   console.log(sidBarHeigth)
    //   if (mainAndSidebarHeigth < sidBarHeigth) {
    //     mainAndSidebar.style.height = sidBarHeigth + 'px'
    //   }
    // })
  }
}
</script>

<style lang="less" scoped>
#mainAndSidebar {
  display: flex;
  justify-content: flex-start;
  // align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  // position: relative;
  margin-top: 10px;
  .top-info {
    display: flex;
    justify-content: space-between;
    .create-date {
      font-size: 12px;
      color: #c1c1c1;
    }
  }
  .article-wrap {
    // float: left;
    width: 69.7%;
    // flex: 7;
    // margin-right: 30%;
  }
  .article-info {
    a {
      display: block;
      line-height: 1.5;
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    a:hover {
      text-decoration: underline;
    }
    .category-wrap {
      font-size: 13 / 40rem;
      color: #c1c1c1;
      display: flex;
      justify-content: flex-start;
      div {
        margin: 5 /40rem 3 /40rem 0;
        margin-right: 10px;
      }
      i {
        font-size: 13 / 40rem;
        margin-right: 1px;
        color: #a2e1d4;
      }
    }
    .article-info-summary {
      display: flex;
      justify-content: space-between;
      font-size: 15 /40rem;
      color: #999;
      line-height: 1.5;
      margin-bottom: 8px;
      .summary {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .bottom-info {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      font-size: 13 / 40rem;
      white-space: nowrap;
      color: #c1c1c1;
      margin-top: 10 / 40rem;
      .article-info-author {
        margin-right: 5 / 40rem;
        a {
          display: block;
          color: #c1c1c1;
          .el-avatar {
            vertical-align: bottom;
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
        }
      }
      .article-attr {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        div {
          margin-right: 10 / 40rem;
        }
        .article-info-category {
          // margin-right: 20 / 40rem;
          a {
            color: #c1c1c1;
          }
        }
        .iconfont {
          margin-right: 2 / 40rem;
        }
        .icon-fenlei {
          margin-right: 1px;
          color: #607d8b;
        }
      }
      i {
        font-size: 13 / 40rem;
      }
    }
  }

  .side-bar-wrap {
    // flex: 3;
    width: 29.6%;
    margin-left: 10px;
    position: relative;
    // float: right;
    .side-bar {
      // position: absolute;
    }
    .side-bar-title {
      text-align: left;
      border-bottom: 1px solid #f5f5f5;
      font-size: 16 / 40rem;
      padding-bottom: 5 / 40rem;
      margin-bottom: 3px;
      .iconfont {
        margin-right: 5px;
        font-size: 16 / 40rem;
        color: #a2e1d4;
      }
    }
    .hot-article {
      background-color: #fff;
      border-radius: 8px;
      padding: 10px;
      margin-top: 10 / 40rem;
      li {
        margin: 10 / 40rem 0;
        border-bottom: 1px solid #f5f5f5;
      }
      .article-info-title {
        font-size: 14.5px;
        text-align: left;
        font-weight: 400;
      }
      .article-info-summary {
        font-size: 13px;
        margin: 0;
        text-align: left;
      }
      .category-wrap {
        font-size: 11px;
        i {
          font-size: 11px;
        }
      }
    }
    .comment-news {
      background-color: #fff;
      border-radius: 8px;
      padding: 10px 0 10px 10px;
      li {
        border-bottom: 1px solid #f5f5f5;
        padding: 5px;
        .author {
          display: flex;
          justify-content: flex-start;
          text-align: left;
          p {
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .el-avatar {
            width: 20px;
            height: 20px;
            vertical-align: bottom;
            margin-right: 5px;
            // img {
            //   width: 100%;
            //   height: 100%;
            // }
          }
        }
        .comment-text {
          text-align: left;
          position: relative;
          font-size: 14.5px;
          padding: 8px 3px;
          background-color: #f5f5f5;
          border-radius: 8px;
          margin: 8 / 40rem;
          margin-left: 5px;
          margin-right: 5px;
          p {
            padding-left: 5px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .comment-text::before {
          content: '';
          display: block;
          position: absolute;
          top: -8px;
          left: 25px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #f5f5f5;
          z-index: 2;
        }
        .comment-from {
          display: flex;
          justify-content: flex-start;
          font-size: 13px;
          text-align: left;
          a {
            color: #999;
            overflow: hidden;
            p {
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .comment-article {
            white-space: nowrap;
            color: #409eff;
            margin-right: 1px;
          }
        }
      }
    }
  }
}
/* responsed */

@media screen and (max-width: 1024px) {
  .hot-article {
    margin-top: 5px !important;
  }
  #mainAndSidebar {
    margin-top: 5px;
  }
  .article-info {
    flex: 1 !important;
  }
  .article-img {
    flex: 1 !important;
  }
}

@media screen and (max-width: 768px) {
  #mainAndSidebar {
    flex-direction: column;
    margin-top: 3px;
  }
  .article-wrap {
    float: none !important;
    margin-right: 0 !important;
    margin-bottom: 5px !important;
    flex: initial !important;
    width: initial !important;
  }
  .side-bar-wrap {
    float: none !important;
    position: relative !important;
    bottom: initial !important;
    top: initial !important;
    right: initial;
    left: initial;
    flex: initial !important;
    width: initial !important;
    margin-left: 0 !important;
  }
}

@media screen and (max-width: 505px) {
  #mainAndSidebar {
    flex-direction: column;
  }
  .el-avatar {
    width: 18px !important;
    height: 18px !important;
  }
  .article-category {
    font-size: 13px !important;
  }
  .article-info-title {
    font-size: 15px !important;
  }
  .summary {
    font-size: 13px !important;
  }
  .bottom-info i,
  .bottom-info span {
    font-size: 13px !important;
  }
  .category-wrap i,
  .category-wrap span {
    font-size: 13px !important;
  }
  .side-bar-title {
    font-size: 14px !important;
    .icon-xinxiaoxi {
      font-size: 14px !important;
    }
  }
  .comment-text {
    font-size: 15px !important;
  }
}
</style>
