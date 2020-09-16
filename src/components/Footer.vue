<template>
  <div id="footer">
    <div class="footer-wrap">
      <div class="footer-main">
        <div class="footer-box">
          <div class="footer-title">关于</div>
          <p>本网站旨在交流IT技术</p>
          <p>结交P社或其他游戏圈的朋友</p>
        </div>
        <div class="footer-box">
          <div class="footer-title">联系站长</div>
          <p>
            <i class="iconfont icon-steam"></i>
            欺孀
          </p>
          <p>
            <i class="iconfont icon-qq-copy"></i>
            469338652
          </p>
          <p>
            <i class="iconfont icon-github-fill"></i>
            https://github.com/ZhangXiao-CN
          </p>
        </div>
        <div class="footer-box">
          <div class="footer-title">意见反馈</div>
          <p>469338652@qq.com</p>
          <p>如您遇到什么异常或者有什么建议</p>
          <p>请将您的信息与反馈发送到此邮箱</p>
        </div>
      </div>
      <div class="copyright">
        <p>Copyright © 2020 张骁</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less" scoped>
#footer {
  // margin-top: 1000px;
  width: 100%;
  margin-top: auto;
  // position: absolute;
  // bottom: 0;
  // transform: translateY(100%);
}
.footer-wrap {
  margin-top: 20 / 40rem;
  padding-bottom: 10 / 40rem;
  padding-top: 10 / 40rem;
  min-height: 140 / 40rem;
  background-color: #6a6a6a;
  white-space: nowrap;
  text-align: center;
  .footer-main {
    max-width: 1440px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    color: #f3f3f3;
    .footer-box {
      margin-right: 40 / 40rem;
      .footer-title {
        font-size: 15px;
        cursor: pointer;
        border-bottom: 1px solid #ddd;
      }
      p {
        text-align: left;
        margin: 6 / 40rem 0;
        font-size: 13px;
        i {
          font-size: 13px;
        }
      }
    }
    .footer-box:nth-of-type(1) {
      margin-left: 40 / 40rem;
    }
  }
  .copyright {
    text-align: center;
    color: #f5f5f5;
    margin: 5px 0;
  }
}

@media screen and (max-width: 1024px) {
  .footer-box {
    margin-right: 10px !important;
    .footer-title {
      font-size: 13px !important;
    }
    p {
      font-size: 12px !important;
      i {
        font-size: 12px !important;
      }
    }
  }
  .footer-box:nth-of-type(1) {
    margin-left: 10px !important;
  }
}

@media screen and (max-width: 760px) {
  .footer-main {
    flex-direction: column;
    p {
      text-align: center !important;
    }
    .footer-title {
      font-weight: 700;
      border: none !important;
    }
    .footer-box {
      border: none !important;
    }
    .footer-box {
      border-bottom: 1px solid #ddd !important;
      margin: 10px 0;
    }
  }
}
@media screen and (max-width: 505px) {
}
</style>
