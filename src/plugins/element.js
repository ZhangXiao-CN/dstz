import Vue from 'vue'
import {
  Button,
  Row,
  Col,
  Card,
  Input,
  Avatar,
  Message,
  Tag,
  Loading,
  Pagination,
  MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Tag)
Vue.use(Loading)
Vue.use(Pagination)
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox
