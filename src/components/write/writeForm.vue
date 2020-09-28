<template>
  <div id="writeForm">
    <div class="form">
      <div class="top-form">
        <div class="notice-wrap">
          <p class="notice-title">
            <strong>投稿规则</strong>
          </p>
          <p>
            1、发布文章及回复或评论时请自觉遵守
            <span class="red-text">中华人民共和国各项有关法律法规</span>
          </p>
          <p>2、支持原创,鼓励原创</p>
          <p>
            3、转载文章,必须取得
            <strong>原作者同意,并标明出处及原作者,能够提供相关证明</strong>
          </p>
          <p>4、禁止发布垃圾广告</p>
          <p>
            5、如有违反以上规则,
            <strong>您的文章可能会被删除,或者账户被封停</strong>
          </p>
        </div>
        <div class="tag">
          <p class="point">标签最多只能设置4个哦</p>
          <div class="tag-tools">
            <div class="tag-title">
              <i class="iconfont icon-tag"></i>
            </div>
            <div class="tag-list">
              <template v-if="tagList.length > 0">
                <el-tag
                  @click="removeTag(index)"
                  size="mini"
                  v-for="(item, index) in tagList"
                  :key="index"
                >
                  <i class="iconfont icon-icontag"></i>
                  {{ item }}
                </el-tag>
              </template>
            </div>
            <div class="tag-input">
              <input
                v-model="tagValue"
                type="text"
                placeholder="请输入标签"
                @input="watchValue"
                @blur="createTag"
                @keyup.enter="createTag"
              />
            </div>
          </div>
        </div>
        <div class="categories">
          <div class="categories-title">分类</div>
          <div class="categories-text">
            <el-tag
              effect="dark"
              type="danger"
              v-if="currentCategory && currentCategory.parentTitle"
              @click="removeSelect"
              >{{ currentCategory.parentTitle }}</el-tag
            >
            <el-tag
              effect="dark"
              type="warning"
              size="medium"
              v-if="currentCategory && currentCategory.childrenTitle"
              @click="removeSelect"
              >{{ currentCategory.childrenTitle }}</el-tag
            >
          </div>
          <div class="categories-select">
            <select @change="selectCategory" v-model="selectIndex">
              <option value disabled selected id="defaultSelect">分类</option>
              <template v-for="(item, index) in categories">
                <option
                  :value="index"
                  v-if="item.childrenId"
                  :key="item.childrenId"
                >
                  {{ item.childrenTitle }}
                </option>
                <option :value="index" v-else :key="item.parentId">
                  {{ item.parentTitle }}
                </option>
              </template>
            </select>
          </div>
        </div>
        <div class="bottom-btn">
          <p>请尊重自己和别人的时间，不要发布垃圾和广告内容</p>
          <div>
            <el-button type="primary" size="small" @click="publish(0)"
              >保存到草稿箱</el-button
            >
            <el-button type="primary" size="small" @click="publish(1)"
              >发布</el-button
            >
          </div>
        </div>
      </div>
      <div class="thumb">
        <label v-if="!thumb" class="upload-thumb">
          <i class="iconfont icon-xiazai40"></i>
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/gif"
            @change="uploadImg"
          />
          <p>上传封面</p>
        </label>
        <div class="thumb-show" v-if="thumb">
          <img :src="thumb" />
          <div class="thumb-tools">
            <label>
              <i class="iconfont icon-xiazai40">
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png, image/gif"
                  @change="uploadImg"
                />
              </i>
            </label>
            <i class="iconfont icon-icon--" @click="delImg"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="editor-container">
      <div class="article-title">
        <el-input
          type="textarea"
          autosize
          placeholder="标题"
          v-model="articleTitle"
        ></el-input>
      </div>
      <Editor ref="Editor" @saveEvent="save"></Editor>
    </div>
    <div class="bottom-btn" id="footBtn">
      <div>
        <el-button type="primary" size="small" @click="publish(0)"
          >保存到草稿箱</el-button
        >
        <p>请尊重自己和别人的时间，不要发布垃圾和广告内容</p>
        <el-button type="primary" size="small" @click="publish(1)"
          >发布</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Editor from './Editor'
