# Fragment

```graphql
tag_fragment {
  _id: <ObjectId> 标签id
  name: <String> 标签名字
  article: <Array> 该标签下的文章
  count: <Number> 该标签下的文章数量
}

article_fragment {
  _id: <ObjectId> 文章id
  title: <String> 文章标题
  author: <Object> 作者信息 {user_fragment}
  tags: <Array> 标签数据 {tag_fragment}
  content: <String> 文章内容
  cover: <String> 封面图
  release: <Boolean> 是否发布
  comment_count: <Number> 评论数目
  created_at: <String> 注册时间
  update_at: <String> 更新时间
  view: <String> 解析后的内容
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

## tags <Query>

> 所有标签的数据

### Response

```graphql
{
  ...tag_fragment
}
```

## articleByTagId <Query>

> 该标签下的所有文章的数据，支持分页

### Arguments

```graphql
id: {
  type: new GraphQLNonNull(GraphQLString),
  descriptions: '标签id'
},
release: {
  type: GraphQLBoolean,
  descriptions: '是否发布过的文章'
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

```graphql
{
  totalCount,
  pageInfo {
    ...pageInfo_fragment
  }
  edges {
    node {
      ...article_fragment
    }
    cursor
  }
}
```

## articleByTagName <Query>

> 该标签下的所有文章的数据，支持分页

### Arguments

```graphql
name: {
  type: new GraphQLNonNull(GraphQLString),
  descriptions: '标签名字'
},
release: {
  type: GraphQLBoolean,
  descriptions: '是否发布过的文章'
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

```graphql
{
  totalCount,
  pageInfo {
    ...pageInfo_fragment
  }
  edges {
    node {
      ...article_fragment
    }
    cursor
  }
}
```

# GraphQL Mutation

## addTag <Mutation>

> 添加标签

### Arguments

```graphql
name: {
  type: GraphQLString,
  description: '标签名字'
}
```

### Response

```graphql
{
  ...tag_fragment
}
```

## removeTag <Mutation>

> 删除标签

### Arguments

```graphql
name: {
  type: GraphQLString,
  description: '标签名字'
}
```

### Response

```graphql
{
  ...tag_fragment
}
```

## updateTag <Mutation>

> 更新标签

### Arguments

```graphql
id: {
  type: GraphQLID,
  description: 'id'
},
name: {
  type: GraphQLString,
  description: '标签名字'
}
```

### Response

```graphql
{
  ...tag_fragment
}
```
