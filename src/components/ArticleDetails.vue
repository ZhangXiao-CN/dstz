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
          <div v-else @click="favorites" de>
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
            :src="item.author.avatar ? item.author.avatar : 'http://localhost:3000/assets/img/defaultAvatar.png'"
            size="medium"
          ></el-avatar>
          <div class="comment-info">
            <div class="usermeta">
              <div class="username">{{item.author.nickName && item.author.nickName}}</div>
              <div class="create-date"></div>
            </div>
            <div class="conmment-content">{{item.content}}</div>
            <div class="comment-tools">
              <div>
                <i class="iconfont icon-like_fill"></i>
                <span>{{item.like}}</span>
              </div>
              <div>
                <i class="iconfont icon-interactive_fill"></i>
                <span>回复</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
        <textarea rows="2" placeholder="写下你的评论..." v-model="myComment"></textarea>
        <picker
          :include="['people']"
          :showSearch="false"
          :showPreview="false"
          :showCategories="false"
          :native="true"
          @select="addEmoji"
        />
      </div>
    </div>
    <div class="comment-btn">
      <el-button type="primary" :size="'mini'" @click="createComment" :loading="loading === 1">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Picker } from 'emoji-mart-vue'
export default {
  name: 'ArticleDetails',
  data () {
    return {
      article: '',
      articleLike: false, // 是否点赞
      likeFlag: true, // 点赞节流阀
      articFavorites: false, // 是否收藏
      favoritesFlag: true, // 收藏节流阀
      commentList: {},
      myComment: '',
      loading: ''
    }
  },
  components: { Picker },
  computed: {
    ...mapState(['isLogin', 'userInfo'])
  },
  methods: {
    addEmoji (e) {
      this.myComment += e.native
      console.log(this.myComment)
      console.log(e)
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
        this.myComment = ''
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
.comment-btn {
  text-align: right;
  background-color: #fff;
  padding: 0 16px 8px 0;
}
.comment-form {
  display: flex;
  background-color: #fff;
  padding: 16px;
  .text {
    display: flex;
    width: 100%;
    textarea {
      flex: 1;
      overflow: hidden;
      overflow-wrap: break-word;
      max-width: 100%;
      height: 100px;
      padding: 10px;
      outline: none;
      border: 1px solid #ccc;
      // box-sizing: border-box;
      resize: none;
      margin-left: 15px;
      font-family: font-regular, 'Helvetica Neue', sans-serif;
    }
  }
}
.article-details-wrap {
  // padding-left: 10 / 40rem;
  background-color: #fff;
  .thumbnail-img {
    // width: 100%;
    img {
      width: 100%;
      display: block;
      // border-radius: 8px;
      max-height: 550px;
      border-radius: 8px 8px 0 0;
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
    span {
      margin-right: 10px;
    }
    p {
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
      background-color: #f6f6f6;
      color: #d0d0d0;
      font-size: 14px;
      padding: 2px 5px;
      cursor: pointer;
      i {
        font-size: 14px;
        margin-right: 2px;
      }
    }
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
      }
      span {
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: 700;
        color: #000000;
      }
      .conmment-content {
        margin: 10px 0;
      }
      .comment-tools {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        div {
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
    }
  }
}
@media screen and (max-width: 1024px) {
  .article-comment {
    margin-top: 5px;
  }
}

@media screen and (max-width: 768px) {
  .comment-avatar {
    display: none;
  }
  .comment-form {
    padding: 8px;
    textarea {
      margin-left: 0 !important;
    }
  }
}

@media screen and (max-width: 505px) {
  .article-wrap {
    .comment-form {
      .text {
        textarea {
          height: 80px;
        }
      }
    }
  }
}
</style>