import { mapState } from 'vuex'
export default {
  name: 'writeForm',
  data () {
    return {
      thumb: '',
      selectIndex: '',
      currentCategory: {
        parentId: '',
        parentTitle: '',
        childrenId: '',
        childrenTitle: ''
      },
      tagValue: '',
      tagList: [],
      articleTitle: '',
      isEditID: ''
    }
  },
  computed: {
    ...mapState(['userInfo', 'categories', 'categoryNav', 'loginBox', 'isLogin'])
  },
  methods: {
    async uploadImg (e) {
      if (this.thumb) {
        await this.delImg()
      }
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
        this.thumb = res[0].image
      } catch (err) {
        this.$message.error('图片上传失败')
      }
    },
    async delImg () {
      const fileName = this.thumb.split('uploads/')[1]
      try {
        await this.axios.delete('api/deletefile/' + fileName)
        this.thumb = ''
      } catch (err) {
        this.$message.error('图片切换或删除失败')
      }
    },
    selectCategory () {
      this.currentCategory = {}
      const index = this.selectIndex
      for (const key in this.categories[index]) {
        this.$set(this.currentCategory, key, this.categories[index][key])
      }
    },
    removeSelect () {
      for (const key in this.currentCategory) {
        this.$set(this.currentCategory, key, '')
      }
      this.selectIndex = ''
    },
    watchValue (e) {
      // const value = this.tagValue
      if (this.tagValue.length >= 20) {
        this.tagValue = this.tagValue.substring(0, 20)
      }
    },
    createTag () {
      if (this.tagList.length < 4 && this.tagValue.trim().length !== 0) {
        this.tagList.push(this.tagValue)
      }
      this.tagValue = ''
    },
    removeTag (index) {
      this.tagList.splice(index, 1)
    },
    async publish (state) {
      if (this.isLogin === false) {
        this.$message.error('登录后才能发布文章哦')
        this.$store.commit('changeLoginBox', true)
        return
      }
      if (this.selectIndex.toString().trim().length === 0) {
        this.$message.error({
          message: '请选择分类',
          type: 'erroe'
        })
        return
      }
      if (this.articleTitle.trim().length < 2) {
        this.$message.error('标题最少两个字符哦')
        return
      }
      if (this.$refs.Editor.article.trim().length === 0) {
        this.$message.error('请输入文章内容')
        return
      }
      const author = this.userInfo._id
      // html
      const html = this.$refs.Editor.$refs.md.d_render
      // 纯文本
      const text = html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
      // 摘要
      const summary = text.substr(0, 70) + '...'
      // 需要删除的图片列表
      const delImgList = []
      // 文章中的图片列表
      const imgList = []
      if (this.$refs.Editor.imgList.length > 0) {
        this.$refs.Editor.imgList.forEach((item) => {
          // 文章中如果查不到该图片,便加入delImgList中删除
          if (this.$refs.Editor.article.indexOf(item) === -1) {
            delImgList.push(item.split('uploads/')[1])
          } else {
            imgList.push(item)
          }
        })
        if (delImgList.length > 0) {
          // 删除delImgList中的图片
          try {
            await this.axios.delete('api/deletefile/' + delImgList.join('-', ','))
            this.thumb = ''
          } catch (err) {
            this.$message.error('图片切换或删除失败')
          }
        }
      }
      const body = {
        author: author, // 作者
        title: this.articleTitle, // 标题
        state: state, // 状态
        content: this.$refs.Editor.article, // markdwon
        text: text, // 纯文本
        html: state === 1 ? html : null, // html
        summary: summary, // 摘要
        category: this.currentCategory.parentId, // 分类
        categoryChilren: this.currentCategory.childrenId ? this.currentCategory.childrenId : null, // 子分类
        thumbnail: this.thumb ? this.thumb : null, // 封面
        tag: this.tagList.length > 0 ? this.tagList : null, // 标签列表
        imgList: imgList // 文章中的图片列表
      }
      try {
        let res = ''
        if (this.isEditID) {
          const { data } = await this.axios.put('api/posts/' + this.isEditID, body)
          res = data
        } else {
          const { data } = await this.axios.post('api/posts', body)
          res = data
        }
        if (state === 1) {
          this.$message.success('文章发布成功')
          this.$router.push({ name: 'home' })
        } else {
          this.$message.close()
          this.$message.success('以保存至草稿箱,请到(个人中心=>发布=>草稿箱)中查看')
        }
        this.isEditID = res._id
      } catch (err) {
        this.$message.error('文章发布失败')
      }
    },
    save () {
      this.publish(0)
    }
  },
  async created () {
    // 无分类数据,发起请求
    if (this.categoryNav.length === 0) {
      const { data: res } = await this.axios.get('api/categories')
      this.$store.commit('changeCategoryNav', res)
    }
    // 无分类列表, 创建分类列表
    if (this.categories.length === 0) {
      const that = this
      this.categoryNav.forEach(function (item, index) {
        if (item.children.length < 1) {
          that.$store.commit('categoriesPush', { parentId: item._id, parentTitle: item.title })
        } else {
          item.children.forEach(function (childrenitem, index) {
            that.$store.commit('categoriesPush', {
              parentId: item._id,
              parentTitle: item.title,
              childrenId: childrenitem._id,
              childrenTitle: childrenitem.childrenTitle
            })
          })
        }
      })
    }
    // 判断是否是编辑状态
    if (this.$route.query.id) {
      if (this.isLogin) {
        const { data: res } = await this.axios.get('api/posts/' + this.$route.query.id)
        if (res.post.author._id === this.userInfo._id) {
          this.articleTitle = res.post.title
          this.thumb = res.post.thumbnail
          this.$refs.Editor.article = res.post.content
          if (res.post.tag && res.post.tag.length > 0) {
            res.post.tag.forEach(item => {
              this.tagList.push(item)
            })
          }
          let category = ''
          if (!res.post.categoryChilren) {
            category = res.post.category && res.post.category.title
          } else {
            res.post.category.children.forEach((item) => {
              if (res.post.categoryChilren === item._id) {
                category = item.childrenTitle && item.childrenTitle
              }
            })
          }
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].parentTitle === category || this.categories[i].childrenTitle === category) {
              this.selectIndex = i
              this.selectCategory()
              break
            }
          }
          this.isEditID = this.$route.query.id
        } else {
          // 作者与登陆用户不匹配禁止编辑
          this.$router.push({ name: 'write' })
        }
      } else {
        // 未登录禁止编辑
        this.$router.push({ name: 'write' })
      }
    }
  },
  components: {
    Editor
  }
}
</script>>
<style lang="less" scoped>
#footBtn {
  display: none;
}
#writeForm {
  max-width: 1440px;
  margin: 0 auto;
  .editor-container {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0;
    .article-title {
      background-color: #fff;
      border-bottom: 1px solid #ebebeb;
      position: relative;
      z-index: 1000;
    }
  }
  .form {
    display: flex;
    overflow: hidden;
    justify-content: flex-start;
    margin: 10px 0;
    max-height: 300px;
    min-height: 300px;
    .thumb {
      position: relative;
      min-height: 200 / 40rem;
      flex: 3;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      margin-left: 5px;
      border-radius: 8px 8px 0 0;
      overflow: hidden;
      .upload-thumb {
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
          color: #bbb;
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
    .top-form {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      flex: 7;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      border-radius: 8px;
      position: relative;
      min-height: 200 / 40rem;
      .bottom-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #fff;
        p {
          font-size: 12px;
          color: #999;
        }
      }
      .notice-wrap {
        padding: 10 / 40rem;
        z-index: 1;
        background-color: #fff;
        p {
          font-size: 14 / 40rem;
          text-align: left;
          .red-text {
            color: red;
          }
        }
      }
    }
  }
}
.thumb-show {
  position: relative;
  width: 100%;
  height: 298px;
  img {
    display: block;
    object-fit: contain;
    width: 100%;
    height: 298px;
  }
  .thumb-tools {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.2);
    i {
      font-size: 20px;
      color: #fff;
      cursor: pointer;
      input {
        display: none;
      }
    }
    i:nth-child(1) {
      margin-right: 10px;
    }
  }
}
.thumb-show:hover .thumb-tools {
  display: flex;
}

