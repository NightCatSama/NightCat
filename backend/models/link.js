import mongoose from 'mongoose'

let Schema = mongoose.Schema

let linkSchema = new Schema({
  // 名字
  name: {
    type: String
  },
  // 头像
  avatar: {
    type: String
  },
  // 简述
  bio: {
    type: String
  },
  // 名字
  link: {
    type: String
  }
})

let link = mongoose.model('link', linkSchema)

export default link