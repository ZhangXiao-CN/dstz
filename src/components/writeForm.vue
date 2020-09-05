<template>
  <div id="writeForm">
    <div class="form">
      <div class="top-form">
        <div class="tag">
          <p class="point">请输入标签,最多可以设置4个</p>
          <div class="tag-tools">
            <div class="tag-title">
              <i class="iconfont icon-tag"></i>
            </div>
            <div class="tag-list">
              <template v-if="tagList.length > 0">
                <el-tag
                  @click="removeTag(index)"
                  size="mini"
                  v-for="( item, index ) in tagList"
                  :key="index"
                >
                  <i class="iconfont icon-icontag"></i>
                  {{item}}
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
                @keyup.13="createTag"
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
            >{{currentCategory.parentTitle}}</el-tag>
            <el-tag
              effect="dark"
              type="warning"
              size="medium"
              v-if="currentCategory && currentCategory.childrenTitle"
              @click="removeSelect"
            >{{currentCategory.childrenTitle}}</el-tag>
          </div>
          <div class="categories-select">
            <select @change="selectCategory" v-model="selectIndex">
              <option value disabled selected id="defaultSelect">分类</option>
              <template v-for="(item, index) in categories">
                <option
                  :value="index"
                  v-if="item.childrenId"
                  :key="item.childrenId"
                >{{item.childrenTitle}}</option>
                <option :value="index" v-else :key="item.parentId">{{item.parentTitle}}</option>
              </template>
            </select>
          </div>
        </div>
        <div class="bottom-btn">
          <p>请尊重自己和别人的时间，不要发布垃圾和广告内容</p>
          <div>
            <el-button type="primary" size="small">保存到草稿箱</el-button>
            <el-button type="primary" size="small">发布</el-button>
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
        <el-input type="textarea" autosize placeholder="标题" v-model="articleTitle"></el-input>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'writeForm',
  data () {
    return {
      thumb: '',
      categories: [],
      selectIndex: '',
      currentCategory: {
        parentId: '',
        parentTitle: '',
        childrenId: '',
        childrenTitle: ''
      },
      tagValue: '',
      tagList: [],
      articleTitle: ''
    }
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
    selectCategory (e) {
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
    }
  },
  mounted: async function () {
    // try {
    const that = this
    const { data: res } = await this.axios.get('/api/categories')
    console.log(res)
    res.forEach(function (item, index) {
      if (item.children.length < 1) {
        // console.log(res.item)
        that.categories.push({ parentId: item._id, parentTitle: item.title })
      } else {
        item.children.forEach(function (childrenitem, index) {
          that.categories.push({
            parentId: item._id,
            parentTitle: item.title,
            childrenId: childrenitem._id,
            childrenTitle: childrenitem.childrenTitle
          })
        })
      }
    })
    // } catch (err) {
    //   this.$message.error('获取分类失败')
    // }
  }
}
</script>>
<style lang="less" scoped>
#writeForm {
  max-width: 1440px;
  margin: 0 auto;
  .editor-container {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0;
    .article-title {
      background-color: #fff;
      border-bottom: 1px solid #ebebeb;
    }
  }
  .form {
    display: flex;
    overflow: hidden;
    justify-content: flex-start;
    margin: 10px 0;
    .thumb {
      position: relative;
      min-height: 300px;
      flex: 3;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      margin-left: 5px;
      border-radius: 8px;
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
      .bottom-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
.thumb-show {
  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  .thumb-tools {
    display: none;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.5);
    i {
      font-size: 30px;
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
  border-top: 1px solid #ebebeb;
  margin-top: 10px;
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
</style>