.categories {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  background-color: #fff;
  .categories-title {
    white-space: nowrap;
    padding: 15px;
    font-size: 14px;
    color: #999;
    border-right: 1px solid #ebebeb;
  }
  .categories-text {
    width: 100%;
    padding: 8px;
    display: flex;
    align-items: center;
    // span {
    //   font-size: 14px;
    //   display: inline-block;
    //   background-color: #409eff;
    //   box-shadow: inset 0 0 9px rgba(204, 204, 204, 0.39);
    //   padding: 5px 10px;
    //   border-radius: 3px;
    //   cursor: pointer;
    // }
    .el-tag {
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .categories-select {
    padding: 10px 15px;
    select {
      // -webkit-appearance: none;
      outline: none;
      font-family: font-regular, 'Helvetica Neue', sans-serif;
      padding: 5px 10px;
      cursor: pointer;
      box-shadow: inset 0 0 9px rgba(204, 204, 204, 0.39);
      padding-right: 20px;
      text-transform: none;
      border: 1px solid #ebebeb;
      border-radius: 3px;
      color: #555;
      font-size: 13px;
      option {
        font-weight: normal;
        display: block;
        white-space: pre;
        min-height: 1.2em;
        padding: 0px 2px 1px;
      }
      #defaultSelect {
        display: none;
      }
    }
  }
}

.tag {
  background-color: #fff;
  border-top: 1px solid #ebebeb;
  .point {
    text-align: left;
    color: #999;
    font-size: 12px;
    padding: 5px 0 0 10px;
  }
  .tag-tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tag-title {
      white-space: nowrap;
      padding: 8px;
      font-size: 14px;
      color: #999;
      i {
        font-size: 18px;
      }
    }
    .tag-list {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      .el-tag {
        margin-right: 10px;
        cursor: pointer;
        i {
          font-size: 12px;
        }
      }
    }
    .tag-input {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 0 0 8px 0;
      align-self: flex-end;
      input {
        width: 100%;
        height: 100%;
        font-size: 15px;
        outline: none;
        border: none;
        border-bottom: 1px dashed #ebebeb;
        color: #999;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        color: #999;
        font-size: 12px;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 适配火狐 */
        font-size: 12px;
        color: #999;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ 适配火狐 */
        font-size: 12px;
        color: #999;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+  适配ie*/
        font-size: 12px;
        color: #999;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .form {
    margin: 5px 0 !important;
    .bottom-btn {
      display: none !important;
    }
    .tag-tools {
      .tag-title {
        display: none;
      }
      flex-direction: column !important;
      align-items: flex-start;
      .tag-list {
        flex-direction: column !important;
        align-items: flex-start;
        padding-left: 10px !important;
        span {
          margin-top: 5px;
        }
      }
      .tag-input {
        input {
          padding-left: 10px !important;
        }
      }
    }
  }
  #footBtn {
    margin-top: 2px;
    background-color: #fff;
    display: flex !important;
    justify-content: flex-start !important;
    p {
      font-size: 12px;
      color: #999;
    }
    div {
      display: flex;
      width: 100% !important;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
    }
  }
}

.slideImg-enter-active {
  animation: slide-in 0.4s linear;
}
.slideImg-leave-active {
  animation: slide-in 0.4s linear reverse;
}
@keyframes slide-in {
  0% {
    height: 0;
  }
  25% {
    height: 25%;
  }
  50% {
    height: 50%;
  }
  75% {
    height: 75%;
  }
  100% {
    height: 100%;
  }
}

@media screen and (max-width: 768px) {
  .notice-wrap {
    padding: 5px !important;
    p {
      font-size: 12px !important;
    }
  }
  .form {
    margin: 5px 0 !important;
    flex-direction: column !important;
    max-height: initial !important;
    min-height: initial !important;
    .top-form {
      flex: initial !important;
    }
    .thumb {
      // min-height: 300px !important;
      flex: initial !important;
      margin: 5px 0 0 0 !important;
      .upload-thumb {
        min-height: 300 / 40rem !important;
        p {
          opacity: 1 !important;
        }
      }
    }
  }
}

@media screen and (max-width: 505px) {
  .form .thumb {
    // min-height: 300px !important;
    // flex: initial !important;
    // margin: 5px 0 0 0 !important;
    .thumb-show {
      height: 100%;
      img {
        object-fit: fill;
        height: 100%;
      }
    }
    .upload-thumb {
      min-height: 200 / 40rem !important;
      // p {
      //   // opacity: 1 !important;
      // }
    }
  }
  .categories {
    .categories-title {
      font-size: 12px;
      padding: 5px;
      line-height: 32px;
      .categories-text {
        font-size: 12px;
      }
    }
    .categories-select {
      padding: 5px 10px;
      select {
        font-size: 12px !important;
        padding: 5px;
      }
    }
  }
}
</style>
