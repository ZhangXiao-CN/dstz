// 创建通知
async function postNotice (obj) {
  try {
    await this.axios.post('api/messages/notice', obj)
  } catch (err) {
    console.log(err)
  }
}

export {
  postNotice
}
