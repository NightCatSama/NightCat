# Fragment

```
comment_fragment {
  _id: <ObjectId> id
  article_id: <ObjectId> 文章id
  user: <Object> 评论人 {user_fragment}
  content: <String> 评论内容,
  created_at: <String> 评论时间
  reply: <Array> 回复数据 {reply_fragment}
  floor: <Int> 楼层数
  view: <String> 解析后的评论内容
}

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

pageInfo_fragment {
  startCursor: <String> 返回列表首项的标识
  endCursor: <String> 返回列表尾项的标识
  hasNextPage: <Boolean> 是否有下一页
  hasPrevPage: <Boolean> 是否有上一页
}
```


# GraphQL Query

## comments <Query>

> 该文章下的评论，支持分页

### Arguments

```
article_id: {
  type: GraphQLID,
  description: '文章 id'
},
first: {
  type: GraphQLInt,
  description: '从列表前面获取的个数'
},
last: {
  type: GraphQLInt,
  description: '从列表后面获取的个数'
},
before: {
  type: GraphQLString,
  description: '规定在此标志之前的列表'
},
after: {
  type: GraphQLString,
  description: '规定在此标志之后的列表'
},
offset: {
  type: GraphQLInt,
  description: '规定从该索引开始获取'
}
```

### Response

```
{
  totalCount,
  pageInfo {
    ...pageInfo_fragment
  }
  edges {
    node {
      ...comment_fragment
    }
    cursor
  }
}
```

## indieComments <Query>

> 单独类型下的评论，支持分页（用于留言板等非文章区评论）

### Arguments

```
type: {
  type: GraphQLString,
  description: '类型名称'
},
first: {
  type: GraphQLInt,
  description: '从列表前面获取的个数'
},
last: {
  type: GraphQLInt,
  description: '从列表后面获取的个数'
},
before: {
  type: GraphQLString,
  description: '规定在此标志之前的列表'
},
after: {
  type: GraphQLString,
  description: '规定在此标志之后的列表'
},
offset: {
  type: GraphQLInt,
  description: '规定从该索引开始获取'
}
```

### Response

```
{
  totalCount,
  pageInfo {
    ...pageInfo_fragment
  }
  edges {
    node {
      ...comment_fragment
    }
    cursor
  }
}
```


# GraphQL Mutation

## addComment <Mutation>

> 添加评论

### Arguments

```
article_id: {
  type: GraphQLID,
  description: '文章id'
},
content: {
  type: GraphQLString,
  description: '评论内容'
}
```

### Response

```
{
  ...comment_fragment
}
```

## addIndieComment <Mutation>

> 添加一条特殊评论（用于留言板等非文章区评论）

### Arguments

```
type: {
  type: GraphQLString,
  description: '评论类型'
},
content: {
  type: GraphQLString,
  description: '评论内容'
}
```

### Response

```
{
  ...comment_fragment
}
```
