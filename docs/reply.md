# Fragment

```graphql
reply_fragment {
  _id: <ObjectId> id
  comment_id: <ObjectId> 评论id
  target_user: <Object> 回复人 {user_fragment}
  user: <Object> 发表人 {user_fragment}
  content: <String> 回复内容
  created_at: <String> 回复时间
  view: <String> 解析后的回复内容
}

user_fragment {
  _id: <ObjectId> 用户id
  account: <String> 账号
  email: <String> 邮箱
  subscribe: <Boolean> 是否订阅消息回复
  profile: <String> 签名描述
  avatar: <String> 头像
  created_at: <String> 注册时间
  website: <String> 个人网站地址
  github: <String> github
  location: <String> 位置
  admin: <Boolean> 是否管理员
  superAdmin: <Boolean> 是否超级管理员
  resetPwd: <Boolean> 是否重置密码
}
```


# GraphQL Mutation

## addReply <Mutation>

> 添加回复

### Arguments

```graphql
comment_id: {
  type: GraphQLID,
  description: '评论id'
},
target_user: {
  type: GraphQLID,
  description: '回复人'
},
content: {
  type: GraphQLString,
  description: '评论内容'
}
```

### Response

```graphql
{
  ...reply_fragment
}
```
