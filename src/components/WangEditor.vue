<template>
  <div id="wangEditor">
    <div ref="editor"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'Editor',
  data () {
    return {
      editorContent: ''
    }
  },
  mounted () {
    const preview = () => {
      if (window.previewWindow) {
        window.previewWindow.close()
      }

      window.previewWindow = window.open()
      window.previewWindow.document.write(buildPreviewHtml())
      window.previewWindow.document.close()
    }
    const buildPreviewHtml = () => {
      return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
              color:#626262;
              line-height:25px;
              font-size:14px;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editor.txt.html()}</div>
        </body>
      </html>`
    }
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.customConfig.uploadImgServer = 'http://localhost:3000/api/upload'
    editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 限制图片大小
    editor.customConfig.uploadImgMaxLength = 5 // 限制一次最多能传几张图片
    editor.customConfig.withCredentials = true // withCredentials（跨域传递 cookie）
    editor.customConfig.menus = [ // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    editor.fullscreen = {
      // editor create之后调用
      init: function (editorSelector) {
        const editorDom = document.querySelector('#wangEditor')
        const toolbar = document.querySelector('#wangEditor .w-e-toolbar')
        // 预览
        const weMenuDivPreview = document.createElement('div')
        weMenuDivPreview.setAttribute('class', 'w-e-menu')
        const a = document.createElement('a')
        a.setAttribute('class', '_wangEditor_btn_preview')
        a.href = 'javascript:void(0)'
        a.innerText = '预览'
        a.onclick = function () {
          preview()
        }
        weMenuDivPreview.appendChild(a)
        toolbar.appendChild(weMenuDivPreview)

        // 全屏
        const weMenuDivFullscreen = document.createElement('div')
        weMenuDivFullscreen.setAttribute('class', 'w-e-menu')
        const aFullscreen = document.createElement('a')
        aFullscreen.setAttribute('class', '_wangEditor_btn_fullscreen')
        aFullscreen.href = 'javascript:void(0)'
        aFullscreen.innerText = '全屏'
        aFullscreen.onclick = function () {
          const classList = editorDom.classList
          classList.toggle('fullscreen-editor')
          aFullscreen.textContent = aFullscreen.textContent === '全屏' ? '退出全屏' : '全屏'
        }
        weMenuDivFullscreen.appendChild(aFullscreen)
        toolbar.appendChild(weMenuDivFullscreen)
      }
    }

    editor.create()
    // create之后运行定义的init
    editor.fullscreen.init('#wangEditor')
  }
}
</script>>

<style lang="less" scoped>
.w-e-toolbar {
  flex-wrap: wrap;
  -webkit-box-lines: multiple;
}

.w-e-toolbar .w-e-menu:hover {
  z-index: 10002 !important;
}

.w-e-menu a {
  text-decoration: none;
}

.fullscreen-editor {
  position: fixed !important;
  width: 100% !important;
  height: 100% !important;
  left: 0px !important;
  top: 0px !important;
  background-color: white;
  z-index: 9999;
}

.fullscreen-editor .w-e-text-container {
  width: 100% !important;
  height: 95% !important;
}
</style>
