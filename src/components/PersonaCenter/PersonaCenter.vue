<template>
  <div id="personaCenter">
    <div class="user-header">
      <div class="user-mask">
        <div
          class="nothumb"
          v-if="
            userThumb === 'http://localhost:3000/assets/img/defaultthumb.jpg' &&
            !userSelf
          "
        >
          <img :src="userThumb" />
        </div>
        <div class="thumb" v-else>
          <label
            class="upload-thumb"
            v-if="
              userSelf &&
              userThumb === 'http://localhost:3000/assets/img/defaultthumb.jpg'
            "
          >
            <i class="iconfont icon-xiazai40"></i>
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              @change="changeThumb"
            />
            <p>上传封面</p>
          </label>
          <div
            class="thumb-show"
            v-if="
              userThumb !== 'http://localhost:3000/assets/img/defaultthumb.jpg'
            "
          >
            <img :src="userThumb" />
            <div class="thumb-tools" v-if="userSelf">
              <label>
                <i>
                  更换封面
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png, image/gif"
                    @change="changeThumb"
                  />
                </i>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="user-avatar">
          <el-avatar
            shape="square"
            :size="120"
            :src="
              userAvatar
                ? userAvatar
                : 'http://localhost:3000/assets/img/defaultAvatar.png'
            "
            v-cloak
          ></el-avatar>
          <label v-if="userSelf">
            修改头像
            <input type="file" @change="changeAvatar" />
          </label>
        </div>
        <div class="username-wrap">
          <div class="username">{{ author.nickName }}</div>
          <div class="autograph">
            {{
              author.autograph ? author.autograph : '这个人很懒,什么都没有留下'
            }}
          </div>
        </div>
        <div v-if="!userSelf">
          <el-button
            type="primary"
            size="small"
            v-if="!isAttention"
            :loading="isAttentionLoading"
            @click="attention('Attention')"
            >关注</el-button
          >
          <el-button
            type="primary"
            size="small"
            v-else
            class="is-attention"
            @click="attention('cancelAttention')"
            >已关注</el-button
          >
        </div>
      </div>
    </div>
    <div class="user-main">
      <div class="left-bar">
        <ul>
          <li>
            <a href="javascript:;" @click="checkbox(0, false)">
              <div class="btn">
                <i class="iconfont icon-user"></i>
                <span>概览</span>
              </div>
              <i class="iconfont icon-enter"></i>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click="checkbox(1, false)">
              <div class="btn">
                <i class="iconfont icon-mianxingyumaobi"></i>
                <span>发布</span>
              </div>
              <i class="iconfont icon-enter"></i>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click="checkbox(2, false)">
              <div class="btn">
                <i class="iconfont icon-select"></i>
                <span>收藏</span>
              </div>
              <i class="iconfont icon-enter"></i>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click="checkbox(3, false)">
              <div class="btn">
                <i class="iconfont icon-yanjing"></i>
                <span>关注</span>
              </div>
              <i class="iconfont icon-enter"></i>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click="checkbox(4, false)">
              <div class="btn">
                <i class="iconfont icon-like"></i>
                <span>粉丝</span>
              </div>
              <i class="iconfont icon-enter"></i>
            </a>
          </li>
          <li v-if="userSelf">
            <a href="javascript:;" @click="checkbox(5, false)">
              <div class="btn">
                <i class="iconfont icon-setup"></i>
                <span>设置</span>
              </div>
              <i class="iconfont icon-enter"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="detauls">
        <div class="overview-viwe" v-if="tabIndex === 0">
          <ul>
            <li>
              <p>
                <span>昵称:</span>
                <span>{{ author.nickName }}</span>
              </p>
            </li>
            <li>
              <p>
                <span>邮箱:</span>
                <span>{{ author.email }}</span>
              </p>
            </li>
            <li>
              <p>
                <span>性别:</span>
                <span>{{ author.gender }}</span>
              </p>
            </li>
            <li>
              <p>
                <span>网址:</span>
                <span>{{ author.site ? author.site : '没有网址' }}</span>
              </p>
            </li>
            <li>
              <p>
                <span>签名:</span>
                <span>{{
                  author.autograph
                    ? author.autograph
                    : '这个人很懒,什么都没有留下'
                }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div
          class="publish-viwe"
          v-if="tabIndex === 1"
          v-loading="deleteLoading"
        >
          <ul v-if="publish && publish.length > 0">
            <li v-for="item in publish" :key="item._id">
              <div>
                <router-link
                  target="_blank"
                  :to="{ name: 'article', params: { id: item._id } }"
                >
                  <p>{{ item.title }}</p>
                </router-link>
                <div data-v-5cc3ab68 class="count">
                  <div data-v-5cc3ab68 class="comment-count">
                    <i
                      data-v-5cc3ab68
                      class="iconfont icon-interactive_fill"
                    ></i>
                    <span data-v-5cc3ab68>{{
                      item.meta && item.meta.comments
                    }}</span>
                  </div>
                  <div data-v-5cc3ab68 class="views-count">
                    <i data-v-5cc3ab68 class="iconfont icon-browse_fill"></i>
                    <span data-v-5cc3ab68>{{
                      item.meta && item.meta.views
                    }}</span>
                  </div>
                  <div data-v-5cc3ab68 class="likes-count">
                    <i data-v-5cc3ab68 class="iconfont icon-like_fill"></i>
                    <span data-v-5cc3ab68>{{
                      item.meta && item.meta.likes
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="btn-wrap" v-if="userSelf">
                <el-button
                  type="danger"
                  :size="'mini'"
                  @click="deleteArticle(item._id)"
                  >删除</el-button
                >
              </div>
            </li>
            <a
              href="javascript:;"
              class="more"
              v-loading="moreLoading"
              @click="getmroe(1)"
              v-if="isMore"
              >加载更多</a
            >
            <div href="javascript:;" class="more nomore" v-if="!isMore">
              没有更多了
            </div>
          </ul>
          <div v-else class="clean">
            <div>
              <p>这里很干净</p>
              <p>什么都没有^_^|||</p>
            </div>
          </div>
        </div>
        <div class="favorites-viwe" v-if="tabIndex === 2">
          <ul v-if="favorites && favorites.length > 0">
            <li v-for="item in favorites" :key="item._id">
              <div>
                <router-link
                  target="_blank"
                  :to="{ name: 'article', params: { id: item._id } }"
                >
                  <p>{{ item.title }}</p>
                </router-link>
                <div data-v-5cc3ab68 class="count">
                  <div data-v-5cc3ab68 class="comment-count">
                    <i
                      data-v-5cc3ab68
                      class="iconfont icon-interactive_fill"
                    ></i>
                    <span data-v-5cc3ab68>{{
                      item.meta && item.meta.comments
                    }}</span>
                  </div>
                  <div data-v-5cc3ab68 class="views-count">
                    <i data-v-5cc3ab68 class="iconfont icon-browse_fill"></i>
                    <span data-v-5cc3ab68>{{
                      item.meta && item.meta.views
                    }}</span>
                  </div>
                  <div data-v-5cc3ab68 class="likes-count">
                    <i data-v-5cc3ab68 class="iconfont icon-like_fill"></i>
                    <span data-v-5cc3ab68>{{
                      item.meta && item.meta.likes
                    }}</span>
                  </div>
                </div>
              </div>
            </li>
            <a
              href="javascript:;"
              class="more"
              v-loading="moreLoading"
              @click="getmroe(2)"
              v-if="isMore"
              >加载更多</a
            >
            <div href="javascript:;" class="more nomore" v-if="!isMore">
              没有更多了
            </div>
          </ul>
          <div v-else class="clean">
            <div>
              <p>这里很干净</p>
              <p>什么都没有^_^|||</p>
            </div>
          </div>
        </div>
        <div class="attention-viwe" v-if="tabIndex === 3">
          <ul v-if="attentions && attentions.length > 0">
            <li v-for="item in attentions" :key="item._id">
              <div class="attention-wrap">
                <router-link :to="{ name: 'user', params: { id: item._id } }">
                  <el-avatar
                    shape="square"
                    :size="80"
                    :src="
                      item.avatar
                        ? item.avatar
                        : 'http://localhost:3000/assets/img/defaultAvatar.png'
                    "
                  ></el-avatar>
                </router-link>
                <div class="attention-user">
                  <router-link
                    :to="{ name: 'user', params: { id: item._id } }"
                    class="user-name"
                    >{{ item.nickName }}</router-link
                  >
                  <p>
                    {{
                      item.autograph && item.autograph
                        ? item.autograph
                        : '这个人很懒, 什么都没有留下'
                    }}
                  </p>
                </div>
              </div>
              <div class="btn-wrap">
                <el-button
                  type="primary"
                  :size="'mini'"
                  @click="cancleAttentions(item._id)"
                  >取消关注</el-button
                >
              </div>
            </li>
            <a
              href="javascript:;"
              class="more"
              v-loading="moreLoading"
              @click="getmroe(3)"
              v-if="isMore"
              >加载更多</a
            >
            <div href="javascript:;" class="more nomore" v-if="!isMore">
              没有更多了
            </div>
          </ul>
          <div v-else class="clean">
            <div>
              <p>这里很干净</p>
              <p>什么都没有^_^|||</p>
            </div>
          </div>
        </div>
        <div class="fans-viwe" v-if="tabIndex === 4">
          <ul v-if="fans && fans.length > 0">
            <li v-for="item in fans" :key="item._id">
              <router-link :to="{ name: 'user', params: { id: item._id } }">
                <el-avatar
                  shape="square"
                  :size="80"
                  :src="
                    item.avatar
                      ? item.avatar
                      : 'http://localhost:3000/assets/img/defaultAvatar.png'
                  "
                ></el-avatar>
              </router-link>
              <div class="fans-user">
                <router-link
                  :to="{ name: 'user', params: { id: item._id } }"
                  class="user-name"
                  >{{ item.nickName }}</router-link
                >
                <p>
                  {{
                    item.autograph && item.autograph
                      ? item.autograph
                      : '这个人很懒, 什么都没有留下'
                  }}
                </p>
              </div>
            </li>
            <a
              href="javascript:;"
              class="more"
              v-loading="moreLoading"
              @click="getmroe(4)"
              v-if="isMore"
              >加载更多</a
            >
            <div href="javascript:;" class="more nomore" v-if="!isMore">
              没有更多了
            </div>
          </ul>
          <div v-else class="clean">
            <div>
              <p>这里很干净</p>
              <p>什么都没有^_^|||</p>
            </div>
          </div>
        </div>
        <div class="userset-viwe" v-if="tabIndex === 5">
          <ul>
            <li>
              <div class="input-wrap">
                <label>
                  昵称:
                  <input type="text" v-model="userEdit.nickName" />
                </label>
              </div>
              <el-button
                type="primary"
                :size="'mini'"
                @click="saveEdit(0)"
                :loading="loading === 0"
                >保存</el-button
              >
            </li>
            <li>
              <div class="input-wrap">
                <label>
                  邮箱:
                  <input type="text" v-model="userEdit.email" />
                </label>
              </div>
              <el-button
                type="primary"
                :size="'mini'"
                @click="saveEdit(1)"
                :loading="loading === 1"
                >保存</el-button
              >
            </li>
            <li>
              <div class="label">性别:</div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="男"
                  v-model="userEdit.gender"
                />
                男
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="女"
                  v-model="userEdit.gender"
                />
                女
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="保密"
                  v-model="userEdit.gender"
                />
                保密
              </label>
              <el-button
                type="primary"
                :size="'mini'"
                @click="saveEdit(2)"
                :loading="loading === 2"
                >保存</el-button
              >
            </li>
            <li>
              <div class="input-wrap">
                <label>
                  网址:
                  <input type="text" v-model="userEdit.site" />
                </label>
              </div>
              <el-button
                type="primary"
                :size="'mini'"
                @click="saveEdit(3)"
                :loading="loading === 3"
                >保存</el-button
              >
            </li>
            <li>
              <div class="input-wrap">
                <label>
                  签名:
                  <input type="text" v-model="userEdit.autograph" />
                </label>
              </div>
              <el-button
                type="primary"
                :size="'mini'"
                @click="saveEdit(4)"
                :loading="loading === 4"
                >保存</el-button
              >
            </li>
            <li class="pass">
              <label>
                <span>密码:</span>
                <div>
                  <input
                    type="password"
                    placeholder="原密码"
                    v-model="oldPassword"
                  />
                  <input
                    type="password"
                    placeholder="新密码"
                    v-model="newPassword"
                  />
                  <input
                    type="password"
                    placeholder="重复新密码"
                    v-model="repeatPassword"
                  />
                </div>
              </label>
              <el-button
                type="primary"
                :size="'mini'"
                @click="savePsaaword(5)"
                :loading="loading === 5"
                >保存</el-button
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PersonaCenter',
  data () {
    return {
      tabIndex: 0,
      // 用户信息修改表单
      userEdit: {
        nickName: '',
        email: '',
        gender: '',
        site: '',
        autograph: ''
      },
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      userAvatar: '',
      userThumb: '',
      userSelf: false,
      author: {},
      loading: '',
      publish: '', // 发布
      favorites: '', // 收藏
      attentions: '', // 关注
      fans: '', // 粉丝
      publishLimit: 5,
      favoritesLimit: 5,
      attentionsLimit: 5,
      fansLimit: 5,
      isMore: true,
      moreLoading: false,
      isAttention: false, // 是否关注
      isAttentionLoading: false, // 关注loading
      deleteLoading: false // 删除loading
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 关注与取消
    async attention (path) {
      this.isAttentionLoading = true
      if (!this.$store.state.isLogin) {
        this.isAttentionLoading = false
        this.$store.commit('changeLoginBox', true)
        this.$message.error('登陆后才能关注哦!')
        return
      }
      try {
        const { data: res } = await this.axios.put('api/users/' + path + '/' + this.author._id)
        this.isAttention = res.isAttention
        this.isAttentionLoading = false
      } catch (err) {
        this.isAttentionLoading = false
        this.$message.error('操作失败了!--! 请刷新后重试, 或联系站长')
      }
    },
    async uploadImg (e) {
      const file = e.target.files[0]
      const formdata = new FormData()
      formdata.append('image', file)
      try {
        const { data: res } = await this.axios({
          url: 'api/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res[0].image
      } catch (err) {
        this.$message.error('图片上传失败')
        return null
      }
    },
    async delImg (cate) {
      let fileName = ''
      if (cate === 'userAvatar') {
        fileName = this.userAvatar.split('uploads/')[1]
      } else if (cate === 'userThumb') {
        fileName = this.userThumb.split('uploads/')[1]
      }
      try {
        await this.axios.delete('api/deletefile/' + fileName)
      } catch (err) {
        this.$message.error('图片切换或删除失败')
      }
    },
    // 切换选项卡
    async checkbox (index, flag) {
      if (flag) {
        this.moreLoading = true
      }
      this.isMore = true
      if (index === 1) {
        const { data: res } = await this.axios.get('api/posts/findAuthor/' + this.author._id + '?limit=' + this.publishLimit)
        if (res.length === this.publish.length) {
          if (flag) {
            this.isMore = false
          }
        } else {
          this.publish = res
        }
      }
      if (index === 2) {
        const { data: res } = await this.axios.get('api/posts/findFavorites/' + this.author._id + '?limit=' + this.favoritesLimit)
        if (res.length === this.favorites.length) {
          if (flag) {
            this.isMore = false
          }
        } else {
          this.favorites = res
        }
      }
      if (index === 3) {
        const { data: res } = await this.axios.get('api/users/findAttention/' + this.author._id + '?limit=' + this.attentionsLimit)
        if (res.length === this.attentions.length) {
          if (flag) {
            this.isMore = false
          }
        } else {
          this.attentions = res
        }
      }
      if (index === 4) {
        const { data: res } = await this.axios.get('api/users/findFans/' + this.author._id + '?limit=' + this.fansLimit)
        if (res.fans.length === this.fans.length) {
          if (flag) {
            this.isMore = false
          }
        } else {
          this.fans = res.fans
        }
      }
      this.tabIndex = index
      this.moreLoading = false
    },
    // 加载更多
    getmroe (index) {
      if (index === 1) {
        this.publishLimit += 5
      }
      if (index === 2) {
        this.favoritesLimit += 5
      }
      if (index === 3) {
        this.attentionsLimit += 5
      }
      if (index === 4) {
        this.fansLimit += 5
      }
      this.checkbox(index, true)
    },
    deleteArticle (id) {
      this.$messageBox.confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        showClose: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.deleteLoading = true
        try {
          await this.axios.delete('api/posts/' + id)
          const { data: res } = await this.axios.get('api/posts/findAuthor/' + this.author._id + '?limit=' + this.publishLimit)
          this.publish = res
          this.deleteLoading = false
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.checkbox(1, false)
        } catch (err) {
          this.deleteLoading = false
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
          this.checkbox(1, false)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 关注列表取消关注
    async cancleAttentions (id) {
      this.loading = 6
      if (!this.userSelf) {
        this.loading = ''
        return
      }
      try {
        const { data: res } = await this.axios.put('api/users/cancelAttention/' + id)
        if (!res.isAttention) {
          this.attentionsLimit -= 5
          this.checkbox(3)
        }
        this.loading = ''
      } catch (err) {
        this.loading = ''
        this.$message.error('操作失败了!--! 请刷新后重试, 或联系站长')
      }
    },
    async changeAvatar (e) {
      if (this.userAvatar && this.userAvatar !== 'http://localhost:3000/assets/img/defaultAvatar.png') {
        await this.delImg('userAvatar')
      }
      const newAvatar = await this.uploadImg(e)
      const nweUserInfo = await this.updateUser({
        avatar: newAvatar,
        nickName: this.userInfo.nickName,
        email: this.userInfo.email
      })
      this.userAvatar = newAvatar
      this.author = nweUserInfo
      this.$store.commit('changeuserInfo', nweUserInfo)
    },
    async changeThumb (e) {
      if (this.userThumb && this.userThumb !== 'http://localhost:3000/assets/img/defaultthumb.jpg') {
        await this.delImg('userThumb')
      }
      const newThumb = await this.uploadImg(e)
      const nweUserInfo = await this.updateUser({
        thumb: newThumb,
        nickName: this.userInfo.nickName,
        email: this.userInfo.email
      })
      this.userThumb = newThumb
      this.author = nweUserInfo
      this.$store.commit('changeuserInfo', nweUserInfo)
    },
    async updateUser (obj) {
      try {
        if (this.userSelf) {
          const { data: res } = await this.axios.put('api/users/' + this.userInfo._id, obj)
          this.author = res
          this.$store.commit('changeuserInfo', res)
          return res
        }
      } catch (err) {
        this.$message.error(err.message)
      }
    },
    async saveEdit (index) {
      this.loading = index
      try {
        const newUserForm = await this.updateUser(this.userEdit)
        this.userEdit.nickName = newUserForm.nickName
        this.userEdit.email = newUserForm.email
        this.userEdit.gender = newUserForm.gender
        this.userEdit.site = newUserForm.site
        this.userEdit.autograph = newUserForm.autograph
        this.$message.success('保存信息成功')
        this.loading = ''
      } catch (error) {
        this.loading = ''
      }
    },
    async savePsaaword (obj, index) {
      this.loading = index
      try {
        // const newUserForm = await this.updateUser(obj)

        this.$message.success('保存信息成功')
        this.loading = ''
      } catch (error) {
        this.loading = ''
      }
    }
  },
  async created () {
    try {
      const { data: res } = await this.axios.get('api/login/status')
      if (res.isLogin && res.userInfo._id === this.$route.params.id) {
        this.userSelf = true
        this.author = res.userInfo
        this.userAvatar = res.userInfo.avatar ? res.userInfo.avatar : 'http://localhost:3000/assets/img/defaultAvatar.png'
        this.userThumb = res.userInfo.thumb ? res.userInfo.thumb : 'http://localhost:3000/assets/img/defaultthumb.jpg'
        this.userEdit.nickName = res.userInfo.nickName
        this.userEdit.email = res.userInfo.email
        this.userEdit.gender = res.userInfo.gender
        this.userEdit.site = res.userInfo.site
        this.userEdit.autograph = res.userInfo.autograph
      } else {
        try {
          const { data: res } = await this.axios.get('api/users/' + this.$route.params.id)
          this.author = res
          this.userAvatar = res.avatar ? res.avatar : 'http://localhost:3000/assets/img/defaultAvatar.png'
          this.userThumb = res.thumb ? res.thumb : 'http://localhost:3000/assets/img/defaultthumb.jpg'
        } catch (error) {
          this.$message.error('查询用户失败')
        }
      }
      const { data: response } = await this.axios.get('api/users/isAttention/' + this.author._id)
      this.isAttention = response.isAttention
    } catch (err) {
      this.$message.error(err.message)
    }
  }
}
</script>

<style lang="less" scoped>
.more {
  display: block;
  text-align: center;
  padding: 10 / 40rem 0 !important;
  font-size: 14px;
  color: #409eff;
}
.nomore {
  color: #304430;
}
#personaCenter {
  max-width: 1440px;
  margin: 0 auto;
  .user-header {
    .user-info {
      display: flex;
      align-items: flex-end;
      position: relative;
      bottom: 30px;
      padding: 0 30px 30px 30px;
      background-color: #fff;
      box-sizing: border-box;
      button {
        margin-left: 20px;
        margin-bottom: 15px;
      }
      .username-wrap {
        margin-bottom: 15px;
      }
      .autograph {
        background-color: #f3f3f3;
        padding: 3px 5px;
        font-size: 14px;
        margin-top: 15px;
      }
      .username {
        font-size: 24px;
        font-weight: 700;
      }
    }
    .user-avatar {
      margin-right: 20 / 40rem;
      z-index: 2;
      position: relative;
      label {
        position: absolute;
        top: 0;
        left: 0;
        width: 115px;
        height: 115px;
        text-align: center;
        line-height: 110px;
        color: #fff;
        opacity: 0;
        transition: all 0.3s;
        font-size: 13px;
        cursor: pointer;
        input {
          display: none;
        }
      }
      label:hover {
        background-color: rgba(0, 0, 0, 0.1);
        opacity: 1;
      }
      .el-avatar {
        border: 5px solid #fff;
      }
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
.user-main {
  display: flex;
  margin-top: -20px;
  align-items: flex-start;
  .left-bar {
    width: 20%;
    background-color: #fff;
    ul {
      li {
        border-bottom: 1px solid #f3f3f3;
        a {
          display: flex;
          justify-content: space-between;
          padding: 15px 5px;
          i {
            font-size: 24px;
          }
          .btn {
            display: flex;
            align-items: center;
            i {
              color: #409eff;
            }
            span {
              margin-left: 8px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .detauls {
    width: 80%;
    margin-left: 15px;
    border-radius: 8px;
    height: inherit;
    li {
      border-bottom: 1px solid #f3f3f3;
    }
    .overview-viwe {
      ul {
        li {
          padding: 15px 10px;
          span:nth-last-of-type(1) {
            padding-left: 10px;
          }
        }
      }
    }
    .publish-viwe,
    .favorites-viwe {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
      }
      li > div:nth-of-type(1) {
        width: 80%;
      }
      li > div:nth-of-type(2) {
        width: 20%;
      }
      .btn-wrap {
        text-align: right;
      }
      .count {
        padding-left: 8px;
        font-size: 13 / 40rem;
        color: #c1c1c1;
        display: flex;
        justify-content: flex-start;
        div {
          margin: 5 /40rem 3 /40rem 0;
        }
        i {
          font-size: 13 / 40rem;
          margin-right: 1px;
        }
      }
      a {
        display: block;
        padding: 5px;
        width: 100%;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      a:hover {
        text-decoration: underline;
      }
    }
    .attention-viwe {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        .attention-wrap {
          display: flex;
          align-items: center;
        }
        .attention-user {
          margin-left: 10px;
          a {
            font-size: 18px;
          }
          p {
            background-color: #f3f3f3;
            padding: 2px 5px;
            border-radius: 8px;
            margin-top: 10px;
            font-size: 12px;
          }
        }
      }
    }
    .fans-viwe {
      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px;
      }
      .fans-user {
        margin-left: 10px;
        a {
          font-size: 18px;
        }
        p {
          background-color: #f3f3f3;
          padding: 2px 5px;
          border-radius: 8px;
          margin-top: 10px;
          font-size: 12px;
        }
      }
    }
    .userset-viwe {
      li {
        display: flex;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        input {
          font-size: 15px;
          outline: none;
          border: none;
          border-bottom: 1px dashed #999999;
          color: #999;
          margin-left: 15px;
        }
      }
      .pass {
        label {
          display: flex;
        }
        div {
          display: flex;
          flex-direction: column;
          input {
            margin-top: 15px !important;
          }
        }
      }
    }
  }
  .detauls > div {
    background-color: #fff;
    border-radius: 8px;
  }
}

.user-mask {
  height: 280 / 40rem;
  .nothumb {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 280 /40rem;
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
  .thumb {
    position: relative;
    flex: 3;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #dddddd;
    overflow: hidden;
    z-index: 1;
    height: 280 / 40rem;
    .thumb-show {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 280 /40rem;
      .thumb-tools {
        display: flex;
        position: absolute;
        align-items: center;
        top: 0;
        right: 10px;
        height: 100%;
        i {
          // display: inline-block;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.2);
          padding: 10px 20px;
          font-style: normal;
          border-radius: 8px;
          cursor: pointer;
        }
        input {
          display: none;
        }
      }
      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }
    .upload-thumb {
      height: 280 / 40rem;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      flex-wrap: wrap;
      i {
        font-size: 30px;
        color: #ffffff;
      }
      p {
        color: #ffffff !important;
      }
      input {
        display: none;
      }
      p {
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%, -50%);
        // margin: 15px 60px 0 0;
        font-size: 14px;
        color: #bbb;
        opacity: 0;
        transition: opacity 0.3s;
      }
    }
    .upload-thumb:hover p {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 1024px) {
  .user-avatar {
    label:hover {
      opacity: 0 !important;
    }
  }
}

@media screen and (max-width: 768px) {
  .user-main {
    flex-direction: column;
    .left-bar {
      width: 100%;
      margin-top: 5px;
      border-radius: 8px;
      ul {
        li {
          padding-top: 8px;
        }
        justify-content: space-around;
        display: flex;
        a > i {
          display: none;
        }
        a div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        a span {
          margin: 0 !important;
          font-size: 13px !important;
        }
        a i {
          font-size: 20px !important;
        }
      }
    }
    .detauls {
      width: 100%;
      margin: 5px 0 0 0;
      .publish-viwe,
      .favorites-viwe {
        a {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .btn-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .el-button {
            padding: 2px 3px;
            margin: 0;
          }
          .el-button:nth-of-type(2) {
            margin-top: 8px;
          }
        }
      }
      .attention-viwe,
      .fans-viwe {
        .el-avatar {
          width: 60px !important;
          height: 60px !important;
        }
        .user-name {
          font-size: 14px;
        }
        .btn-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .el-button {
            padding: 2px 3px;
            margin: 0;
          }
          .el-button:nth-of-type(2) {
            margin-top: 8px;
          }
        }
      }
    }
  }
  .user-header {
    .user-info {
      bottom: 20px !important;
      padding: 0 10px 30px !important;
      .username {
        font-size: 18px !important;
      }
      .autograph {
        font-size: 12px !important;
        margin: 0 !important;
      }
    }
  }
  .user-mask {
    height: 150 / 40rem;
    .thumb {
      height: 150 / 40rem;
      .upload-thumb {
        height: 150 / 40rem;
        p {
          opacity: 1;
          font-size: 12px;
        }
        i {
          font-size: 24px;
        }
      }
    }
  }
  .user-avatar {
    .el-avatar {
      width: 80px !important;
      height: 80px !important;
    }
    label {
      width: 80px !important;
      height: 80px !important;
    }
  }
}

@media screen and (max-width: 505px) {
  .thumb-tools {
    right: 10px;
    font-size: 13px;
  }
}
</style>
