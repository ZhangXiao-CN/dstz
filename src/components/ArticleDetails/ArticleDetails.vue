<template>
  <div id="articleDetails">
    <div class="article-details-wrap">
      <div class="thumbnail-img">
        <img :src="article.thumbnail" />
      </div>
      <div class="article-attr">
        <div class="articlecategory">
          <i class="iconfont icon-fenlei"></i>
          <span to="category">{{ article | filterCategory }}</span>
          <i class="iconfont icon-browse_fill viewicon"></i>
          <span class="viewCount">{{
            article.meta && article.meta.views
          }}</span>
          <span class="article-date">{{
            article.updateAt && article.updateAt.split('T')[0]
          }}</span>
        </div>
        <div class="article-title">{{ article.title && article.title }}</div>
      </div>
      <div class="article-author">
        <div v-if="article.author">
          <router-link
            :to="{ name: 'user', params: { id: article.author._id } }"
            class="author-wrap"
          >
            <el-avatar
              shape="square"
              :src="
                article.author && article.author.avatar
                  ? article.author && article.author.avatar
                  : 'http://localhost:3000/assets/img/defaultAvatar.png'
              "
              size="medium"
            ></el-avatar>
            <p>{{ article.author && article.author.nickName }}</p>
          </router-link>
        </div>
        <div v-if="article.author && userInfo._id !== article.author._id">
          <el-button
            type="primary"
            size="mini"
            :loading="loading === 0"
            v-if="!isAttention"
            @click="attention('attention')"
            >关注</el-button
          >
          <el-button
            type="primary"
            size="mini"
            :loading="loading === 0"
            v-else
            @click="attention('cancelAttention')"
            class="is-attention"
            >已关注</el-button
          >
        </div>
        <div class="right-btn" v-else>
          <router-link :to="{ name: 'write' }">
            <i class="iconfont icon-mianxingyumaobi"></i>
            <span>写文章</span>
          </router-link>
        </div>
      </div>
      <div class="article-view">
        <mavon-editor codeStyle="monokai" v-html="article.html"></mavon-editor>
      </div>
      <div class="like">
        <div :class="{ 'is-favorites ': articFavorites }">
          <div v-if="articFavorites" @click="favorites('cancelFavorites')">
            <i class="iconfont icon-collection_fill"></i>
            <span>已收藏</span>
          </div>
          <div v-else @click="favorites('favorites')">
            <i class="iconfont icon-collection_fill"></i>
            <span>收藏</span>
          </div>
        </div>
        <div class="tags-wrap" v-if="article.tag && article.tag.length > 0">
          <el-tag size="mini" v-for="(item, index) in article.tag" :key="index">
            <i class="iconfont icon-icontag"></i>
            {{ item }}
          </el-tag>
        </div>
        <div :class="{ 'is-like': articleLike }">
          <div v-if="articleLike" @click="fabulous('cancelFabulous')">
            <i class="iconfont icon-like_fill"></i>
            <span>{{ article.meta && article.meta.likes }}</span>
          </div>
          <div v-else @click="fabulous('fabulous')">
            <i class="iconfont icon-like_fill"></i>
            <span>{{ article.meta && article.meta.likes }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="article-comment" v-if="commentFlag">
      <div class="article-comment-title">
        全部评论&nbsp;&nbsp;
        <span>{{ article.meta && article.meta.comments }}</span
        >&nbsp;&nbsp;
      </div>
      <ul
        class="comment-list"
        v-if="commentList.records && commentList.records.length > 0"
      >
        <li
          v-for="item in commentList.records"
          :key="item._id"
          class="comment-item"
        >
          <el-avatar
            shape="square"
            :src="
              item.author.avatar
                ? item.author.avatar
                : 'http://localhost:3000/assets/img/defaultAvatar.png'
            "
            size="medium"
          ></el-avatar>
          <div class="comment-info">
            <div class="comment-wrap">
              <div class="usermeta">
                <div v-if="item.author && article.author">
                  <router-link
                    :to="{ name: 'user', params: { id: item.author._id } }"
                    class="username"
                    >{{ item.author.nickName }}</router-link
                  >
                  <span
                    class="is-author"
                    v-if="item.author._id === article.author._id"
                    >作者</span
                  >
                </div>
                <div class="create-date">{{ item.createAt | filterDate }}</div>
              </div>
              <div class="conmment-content" v-html="item.content"></div>
              <div class="comment-tools">
                <button
                  class="is-like"
                  v-if="item.islike"
                  @click="commentFabulous('cancelFabulous', item._id)"
                >
                  <i class="iconfont icon-like_fill"></i>
                  <span>{{ item.likeCount }}</span>
                </button>
                <button v-else @click="commentFabulous('fabulous', item._id)">
                  <i class="iconfont icon-like_fill"></i>
                  <span>{{ item.likeCount }}</span>
                </button>
                <button
                  @click="changereply(item._id)"
                  class="reply-btn"
                  v-if="reply !== item._id"
                >
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>回复</span>
                </button>
                <button
                  @click="changereply('0')"
                  class="reply-btn"
                  v-if="reply === item._id"
                >
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>取消回复</span>
                </button>
              </div>
            </div>
            <ul
              class="comment-list"
              v-if="item.replies && item.replies.length > 0"
            >
              <li
                v-for="childItem in item.replies"
                :key="childItem._id"
                class="comment-item"
              >
                <el-avatar
                  shape="square"
                  :src="
                    childItem.from_uid.avatar
                      ? childItem.from_uid.avatar
                      : 'http://localhost:3000/assets/img/defaultAvatar.png'
                  "
                  size="medium"
                ></el-avatar>
                <div class="comment-info">
                  <div class="comment-wrap">
                    <div class="usermeta">
                      <div class="reply-users">
                        <div v-if="childItem.from_uid && article.author">
                          <router-link
                            :to="{
                              name: 'user',
                              params: { id: childItem.from_uid._id }
                            }"
                            class="username"
                            >{{ childItem.from_uid.nickName }}</router-link
                          >
                          <span
                            class="is-author"
                            v-if="childItem.from_uid._id === article.author._id"
                            >作者</span
                          >
                        </div>
                        <div class="to-icon">@</div>
                        <div v-if="childItem.to_uid && article.author">
                          <router-link
                            :to="{
                              name: 'user',
                              params: { id: childItem.to_uid._id }
                            }"
                            class="username"
                            >{{ childItem.to_uid.nickName }}</router-link
                          >
                          <span
                            class="is-author"
                            v-if="childItem.to_uid._id === article.author._id"
                            >作者</span
                          >
                        </div>
                      </div>
                      <div class="create-date">
                        {{ childItem.createAt | filterDate }}
                      </div>
                    </div>
                    <div
                      class="conmment-content"
                      v-html="childItem.content"
                    ></div>
                    <div class="comment-tools">
                      <button
                        class="is-like-reply"
                        v-if="childItem.islike"
                        @click="
                          replyFabulous(
                            'cancelReplyFabulous',
                            item._id,
                            childItem._id
                          )
                        "
                      >
                        <i class="iconfont icon-like_fill"></i>
                        <span>{{ childItem.likeCount }}</span>
                      </button>
                      <button
                        v-else
                        @click="
                          replyFabulous(
                            'replyFabulous',
                            item._id,
                            childItem._id
                          )
                        "
                      >
                        <i class="iconfont icon-like_fill"></i>
                        <span>{{ childItem.likeCount }}</span>
                      </button>
                      <button
                        @click="changereply(childItem._id)"
                        class="reply-btn"
                        v-if="reply !== childItem._id"
                      >
                        <i class="iconfont icon-interactive_fill"></i>
                        <span>回复</span>
                      </button>
                      <button
                        @click="changereply('0')"
                        class="reply-btn"
                        v-if="reply === childItem._id"
                      >
                        <i class="iconfont icon-interactive_fill"></i>
                        <span>取消回复</span>
                      </button>
                    </div>
                  </div>
                  <div class="reply-wrap" v-if="reply === childItem._id">
                    <div class="comment-form">
                      <div class="comment-avatar">
                        <el-avatar
                          shape="square"
                          :size="35"
                          :src="
                            userInfo.avatar
                              ? userInfo.avatar
                              : 'http://localhost:3000/assets/img/defaultAvatar.png'
                          "
                          v-cloak
                        ></el-avatar>
                      </div>
                      <div class="text">
                        <Emoji
                          @comments="getComments"
                          :myComment="myComment"
                        ></Emoji>
                      </div>
                    </div>
                    <div class="comment-btn">
                      <el-button
                        type="primary"
                        :size="'mini'"
                        reply
                        @click="
                          createReply($event, item._id, childItem.from_uid._id)
                        "
                        :loading="loading === 1"
                        >提交</el-button
                      >
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="reply-wrap" v-if="reply === item._id">
              <div class="comment-form">
                <div class="comment-avatar">
                  <el-avatar
                    shape="square"
                    :size="35"
                    :src="
                      userInfo.avatar
                        ? userInfo.avatar
                        : 'http://localhost:3000/assets/img/defaultAvatar.png'
                    "
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
                  >提交</el-button
                >
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
            :src="
              userInfo.avatar
                ? userInfo.avatar
                : 'http://localhost:3000/assets/img/defaultAvatar.png'
            "
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
          @click="createComment"
          :loading="loading === 1"
          >提交</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Emoji from '../comment/Emoji'
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
      isAttention: false, // 是否关注
      commentList: {},
      myComment: '',
      loading: '',
      commentLoading: false,
      reply: '0', // 控制弹出评论框的位置
      commentFlag: true // 控制评论区是否渲染
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
    // 判断是否登录,未登录弹出登录框
    isLoginAndEject (msg) {
      if (!this.isLogin) {
        this.$message.error(msg)
        this.$store.commit('changeLoginBox', true)
        return false
      } else {
        return true
      }
    },
    // 关注
    async attention (path) {
      this.loading = 0
      if (!this.isLoginAndEject('登录后才能关注哦!')) {
        this.loading = ''
        return
      }
      try {
        const { data: res } = await this.axios.put('api/users/' + path + '/' + this.article.author._id)
        this.isAttention = res.isAttention
        this.loading = ''
      } catch (err) {
        this.loading = ''
        this.$message.error('操作失败了!--! 请刷新后重试, 或联系站长')
      }
    },
    // 评论
    async createComment (e) {
      this.loading = 1
      e.target.innerText = ''
      if (!this.isLoginAndEject('登录后才能评论哦!')) {
        this.loading = ''
        e.target.innerText = '提交'
        return
      }
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
        this.loading = ''
        const textarea = document.getElementById('textarea')
        textarea.innerHTML = ''
        this.myComment = ''
        // 如果评论为空, 需要定义空数组, 才能push
        if (!this.commentList) {
          this.commentList = {}
          this.commentList.records = []
          this.commentList.records.push(res.com)
        } else {
          this.commentList.records.push(res.com)
        }
        this.article.meta = res.post.meta
        e.target.innerText = '提交'
        this.loading = ''
      } catch (err) {
        this.$message.error('提交评论失败! 请刷新后重试, 或联系站长')
        this.loading = ''
        e.target.innerText = '提交'
      }
    },
    // 回复
    async createReply (e, commentID, authorId) {
      this.loading = 1
      e.target.innerText = ''
      if (!this.isLoginAndEject('登录后才能回复哦!')) {
        this.loading = ''
        e.target.innerText = '提交'
        return
      }
      if (authorId === this.userInfo._id) {
        this.$message.error('请不要自己给自己回复呃!--!')
        this.loading = ''
        e.target.innerText = '提交'
        return
      }
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
        this.loading = ''
        const textarea = document.getElementById('textarea')
        textarea.innerHTML = ''
        this.myComment = ''
        for (const item of this.commentList.records) {
          if (item._id === res.comment._id) {
            item.replies = res.comment.replies
            break
          }
        }
        this.article.meta = res.post.meta
        e.target.innerText = '提交'
        this.reply = '0'
      } catch (err) {
        this.$message.error('提交评论失败! 请刷新后重试, 或联系站长')
        this.loading = ''
        e.target.innerText = '提交'
      }
    },
    // 点赞与取消
    async fabulous (path) {
      if (!this.likeFlag) return
      this.likeFlag = false
      try {
        if (!this.isLoginAndEject('登录后才能点赞哦!')) {
          this.likeFlag = true
          return
        }
        const { data: res } = await this.axios.post('api/posts/' + path + '/' + this.$route.params.id)
        this.articleLike = res.islike
        this.article.meta.likes = res.post.meta.likes
        this.likeFlag = true
      } catch (err) {
        this.likeFlag = true
      }
    },
    // 收藏与取消
    async favorites (path) {
      if (!this.favoritesFlag) return
      this.favoritesFlag = false
      try {
        if (!this.isLoginAndEject('登录后才能收藏哦!')) {
          this.favoritesFlag = true
          return
        }
        const { data: res } = await this.axios.post('api/posts/' + path + '/' + this.$route.params.id)
        this.articFavorites = res.isFavorites
        this.favoritesFlag = true
      } catch (err) {
        this.$message.error('操作失败了!--! 请刷新后重试, 或联系站长')
        this.favoritesFlag = true
      }
    },
    // 评论翻页
    async toPage (e) {
      this.commentLoading = true
      try {
        const { data: res } = await this.axios.get('api/comments/' + this.$route.params.id + '?page=' + e)
        this.commentList = res.records.length > 0 ? res : ''
        this.commentLoading = false
      } catch (err) {
        this.$message.error('获取评论列表失败! 请刷新后重试, 或联系站长')
        this.commentLoading = false
      }
      this.commentLoading = false
    },
    // 显示回复框
    changereply (id) {
      this.reply = id
      this.myComment = ''
      if (this.reply !== '0') {
        const textarea = document.getElementById('textarea')
        textarea.focus()
      }
    },
    // 评论点赞
    async commentFabulous (path, commentId) {
      if (!this.likeFlag) return
      this.likeFlag = false
      try {
        if (!this.isLoginAndEject('登录后才能点赞哦')) {
          this.likeFlag = true
          return
        }
        const { data: res } = await this.axios.post('api/comments/' + path + '/' + commentId)
        for (const item of this.commentList.records) {
          if (item._id === res._id) {
            item.likeCount = res.likeCount
            item.islike = res.islike
            this.likeFlag = true
            // 让评论区强制渲染,解决第一次评论点赞无法响应渲染到视图的BUG
            this.commentFlag = false
            this.commentFlag = true
            break
          }
        }
      } catch (err) {
        this.$message.error('操作失败了!--! 请刷新后重试, 或联系站长')
        this.likeFlag = true
      }
    },
    // 回复点赞
    async replyFabulous (path, commentId, replyId) {
      if (!this.likeFlag) return
      this.likeFlag = false
      try {
        if (!this.isLoginAndEject('登录后才能点赞哦!')) {
          this.likeFlag = true
          return
        }
        const { data: res } = await this.axios.post('api/comments/' + path + '/' + commentId, { replyId })
        for (const item of this.commentList.records) {
          if (item._id === res.commentId) {
            for (const reply of item.replies) {
              if (reply._id === res.replyId) {
                reply.likeCount = res.likeCount
                reply.islike = res.islike
                this.likeFlag = true
                break
              }
            }
            break
          }
        }
      } catch (err) {
        this.$message.error('操作失败!--! 请刷新后重试, 或联系站长')
        this.likeFlag = true
      }
    }
  },
  created () {
    // 让两个请求同时发出 所以不使用 async await 同步语法
    this.axios.get('api/posts/' + this.$route.params.id).then(res => {
      this.article = res.data.post
      this.articleLike = res.data.islike
      this.articFavorites = res.data.isFavorites
      if (this.isLogin) {
        this.axios.get('api/users/isAttention/' + this.article.author._id).then(res => {
          this.isAttention = res.data.isAttention
        }).catch(() => {
        })
      }
    }).catch(() => {
      this.$message.error('获取文章失败! 请刷新后重试, 或联系站长')
    })
    this.axios.get('api/comments/' + this.$route.params.id).then(res => {
      this.commentList = res.data.records.length > 0 ? res.data : ''
    }).catch(() => {
      this.$message.error('获取评论列表失败! 请刷新后重试, 或联系站长')
    })
  }
}
</script>

