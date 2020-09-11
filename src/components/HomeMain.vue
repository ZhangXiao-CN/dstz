<template>
  <div ref="HomeMain" id="homeMain" class="clearfix">
    <div class="article-wrap">
      <slot></slot>
    </div>
    <div class="side-bar" id="sideBar" style="top: initial;">
      <div class="comment-news">
        <div class="side-bar-title">
          <i class="iconfont icon-xinxiaoxi"></i>
          <span>最新评论</span>
        </div>
        <ul>
          <li>
            <div class="author">
              <el-avatar src="http://localhost:3000/assets/img/defaultAvatar.png" size="small"></el-avatar>
              <p>欺孀</p>
            </div>
            <div class="comment-text">
              <p>大佬流弊!!!!!!!!!</p>
            </div>
            <div class="comment-from">
              <span class="comment-article">[文章]</span>
              <router-link to="/article">
                <p>来自:亚陆风云V12.0中文版正式发布，适用于1.28.211111111111111111</p>
              </router-link>
            </div>
          </li>
          <li>
            <div class="author">
              <el-avatar src="http://localhost:3000/assets/img/defaultAvatar.png" size="small"></el-avatar>
              <p>欺孀</p>
            </div>
            <div class="comment-text">
              <p>大佬流弊!!!!!!!!!</p>
            </div>
            <div class="comment-from">
              <span class="comment-article">[文章]</span>
              <router-link to="/article">
                <p>来自:亚陆风云V12.0中文版正式发布，适用于1.28.211111111111111111</p>
              </router-link>
            </div>
          </li>
          <li>
            <div class="author">
              <el-avatar src="http://localhost:3000/assets/img/defaultAvatar.png" size="small"></el-avatar>
              <p>欺孀</p>
            </div>
            <div class="comment-text">
              <p>大佬流弊!!!!!!!!!</p>
            </div>
            <div class="comment-from">
              <span class="comment-article">[文章]</span>
              <router-link to="/article">
                <p>来自:亚陆风云V12.0中文版正式发布，适用于1.28.211111111111111111</p>
              </router-link>
            </div>
          </li>
          <li>
            <div class="author">
              <el-avatar src="http://localhost:3000/assets/img/defaultAvatar.png" size="small"></el-avatar>
              <p>欺孀</p>
            </div>
            <div class="comment-text">
              <p>大佬流弊!!!!!!!!!</p>
            </div>
            <div class="comment-from">
              <span class="comment-article">[文章]</span>
              <router-link to="/article">
                <p>来自:亚陆风云V12.0中文版正式发布，适用于1.28.211111111111111111</p>
              </router-link>
            </div>
          </li>
          <li>
            <div class="author">
              <el-avatar src="http://localhost:3000/assets/img/defaultAvatar.png" size="small"></el-avatar>
              <p>欺孀</p>
            </div>
            <div class="comment-text">
              <p>大佬流弊!!!!!!!!!</p>
            </div>
            <div class="comment-from">
              <span class="comment-article">[文章]</span>
              <router-link to="/article">
                <p>来自:亚陆风云V12.0中文版正式发布，适用于1.28.211111111111111111</p>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="hot-article">
        <div class="side-bar-title">
          <i class="iconfont icon-praise"></i>
          <span>热门文章</span>
        </div>
        <ul>
          <li>
            <div class="article-info">
              <div class="article-info-title">
                <router-link to="article">亚陆风云V12.0中文版正式发布，适用于1.28.2</router-link>
              </div>
              <div class="article-info-summary">
                <div class="summary">{{text}}</div>
              </div>
              <div class="count">
                <div class="comment-count">
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>5000</span>
                </div>
                <div class="views-count">
                  <i class="iconfont icon-browse_fill"></i>
                  <span>5000</span>
                </div>
                <div class="likes-count">
                  <i class="iconfont icon-like_fill"></i>
                  <span>5000</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="article-info">
              <div class="article-info-title">
                <router-link to="article">亚陆风云V12.0中文版正式发布，适用于1.28.2</router-link>
              </div>
              <div class="article-info-summary">
                <div class="summary">{{text}}</div>
              </div>
              <div class="count">
                <div class="comment-count">
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>5000</span>
                </div>
                <div class="views-count">
                  <i class="iconfont icon-browse_fill"></i>
                  <span>5000</span>
                </div>
                <div class="likes-count">
                  <i class="iconfont icon-like_fill"></i>
                  <span>5000</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="article-info">
              <div class="article-info-title">
                <router-link to="article">亚陆风云V12.0中文版正式发布，适用于1.28.2</router-link>
              </div>
              <div class="article-info-summary">
                <div class="summary">{{text}}</div>
              </div>
              <div class="count">
                <div class="comment-count">
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>5000</span>
                </div>
                <div class="views-count">
                  <i class="iconfont icon-browse_fill"></i>
                  <span>5000</span>
                </div>
                <div class="likes-count">
                  <i class="iconfont icon-like_fill"></i>
                  <span>5000</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="article-info">
              <div class="article-info-title">
                <router-link to="article">亚陆风云V12.0中文版正式发布，适用于1.28.2</router-link>
              </div>
              <div class="article-info-summary">
                <div class="summary">{{text}}</div>
              </div>
              <div class="count">
                <div class="comment-count">
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>5000</span>
                </div>
                <div class="views-count">
                  <i class="iconfont icon-browse_fill"></i>
                  <span>5000</span>
                </div>
                <div class="likes-count">
                  <i class="iconfont icon-like_fill"></i>
                  <span>5000</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="article-info">
              <div class="article-info-title">
                <router-link to="article">亚陆风云V12.0中文版正式发布，适用于1.28.2</router-link>
              </div>
              <div class="article-info-summary">
                <div class="summary">{{text}}</div>
              </div>
              <div class="count">
                <div class="comment-count">
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>5000</span>
                </div>
                <div class="views-count">
                  <i class="iconfont icon-browse_fill"></i>
                  <span>5000</span>
                </div>
                <div class="likes-count">
                  <i class="iconfont icon-like_fill"></i>
                  <span>5000</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="article-info">
              <div class="article-info-title">
                <router-link to="article">亚陆风云V12.0中文版正式发布，适用于1.28.2</router-link>
              </div>
              <div class="article-info-summary">
                <div class="summary">{{text}}</div>
              </div>
              <div class="count">
                <div class="comment-count">
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>5000</span>
                </div>
                <div class="views-count">
                  <i class="iconfont icon-browse_fill"></i>
                  <span>5000</span>
                </div>
                <div class="likes-count">
                  <i class="iconfont icon-like_fill"></i>
                  <span>5000</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="article-info">
              <div class="article-info-title">
                <router-link to="article">亚陆风云V12.0中文版正式发布，适用于1.28.2</router-link>
              </div>
              <div class="article-info-summary">
                <div class="summary">{{text}}</div>
              </div>
              <div class="count">
                <div class="comment-count">
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>5000</span>
                </div>
                <div class="views-count">
                  <i class="iconfont icon-browse_fill"></i>
                  <span>5000</span>
                </div>
                <div class="likes-count">
                  <i class="iconfont icon-like_fill"></i>
                  <span>5000</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="article-info">
              <div class="article-info-title">
                <router-link to="article">亚陆风云V12.0中文版正式发布，适用于1.28.2</router-link>
              </div>
              <div class="article-info-summary">
                <div class="summary">{{text}}</div>
              </div>
              <div class="count">
                <div class="comment-count">
                  <i class="iconfont icon-interactive_fill"></i>
                  <span>5000</span>
                </div>
                <div class="views-count">
                  <i class="iconfont icon-browse_fill"></i>
                  <span>5000</span>
                </div>
                <div class="likes-count">
                  <i class="iconfont icon-like_fill"></i>
                  <span>5000</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeMain',
  data () {
    return {
      text: '我大明天下无敌啊! 这个mod的知名度怕是不需要我多说了吧,哈哈! 由东方朔曼倩大大精心制作的大型mod 华夏国家基本都有专属任务树 增加了...'
    }
  },
  methods: {
  },
  created () {
    // this.$nextTick(this.sideScroll())
  }
}
</script>

