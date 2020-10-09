<template>
  <div
    class="article-list-wrap"
    id="articleList"
    v-loading="articleListLoading"
  >
    <div class="article-category-box">
      <div class="article-category" v-html="$xss(currentCategoryTitle)"></div>
      <div>
        <el-button
          type="primary"
          size="small"
          plain
          v-if="backShow"
          @click="goBack"
          >返回</el-button
        >
      </div>
    </div>
    <div v-if="articleList.length > 0">
      <ul class="article-list">
        <li class="article-item" v-for="item in articleList" :key="item._id">
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
            <div
              class="bottom-info"
              :class="{ 'noarticle-thumbnail': !item.thumbnail }"
            >
              <div class="article-info-author">
                <router-link
                  :to="{ name: 'user', params: { id: item.author._id } }"
                >
                  <el-avatar
                    :src="
                      item.author.avatar
                        ? item.author.avatar
                        : 'http://localhost:3000/assets/img/defaultAvatar.png'
                    "
                    size="small"
                  ></el-avatar>
                  <div class="silder-author">
                    <span>{{ item.author.nickName }}</span>
                  </div>
                </router-link>
              </div>
              <div class="article-attr">
                <div class="article-info-category">
                  <i class="iconfont icon-fenlei"></i>
                  <span to="category">{{ item | filterCategory }}</span>
                </div>
              </div>
            </div>
            <div
              class="count"
              :class="{ 'noarticle-thumbnail': !item.thumbnail }"
            >
              <div class="count-box">
                <div class="views-count">
                  <i class="iconfont icon-browse_fill"></i>
                  <span>{{ item.meta.views }}</span>
                </div>
                <div class="comment-count">
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>{{ item.meta.comments }}</span>
                </div>
                <div class="likes-count">
                  <i class="iconfont icon-like_fill"></i>
                  <span>{{ item.meta.likes }}</span>
                </div>
              </div>
              <div class="date">
                <div>
                  <span>{{ item.updateAt.split('T')[0] }}</span>
                </div>
              </div>
            </div>
          </div>
          <router-link
            :to="{ name: 'article', params: { id: item._id } }"
            class="article-img"
            v-if="item.thumbnail"
            target="_blank"
          >
            <img v-lazy="item.thumbnail" :key="item.thumbnail" />
          </router-link>
        </li>
      </ul>
      <a
        href="javascript:;"
        class="more"
        v-loading="loading"
        @click="getmroe"
        v-if="articleMroe"
        >加载更多</a
      >
      <div href="javascript:;" class="more nomore" v-if="!articleMroe">
        没有更多了
      </div>
    </div>
    <div v-else class="clean">
      <div>
        <p>这里很干净</p>
        <p>什么都没有^_^|||</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ArticleList',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState([
      'articleList',
      'currentCategoryTitle',
      'currentCategory',
      'currentCategoryChilren',
      'articleMroe',
      'articleListLoading',
      'articleSearch',
      'articleLimit',
      'backShow',
      'isSearch'
    ])
  },
  methods: {
    async getmroe () {
      try {
        this.loading = true
        this.$store.commit('changeArticleLimit', this.articleLimit + 10)
        let res = ''
        // 是分类
        if (this.currentCategory || this.currentCategoryChilren) {
          const data = await this.axios.get('api/posts/category?categoryID=' + this.currentCategory + '&categoryChilren=' + this.currentCategoryChilren + '&limit=' + this.articleLimit)
          res = data.data
          // 是搜索
        } else if (this.isSearch) {
          const data = await this.axios.get('api/posts/search/' + this.articleSearch + '?limit=' + this.articleLimit)
          res = data.data
          // 都不是就是最新文章
        } else {
          const data = await this.axios.get('api/posts/lasted?limit=' + this.articleLimit)
          res = data.data
        }
        if (res.length === this.articleList.length) {
          this.$store.commit('changeArticleMroe', false)
          this.loading = false
        } else {
          this.$store.commit('changeArticleList', res)
          this.loading = false
        }
      } catch (err) {
        this.$message.error(err)
        this.loading = false
      }
    },
    async goBack () {
      try {
        const moveY = document.getElementById('silder').clientHeight
        // 滚动到主页面
        window.scrollTo(0, moveY + 10)
        // 利用vue路由参数变化页面不刷新的原理,让url查询参数与搜索关键词一致
        // 并且不刷新页面,利用axios获取最新文章达到返回的目的提升用户体验
        this.$router.push({ path: '/', query: {} })
        this.$store.commit('changeArticleListLoading', true)
        this.$store.commit('changeArticleLimit', 10)
        const { data: res } = await this.axios.get('api/posts/lasted?limit=' + this.articleLimit)
        this.$store.commit('changeCurrentCategory', '')
        this.$store.commit('changeCurrentCategoryChilren', '')
        this.$store.commit('changeCurrentCategoryTitle', '<i class="iconfont icon-zuixin"></i>最新文章')
        this.$store.commit('changeArticleList', res)
        this.$store.commit('changeArticleSearch', '')
        this.$store.commit('changeIsSearch', false)
        this.$store.commit('changeBackShow', false)
        this.$store.commit('changeArticleListLoading', false)
        this.$store.commit('changeArticleMroe', true)
      } catch (err) {
        this.$message('获取文章失败')
        this.$store.commit('changeArticleListLoading', false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-category-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.more {
  display: block;
  text-align: center;
  padding: 10 / 40rem 0;
  font-size: 14px;
  color: #409eff;
}
.nomore {
  color: #304430;
}
.article-list-wrap {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  border-radius: 8px;
  padding: 15 / 40rem 20 / 40rem 0 20 / 40rem;
  .article-category {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ecad9e;
    text-align: left;
    font-size: 20 / 40rem;
    border-bottom: 1px solid #f3f3f3;
    padding-bottom: 15 / 40rem;
    padding-right: 10px;
  }
  .article-list {
    text-align: left;
    .article-item {
      display: flex;
      justify-content: flex-start;
      padding-bottom: 5 / 40rem;
      margin-top: 10 / 40rem;
      border-bottom: 1px solid #f5f5f5;
      max-height: 130px;
      // align-items: center;
      .article-img {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 3;
        height: 150 / 40rem;
        width: 35%;
        // border-radius: 8px;
        max-height: 130px;
        // overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          // border-radius: 8px;
        }
      }
    }
  }
  .article-info {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 7;
    // width: 65%;
    margin-right: 5px;
    .article-info-title {
      font-size: 18 / 40rem;
      font-weight: 700;
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
    }
    .count {
      display: flex;
      .count-box,
      .date {
        flex: 1;
        // width: 50%;
        font-size: 13 / 40rem;
        color: #c1c1c1;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 5 /40rem 3 /40rem 0;
        div {
          display: flex;
          align-items: center;
          padding: 1px 5px;
          background-color: rgba(245, 245, 245, 0.5);
        }
        .likes-count {
          padding-right: 5px;
        }
        i {
          font-size: 13 / 40rem;
          margin-right: 1px;
        }
      }
      .date {
        display: flex;
        align-items: center;
        margin-left: 0;
        div {
          background-color: rgba(245, 245, 245, 0.5);
          padding-left: 0;
        }
        span {
          padding: 1px 5px;
          background-color: rgba(245, 245, 245, 0.5);
        }
      }
      i,
      span {
        padding-top: 1px !important;
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
    .noarticle-thumbnail {
      width: 70%;
    }
    .bottom-info {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 13 / 40rem;
      white-space: nowrap;
      color: #c1c1c1;
      // margin-top: 10 / 40rem;
      .article-info-author {
        overflow: hidden;
        flex: 1;
        width: 50%;
        margin-right: 5 / 40rem;
        a {
          // display: block;
          display: flex;
          color: #c1c1c1;
          .el-avatar {
            vertical-align: bottom;
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
          .silder-author {
            display: flex;
            background-color: rgba(245, 245, 245, 0.5);
            align-items: center;
            padding: 1px 5px;
          }
        }
      }
      .article-attr {
        width: 50%;
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        div {
          margin-right: 10 / 40rem;
          background-color: rgba(245, 245, 245, 0.5);
        }
        .article-info-category {
          // margin-right: 20 / 40rem;
          padding: 1px 5px;
          span {
            color: #c1c1c1;
          }
        }
        .iconfont {
          margin-right: 2 / 40rem;
        }
        .icon-fenlei {
          margin-right: 1px;
          color: #a2e1d4;
        }
      }
      i {
        font-size: 13 / 40rem;
      }
    }
  }
  .clean {
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #c1c1c1;
    p {
      text-align: center;
    }
  }
}
@media screen and (max-width: 1024px) {
  .article-img {
    height: 125 / 40rem !important;
    // min-width: 50% !important;
  }
}

@media screen and (max-width: 768px) {
  .article-img {
    height: 140 / 40rem !important;
    // min-width: 50% !important;
  }
}

@media screen and (max-width: 505px) {
  .article-info {
    flex: 6.5 !important;
  }
  .el-avatar {
    width: 18px !important;
    height: 18px !important;
  }
  .article-img {
    height: 100 / 40rem !important;
    // min-width: 50% !important;
    flex: 3.5 !important;
  }
  .article-info-summary {
    display: none !important;
  }
  .article-category {
    font-size: 17px !important;
  }
  .article-info-title {
    font-size: 15px !important;
  }
  .summary {
    font-size: 15px !important;
  }
  .bottom-info i,
  .bottom-info span {
    font-size: 13px !important;
  }
  .count i,
  .count span {
    font-size: 13px !important;
  }
}
</style>