<style lang="less" scoped>
.right-btn {
  a {
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
      .article-date {
        margin-left: 15px;
      }
      i {
        color: #607d8b;
        margin-right: 5px;
        font-size: 14px;
        color: #a2e1d4;
      }
      .viewicon {
        margin-left: 15px;
        color: #999999;
      }
    }
    .article-title {
      font-size: 22px;
      font-weight: 700;
      margin-top: 6px;
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
    align-items: center;
    > div {
      padding: 2px 10px;
      background-color: #f6f6f6;
      color: #d0d0d0;
      font-size: 14px;
      border-radius: 8px;
      white-space: nowrap;
      cursor: pointer;
      i {
        font-size: 16px;
        margin-right: 2px;
      }
    }
    .tags-wrap {
      padding: 0;
      background-color: transparent;
      cursor: initial;
      justify-self: flex-start;
      align-items: center;
      white-space: normal;
      .el-tag {
        margin: 5px;
      }
    }
    .tags-wrap:active {
      position: relative;
      top: 0;
    }
  }
  .like > div:active {
    position: relative;
    top: 1px;
  }
}
.is-like {
  color: #fe6673 !important;
  background-color: #fff !important;
}
.is-like-reply {
  color: #fe6673 !important;
  background-color: #f9f9f9 !important;
}
.is-favorites {
  color: #2ae0c8 !important;
  background-color: #fff !important;
}
.is-author {
  font-size: 12px;
  margin-left: 4px;
  border: 1px solid rgba(244, 53, 71, 0.3);
  color: rgba(244, 55, 72, 0.6);
  border-radius: 4px;
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
  .comment-list {
    .comment-item {
      display: flex;
      padding: 10px 5px;
      justify-content: flex-start;
      border-bottom: 1px solid #eeeeee;
      .comment-list {
        margin: 10px 0;
        .comment-item {
          padding: 10px 10px 10px 15px;
          margin-top: 7px;
          background-color: #f9f9f9;
          border: none;
          .reply-users {
            display: flex;
            .to-icon {
              margin: 0 7px;
              font-size: 12px;
              color: #999999;
              font-weight: normal;
              line-height: 21px;
            }
          }
        }
      }
      .comment-info {
        width: 100%;
        margin-left: 10px;
      }
      .usermeta {
        display: flex;
        justify-content: space-between;
        .create-date {
          font-size: 12px;
          color: #c1c1c1;
        }
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
        button {
          background-color: #f6f6f6;
          color: #d0d0d0;
          font-size: 12px;
          padding: 2px 5px;
          cursor: pointer;
          i {
            font-size: 14px;
          }
        }
      }
      .reply-btn {
        opacity: 0;
        transition: all 0.2s;
      }
    }
    .comment-wrap:hover .reply-btn {
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
  .comment-item {
    .comment-item {
      padding: 5px !important;
    }
  }
  .conmment-content {
    font-size: 15px;
  }
}
</style>