<style lang="less" scoped>
#homeMain {
  // display: flex;
  // justify-content: flex-start;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  .article-wrap {
    float: left;
    width: 69.7%;
    // flex: 7;
    margin-right: 30%;
  }
  .article-info {
    a {
      display: block;
      line-height: 1.5;
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    a:hover {
      text-decoration: underline;
    }
    .count {
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
    .article-info-summary {
      display: flex;
      justify-content: space-between;
      font-size: 15 /40rem;
      color: #999;
      line-height: 1.5;
      margin-bottom: 8px;
      .summary {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .bottom-info {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      font-size: 13 / 40rem;
      white-space: nowrap;
      color: #c1c1c1;
      margin-top: 10 / 40rem;
      .article-info-author {
        margin-right: 5 / 40rem;
        a {
          display: block;
          color: #c1c1c1;
          .el-avatar {
            vertical-align: bottom;
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
        }
      }
      .article-attr {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        div {
          margin-right: 10 / 40rem;
        }
        .article-info-category {
          // margin-right: 20 / 40rem;
          a {
            color: #c1c1c1;
          }
        }
        .iconfont {
          margin-right: 2 / 40rem;
        }
        .icon-fenlei {
          margin-right: 1px;
          color: #607d8b;
        }
      }
      i {
        font-size: 13 / 40rem;
      }
    }
  }

  .side-bar {
    // flex: 3;
    width: 29.6%;
    margin-left: 10px;
    position: absolute;
    float: right;
    right: 0;
    .side-bar-title {
      text-align: left;
      border-bottom: 1px solid #f5f5f5;
      font-size: 16 / 40rem;
      padding-bottom: 5 / 40rem;
      margin-bottom: 3px;
      .iconfont {
        margin-right: 5px;
        font-size: 16 / 40rem;
      }
    }
    .hot-article {
      background-color: #fff;
      border-radius: 8px;
      padding: 10px;
      margin-top: 10 / 40rem;
      li {
        margin: 10 / 40rem 0;
        border-bottom: 1px solid #f5f5f5;
      }
      .article-info-title {
        font-size: 14px;
        text-align: left;
        font-weight: 400;
      }
      .article-info-summary {
        font-size: 12px;
        margin: 0;
        text-align: left;
      }
      .count {
        font-size: 11px;
        i {
          font-size: 11px;
        }
      }
    }
    .comment-news {
      background-color: #fff;
      border-radius: 8px;
      padding: 10px 0 10px 10px;
      li {
        border-bottom: 1px solid #f5f5f5;
        padding: 5px;
        .author {
          display: flex;
          justify-content: flex-start;
          text-align: left;
          p {
            font-size: 14px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .el-avatar {
            width: 20px;
            height: 20px;
            vertical-align: bottom;
            margin-right: 5px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .comment-text {
          text-align: left;
          position: relative;
          font-size: 15 / 40rem;
          padding: 8px 3px;
          background-color: #f5f5f5;
          border-radius: 8px;
          margin: 8 / 40rem;
          margin-left: 5px;
          margin-right: 5px;
          p {
            padding-left: 5px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .comment-text::before {
          content: '';
          display: block;
          position: absolute;
          top: -8px;
          left: 25px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #f5f5f5;
          z-index: 2;
        }
        .comment-from {
          display: flex;
          justify-content: flex-start;
          font-size: 12px;
          text-align: left;
          a {
            color: #999;
            overflow: hidden;
            p {
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .comment-article {
            white-space: nowrap;
            color: #409eff;
          }
        }
      }
    }
  }
}
/* responsed */

@media screen and (max-width: 1020px) {
  .article-info {
    flex: 1 !important;
  }
  .article-img {
    flex: 1 !important;
  }
}

@media screen and (max-width: 760px) {
  #homeMain {
    flex-direction: column;
  }
  .article-wrap {
    float: none !important;
    margin-right: 0 !important;
    margin-bottom: 5px !important;
    flex: initial !important;
    width: initial !important;
  }
  .side-bar {
    float: none !important;
    position: relative !important;
    bottom: initial !important;
    top: initial !important;
    right: initial;
    left: initial;
    flex: initial !important;
    width: initial !important;
    margin-left: 0 !important;
  }
}

@media screen and (max-width: 505px) {
  #homeMain {
    flex-direction: column;
  }
  .el-avatar {
    width: 18px !important;
    height: 18px !important;
  }
  .article-category {
    font-size: 13px !important;
  }
  .article-info-title {
    font-size: 13px !important;
  }
  .summary {
    font-size: 11px !important;
  }
  .bottom-info i,
  .bottom-info span {
    font-size: 11px !important;
  }
  .count i,
  .count span {
    font-size: 11px !important;
  }
  .side-bar-title {
    font-size: 13px !important;
    .icon-xinxiaoxi {
      font-size: 13px !important;
    }
  }
  .comment-text {
    font-size: 14px !important;
  }
}
</style>
