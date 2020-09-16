<template>
  <div id="articleDetails">
    <div class="article-details-wrap">
      <div class="thumbnail-img">
        <img :src="article.thumbnail" />
      </div>
      <div class="article-attr">
        <div class="articlecategory">
          <i class="iconfont icon-fenlei"></i>
          <span to="category">{{article | filterCategory}}</span>
          <i class="iconfont icon-browse_fill viewicon"></i>
          <span class="viewCount">{{article.meta && article.meta.views}}</span>
        </div>
        <div class="article-title">{{article.title && article.title}}</div>
      </div>
      <div class="article-author">
        <div class="author-wrap">
          <el-avatar
            shape="square"
            :src="article.author && article.author.avatar ? article.author && article.author.avatar : 'http://localhost:3000/assets/img/defaultAvatar.png'"
            size="medium"
          ></el-avatar>
          <p>{{article.author && article.author.nickName}}</p>
        </div>
        <el-button type="primary" size="mini" :loading="loading === 0">关注</el-button>
      </div>
      <div class="article-view">
        <mavon-editor codeStyle="monokai" v-html="article.html"></mavon-editor>
      </div>
      <div class="like">
        <div :class="{'is-favorites ': articFavorites}">
          <div v-if="articFavorites" @click="cancelFavorites">
            <i class="iconfont icon-collection_fill"></i>
            <span>已收藏</span>
          </div>
          <div v-else @click="favorites">
            <i class="iconfont icon-collection_fill"></i>
            <span>收藏</span>
          </div>
        </div>
        <div :class="{'is-like': articleLike}">
          <div v-if="articleLike" @click="cancelFabulous">
            <i class="iconfont icon-like_fill"></i>
            <span>{{article.meta && article.meta.likes}}</span>
          </div>
          <div v-else @click="fabulous">
            <i class="iconfont icon-like_fill"></i>
            <span>{{article.meta && article.meta.likes}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="article-comment">
      <div class="article-comment-title">
        全部评论&nbsp;&nbsp;
        <span>{{article.meta && article.meta.comments}}</span>&nbsp;&nbsp;
      </div>
      <ul>
        <li v-for=" item in commentList.records" :key="item._id">
          <el-avatar
            shape="square"
            :src="item.author.avatar ? item.author.avatar : 'http://localhost:3000/assets/img/defaultAvatar.png'"
            size="medium"
          ></el-avatar>
          <div class="comment-info">
            <div class="usermeta">
              <div class="username">{{item.author.nickName && item.author.nickName}}</div>
              <div class="create-date"></div>
            </div>
            <div class="conmment-content" v-html="item.content"></div>
            <div class="comment-tools">
              <button>
                <i class="iconfont icon-like_fill"></i>
                <span>{{item.likeCount}}</span>
              </button>
              <button @click="changereply(item._id)" class="reply-btn" v-if="reply !== item._id">
                <i class="iconfont icon-interactive_fill"></i>
                <span>回复</span>
              </button>
              <button @click="changereply('0')" class="reply-btn" v-if="reply === item._id">
                <i class="iconfont icon-interactive_fill"></i>
                <span>取消回复</span>
              </button>
            </div>
            <div class="reply-wrap" v-if="reply === item._id">
              <div class="comment-form">
                <div class="comment-avatar">
                  <el-avatar
                    shape="square"
                    :size="35"
                    :src="userInfo.avatar ? userInfo.avatar : 'http://localhost:3000/assets/img/defaultAvatar.png'"
                    v-cloak
                  ></el-avatar>
                </div>
                <div class="text">
                  <Emoji @comments="getComments" :myComment="myComment"></Emoji>
                </div>
              </div>
              <div class="comment-btn">
                <el-button
                  type="primary"
                  :size="'mini'"
                  reply
                  @click="createReply($event, item._id, item.author._id)"
                  :loading="loading === 1"
                >提交</el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="comment-pages">
        <el-pagination
          layout="prev, pager, next"
          :current-page="commentList.page"
          :page-count="commentList.pages"
          :background="true"
          :hide-on-single-page="true"
          :small="true"
          @current-change="toPage"
          v-loading="commentLoading"
        ></el-pagination>
      </div>
    </div>
    <div class="write-comment" v-if="reply === '0'">
      <div class="comment-form">
        <div class="comment-avatar">
          <el-avatar
            shape="square"
            :size="35"
            :src="userInfo.avatar ? userInfo.avatar : 'http://localhost:3000/assets/img/defaultAvatar.png'"
            v-cloak
          ></el-avatar>
        </div>
        <div class="text">
          <Emoji @comments="getComments" :myComment="myComment"></Emoji>
        </div>
      </div>
      <div class="comment-btn">
        <el-button type="primary" :size="'mini'" @click="createComment" :loading="loading === 1">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Emoji from './Emoji'
import { mapState } from 'vuex'
export default {
  name: 'ArticleDetails',
  data () {
    return {
      article: '',
      articleLike: false, // 是否点赞
      likeFlag: true, // 点赞节流阀
      articFavorites: false, // 是否收藏
      favoritesFlag: true, // 收藏节流阀
      commentList: '',
      myComment: '',
      loading: '',
      commentLoading: false,
      reply: '0'
    }
  },
  components: { Emoji },
  computed: {
    ...mapState(['isLogin', 'userInfo'])
  },
  methods: {
    getComments (comment) {
      this.myComment = comment
    },
    // 评论
    async createComment (e) {
      this.loading = 1
      e.target.innerText = ''
      if (this.myComment.length < 3) {
        this.$message.error('评论怎么也得2个字以上吧!--!')
        this.loading = ''
        e.target.innerText = '提交'
        return
      }
      try {
        const { data: res } = await this.axios.post('api/comments', {
          content: this.myComment,
          post: this.article._id,
          author: this.userInfo._id
        })
        console.log(res)
        this.loading = ''
        const textarea = document.getElementById('textarea')
        textarea.innerHTML = ''
        this.myComment = ''
        this.commentList.records.push(res)
        e.target.innerText = '提交'
      } catch (err) {
        this.$message.error('提交评论失败!')
        this.loading = ''
        e.target.innerText = '提交'
      }
    },
    // 点赞
    async fabulous () {
      if (!this.likeFlag) return
      this.likeFlag = false
      try {
        if (!this.isLogin) {
          this.$message.success('请登录后再点赞哦!')
          this.$store.commit('changeLoginBox', true)
          this.likeFlag = true
          return
        }
        const { data: res } = await this.axios.post('api/posts/fabulous/' + this.$route.params.id)
        this.articleLike = res.islike
        this.article.meta.likes = res.post.meta.likes
        this.article.meta.likes = res.post.meta.likes
        this.likeFlag = true
      } catch (err) {
        console.log(err)
        this.likeFlag = true
      }
    },
    // 取消点赞
    async cancelFabulous () {
      if (!this.likeFlag) return
      this.likeFlag = false
      try {
        if (!this.isLogin) {
          this.$message.success('请登录后再点赞哦!')
          this.$store.commit('changeLoginBox', true)
          this.likeFlag = true
          return
        }
        const { data: res } = await this.axios.post('api/posts/cancelFabulous/' + this.$route.params.id)
        this.articleLike = res.islike
        this.article.meta.likes = res.post.meta.likes
        this.likeFlag = true
      } catch (err) {
        console.log(err)
        this.likeFlag = true
      }
    },
    // 取消收藏
    async cancelFavorites () {
      if (!this.favoritesFlag) return
      this.favoritesFlag = false
      try {
        if (!this.isLogin) {
          this.$message.success('请登录再后取消收藏哦!')
          this.$store.commit('changeLoginBox', true)
          this.favoritesFlag = true
          return
        }
        const { data: res } = await this.axios.post('api/posts/cancelFavorites/' + this.$route.params.id)
        this.articFavorites = res.isFavorites
        this.favoritesFlag = true
      } catch (err) {
        this.$message.error('取消收藏失败!')
        console.log(err)
        this.favoritesFlag = true
      }
    },
    // 收藏
    async favorites () {
      if (!this.favoritesFlag) return
      this.favoritesFlag = false
      try {
        if (!this.isLogin) {
          this.$message.success('请登录后再收藏哦!')
          this.$store.commit('changeLoginBox', true)
          this.favoritesFlag = true
          return
        }
        const { data: res } = await this.axios.post('api/posts/favorites/' + this.$route.params.id)
        this.articFavorites = res.isFavorites
        this.favoritesFlag = true
      } catch (err) {
        console.log(err)
        this.$message.error('取消收藏失败!')
        this.favoritesFlag = true
      }
    },
    async toPage (e) {
      this.commentLoading = true
      try {
        const { data: res } = await this.axios.get('api/comments/' + this.$route.params.id + '?page=' + e)
        this.commentList = res.records.length > 0 ? res : ''
        this.commentLoading = false
      } catch (err) {
        this.$message.error('获取评论列表失败!')
        this.commentLoading = false
      }
      this.commentLoading = false
    },
    changereply (id) {
      this.reply = id
      this.myComment = ''
    },
    async createReply (e, commentID, authorId) {
      this.loading = 1
      e.target.innerText = ''
      if (this.myComment.length < 3) {
        this.$message.error('回复怎么也得2个字以上吧!--!')
        this.loading = ''
        e.target.innerText = '提交'
        return
      }
      try {
        const { data: res } = await this.axios.put('api/comments/createReply/' + commentID, {
          to_uid: authorId,
          content: this.myComment,
          postId: this.article._id
        })
        console.log(res)
        this.loading = ''
        const textarea = document.getElementById('textarea')
        textarea.innerHTML = ''
        this.myComment = ''
        // this.commentList.records.push(res)
        e.target.innerText = '提交'
        this.reply = '0'
      } catch (err) {
        this.$message.error('提交评论失败!')
        this.loading = ''
        e.target.innerText = '提交'
      }
    }
  },
  async created () {
    try {
      const { data: res } = await this.axios.get('api/posts/' + this.$route.params.id)
      this.article = res.post
      this.articleLike = res.islike
      this.articFavorites = res.isFavorites
      console.log(res)
    } catch (err) {
      this.$message.error('获取文章失败!')
    }
    try {
      const { data: res } = await this.axios.get('api/comments/' + this.$route.params.id)
      this.commentList = res.records.length > 0 ? res : ''
    } catch (err) {
      this.$message.error('获取评论列表失败!')
    }
  }
}
</script>

<style lang="less" scoped>
.reply-wrap {
  background-color: #f9f9f9;
  border-radius: 8px;
  .comment-form {
    background-color: transparent;
  }
  .comment-btn {
    background-color: transparent;
  }
}
.comment-btn {
  text-align: right;
  background-color: #fff;
  padding: 0 16px 8px 0;
  border-radius: 0 0 8px 8px;
}
.comment-form {
  display: flex;
  background-color: #fff;
  padding: 16px 16px 7px 16px;
  margin-top: 10px;
  border-radius: 8px 8px 0 0;
  .text {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }
}
.article-details-wrap {
  // padding-left: 10 / 40rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  .thumbnail-img {
    // border-radius: 8px 8px 0 0;
    // width: 100%;
    img {
      width: 100%;
      display: block;
      // border-radius: 8px;
      max-height: 600px;
      object-fit: contain;
      // border-radius: 8px 8px 0 0;
    }
  }
  .article-attr {
    text-align: left;
    padding: 10px 0 10px 15px;
    background-color: #fff;
    .articlecategory {
      font-size: 14px;
      color: #999999;
      i {
        color: #607d8b;
        margin-right: 5px;
        font-size: 14px;
        color: #409eff;
      }
      .viewicon {
        margin-left: 15px;
        color: #999999;
      }
    }
    .article-title {
      font-size: 22px;
      font-weight: 700;
      margin: 6px 0;
    }
  }
  .article-author {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    background-color: #f7f8fa;
    align-items: center;
    .author-wrap {
      display: flex;
      align-items: center;
    }
    p {
      margin-left: 7px;
      font-weight: 700;
      color: #666;
    }
  }
  .article-view {
    .v-note-wrapper {
      padding: 5px 15px;
      box-shadow: none !important;
      z-index: 998;
    }
  }
  .like {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid #eeeeee;
    > div {
      padding: 2px 5px;
      background-color: #f6f6f6;
      color: #d0d0d0;
      font-size: 14px;
      cursor: pointer;
      i {
        font-size: 14px;
        margin-right: 2px;
      }
    }
  }
  .like > div:active {
    position: relative;
    top: 1px;
  }
  .is-like {
    color: #fe6673 !important;
    background-color: #fff !important;
  }
  .is-favorites {
    color: #2ae0c8 !important;
    background-color: #fff !important;
  }
}
.article-comment {
  background-color: #fff;
  margin: 10px 0 0 0;
  padding: 10px 10px 0 10px;
  border-radius: 8px;
  .article-comment-title {
    font-size: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
    span {
      font-size: 12px;
    }
  }
  ul {
    li {
      display: flex;
      padding: 10px 5px;
      justify-content: flex-start;
      border-bottom: 1px solid #eeeeee;
      .comment-info {
        width: 100%;
        margin-left: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: 700;
        color: #000000;
      }
      .conmment-content {
        margin: 7px 0;
      }
      .comment-tools {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        button {
          background-color: #f6f6f6;
          color: #d0d0d0;
          font-size: 12px;
          padding: 2px 5px;
          cursor: pointer;
          i {
            font-size: 12px;
          }
        }
      }
      .reply-btn {
        opacity: 0;
        transition: all 0.2s;
      }
    }
    li:hover .reply-btn {
      opacity: 1;
    }
  }
}
@media screen and (max-width: 1024px) {
  .article-comment {
    margin-top: 5px;
  }
  .reply-btn {
    opacity: 1 !important;
  }
}

@media screen and (max-width: 768px) {
  .comment-avatar {
    display: none;
  }
  .comment-form {
    padding: 8px 8px 5px 8px;
  }
  .comment-btn {
    padding: 0 8px 8px 0;
  }
}

@media screen and (max-width: 505px) {
}
</style>
