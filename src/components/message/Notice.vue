<template>
  <div id="notice">
    <div class="message-wrap" v-loading="messageLoading">
      <div class="message-title">通知</div>
      <ul class="message-list" v-if="noticeList.length > 0">
        <li class="message-item" v-for="item in noticeList" :key="item._id">
          <a
            :href="'#/user/' + item.fromUser._id"
            class="from-user"
            target="_bank"
          >
            <el-avatar
              :src="item.fromUser.avatar ? item.fromUser.avatar : defaultAvatar"
              :size="22"
              class="user-avatar"
            ></el-avatar
            >龙小娇</a
          >
          <span class="messageText">{{ item.messageText }}</span>
          <span> · </span>
          <span>{{ item.createAt | filterDate }}</span>
          <div class="comment-text" v-if="item.fromComment">
            <p v-html="$xss(item.fromComment.content)"></p>
          </div>
          <a
            v-if="item.fromArticle"
            :href="'#/article/' + item.fromArticle._id"
            class="article-title"
            target="_blank"
            >{{ item.fromArticle.title }}</a
          >
        </li>
        <a
          href="javascript:;"
          class="more"
          v-loading="moreLoading"
          @click="getmroe"
          v-if="messagrMroe"
          >加载更多</a
        >
      </ul>
      <div href="javascript:;" class="more nomore" v-if="!messagrMroe">
        没有更多了
      </div>
      <div v-if="noticeList.length === 0" class="clean">
        <div>
          <p>这里很干净</p>
          <p>什么都没有^_^|||</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Notice',
  data () {
    return {
      messageLoading: true,
      messagrMroe: true,
      noticeList: [],
      moreLoading: false,
      messageLimit: 10
    }
  },
  computed: {
    ...mapState(['defaultAvatar', 'isLogin'])
  },
  watch: {
    noticeList () {
      if (this.noticeList.length > 0) {
        this.messageLoading = false
      } else {
        this.messageLoading = true
      }
    }
  },
  methods: {
    async getmroe () {
      this.moreLoading = true
      this.messagrMroe = this.messagrMroe + 10
      try {
        const { data } = await this.axios.get('api/messages/notice?limit=' + this.messageLimit)
        if (this.noticeList.length === data.length) {
          this.messagrMroe = false
        }
      } catch (err) {
        this.$message.error('获取消息失败')
      }
      this.moreLoading = false
    }
  },
  async created () {
    if (!this.isLogin) {
      this.$message('请登录后查看消息!!!')
      this.messageLoading = false
      return
    }
    try {
      const { data } = await this.axios.get('api/messages/notice?limit=' + this.messageLimit)
      console.log(data)
      this.noticeList = data
    } catch (err) {
      this.$message.error('获取消息失败')
    }
  }
}
</script>

<style lang="less" scoped>
.message-wrap {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  border-radius: 8px;
  margin: 15 / 40rem auto;
  padding: 15px;
  padding-bottom: 0;
  margin-bottom: 0;
  max-width: 1440px;
}
.message-title {
  font-size: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f3f3f3;
}
.message-list {
  margin-top: 15px;
}
.message-item {
  padding: 15px 0;
  border-bottom: 1px solid #f3f3f3;
  .user-avatar {
    vertical-align: middle;
    margin-right: 5px;
  }
  .from-user {
    padding-right: 5px;
    font-weight: 700;
  }
  .article-title {
    display: block;
    padding-left: 26px;
    font-style: italic;
    font-size: 14px;
    color: #a2e1d4;
  }
  span {
    font-size: 15px;
  }
}
.comment-text {
  text-align: left;
  position: relative;
  font-size: 14.5px;
  padding: 8px 3px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 8 / 40rem;
  margin-left: 26px;
  margin-right: 5px;
  p {
    padding: 0 5px;
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
.more {
  display: block;
  text-align: center;
  padding: 10 / 40rem 0;
  font-size: 14px;
  color: #409eff;
}
.nomore {
  color: #304430;
}
</style>
