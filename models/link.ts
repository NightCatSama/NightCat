import { Schema, Document, model } from 'mongoose'
import { ILink } from 'interfaces/link';

export interface ILinkModel extends ILink, Document {}

let linkSchema = new Schema<ILinkModel>({
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

let link = model<ILinkModel>('link', linkSchema)

export default link