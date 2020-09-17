<template>
  <div id="emoji">
    <div
      id="textarea"
      contenteditable="true"
      placeholder="写下你的评论..."
      @focus="toMyComment"
      @blur="formatText"
      @input="formatText"
    ></div>
    <div class="emoji-switch">
      <i class="iconfont icon-smiling" @click="changeEmojiShow"></i>
      <div id="emojiList" v-if="emojiShow">
        <button
          class="emoji-icon"
          v-for="(item, index) in emojiList"
          :key="index"
          @click="selectEmoji(item.src)"
        >
          <img :src="item.src" class="emoji-img" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Emoji',
  // 获取父组件的值,用 v-html 实现双向绑定
  // 然鹅实现双向绑定后, 光标无法定位到最后 !--!
  // props: ['myComment'],
  data () {
    return {
      emojiList: [
        { src: require('../../assets/images/emoji/e100.gif') },
        { src: require('../../assets/images/emoji/e102.gif') },
        { src: require('../../assets/images/emoji/e104.gif') },
        { src: require('../../assets/images/emoji/e110.gif') },
        { src: require('../../assets/images/emoji/e111.gif') },
        { src: require('../../assets/images/emoji/e112.gif') },
        { src: require('../../assets/images/emoji/e113.gif') },
        { src: require('../../assets/images/emoji/e114.gif') },
        { src: require('../../assets/images/emoji/e120.gif') },
        { src: require('../../assets/images/emoji/e132.gif') },
        { src: require('../../assets/images/emoji/e139.gif') },
        { src: require('../../assets/images/emoji/e140.gif') },
        { src: require('../../assets/images/emoji/e141.gif') },
        { src: require('../../assets/images/emoji/e142.gif') },
        { src: require('../../assets/images/emoji/e144.gif') },
        { src: require('../../assets/images/emoji/e148.gif') },
        { src: require('../../assets/images/emoji/e149.gif') },
        { src: require('../../assets/images/emoji/e151.gif') },
        { src: require('../../assets/images/emoji/e152.gif') },
        { src: require('../../assets/images/emoji/e153.gif') },
        { src: require('../../assets/images/emoji/e154.gif') },
        { src: require('../../assets/images/emoji/e179.gif') },
        { src: require('../../assets/images/emoji/e180.gif') },
        { src: require('../../assets/images/emoji/e181.gif') }
      ],
      range: '',
      emojiShow: false
    }
  },
  methods: {
    keepLastIndex (obj) {
      if (window.getSelection) { // ie11 10 9 ff safari
        obj.focus() // 解决ff不获取焦点无法定位问题
        this.range = window.getSelection()// 创建range
        this.range.selectAllChildren(obj)// range 选择obj下所有子内容
        this.range.collapseToEnd()// 光标移至最后
      } else if (document.selection) { // ie10 9 8 7 6 5
        this.range = document.selection.createRange()// 创建选择对象
        // var range = document.body.createTextRange();
        this.range.moveToElementText(obj)// range定位到obj
        this.range.collapse(false)// 光标移至最后
        this.range.select()
      }
    },
    selectEmoji (emoji) {
      const textarea = document.getElementById('textarea')
      if (!this.range) {
        textarea.focus()
        textarea.blur()
      }
      const emojiNode = document.createElement('span')
      emojiNode.innerHTML = `<img src="${emoji}" />`
      // 选中区域文本
      // 删除选中区
      this.range.deleteContents()
      // 在光标处插入新节点
      this.range.insertNode(emojiNode)
      window.getSelection().removeAllRanges() // 清除选中状态
      this.keepLastIndex(textarea)
    },
    formatText () {
      // 解决末尾换行 无法删除的问题
      // 并获取range对象
      this.range = window.getSelection().getRangeAt(0)
      const textarea = document.getElementById('textarea')
      if (textarea.innerHTML === '<br>' || textarea.innerHTML === '<div><br></div>') {
        textarea.innerHTML = ''
      }
      // 自定义事件将值传递给父组件
      this.$emit('comments', textarea.innerHTML)
    },
    toMyComment () {
      // 解决只插入一个表情时,myComment无法获取到内容的问题
      const textarea = document.getElementById('textarea')
      this.$emit('comments', textarea.innerHTML)
    },
    changeEmojiShow () {
      this.emojiShow = !this.emojiShow
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (e.target.className !== 'iconfont icon-smiling' && e.target.className !== 'emoji-icon' && e.target.className !== 'emoji-img') {
        this.emojiShow = false
      }
    })
  }
}
</script>

<style lang="less">
#emoji {
  position: relative;
}
#textarea {
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
  font-size: 15px;
  background-color: #fff;
  span {
    img {
      width: 20px;
      height: 20px;
      vertical-align: bottom;
    }
  }
}
#textarea:empty:before {
  content: '写下你的评论...';
  color: gray;
}
#textarea:focus:before {
  content: none;
}
.emoji-switch {
  position: absolute;
  bottom: -33px;
  margin-left: 15px;
  i {
    font-size: 24px;
    cursor: pointer;
  }
}
#emojiList {
  position: absolute;
  top: 33px;
  left: -20px;
  width: 240px;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1;
  .emoji-icon {
    cursor: pointer;
    border: 1px solid #f5f5f5;
    background-color: #fff;
  }
}
#emojiList::before {
  content: '';
  position: absolute;
  top: -12px;
  left: 25px;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0; /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
  line-height: 0; /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
  border-width: 6px;
  border-style: solid dashed dashed dashed; /*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
  border-color: transparent transparent #d0d0d0 transparent;
}
@media screen and (max-width: 1024px) {
}

@media screen and (max-width: 768px) {
  #textarea {
    margin-left: 0;
    height: 80px;
    font-size: 14px;
  }
  .emoji-switch {
    margin-left: 0;
    bottom: -31px;
  }
  #emojiList {
    left: 0;
  }
  #emojiList::before {
    left: 6px;
  }
}

@media screen and (max-width: 505px) {
  #textarea {
    height: 50px;
    font-size: 13px;
  }
  // #emojiList {
  //   width: 300px;
  // }
}
</style>
