<template>
  <div id="editor">
    <mavon-editor
      ref="md"
      v-model="article"
      :toolbars="toolbars"
      :placeholder="'开始创作吧(支持MarkDown语法)'"
      :codeStyle="'vs2015'"
      :tabSize="2"
      :fontSize="'16px'"
      :autofocus="false"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      @save="emitSave"
    ></mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data () {
    return {
      article: '',
      imgList: [],
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  methods: {
    // 绑定@imgAdd event
    async $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      try {
        const { data: res } = await this.axios({
          url: 'api/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        this.$refs.md.$img2Url(pos, res[0].image)
        this.imgList.push(res[0].image)
      } catch (err) {
        this.$message.error('图片上传失败')
      }
    },
    $imgDel (pos) {
      try {
        const name = pos[1].name
        const path = pos[0]
        const text = `![${name}](${path})`
        this.article = this.article.replace(text, '')
        this.$message.success('删除图片成功')
      } catch (err) {
        this.$message.error('删除图片失败')
      }
    },
    emitSave () {
      this.$emit('saveEvent')
    }
  }
}
</script>

<style lang="less" scoped>
.v-note-wrapper {
  min-height: 500px;
  box-shadow: none !important;
}

@media screen and (max-width: 1024px) {
}

@media screen and (max-width: 768px) {
  .v-note-wrapper {
    min-height: 400px;
  }
}
@media screen and (max-width: 505px) {
}
</style>
