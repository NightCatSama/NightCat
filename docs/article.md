# Fragment

```
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

tag_fragment {
  _id: <ObjectId> 标签id
  name: <String> 标签名字
  article: <Array> 该标签下的文章
  count: <Number> 该标签下的文章数量
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

## articles <Query>

> 所有文章的数据，支持分页

### Arguments

```
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

```
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

## getArticleById <Query>

> 根据 id 获取文章

### Arguments

```
id: {
  type: GraphQLID,
  descriptions: '文章 ID'
}
```

### Response

```
{
  ...article_fragment
}
```

# GraphQL Mutation

## addArticle <Mutation>

> 添加文章

### Arguments

```
title: {
  type: new GraphQLNonNull(GraphQLString),
  description: '文章标题'
},
content: {
  type: new GraphQLNonNull(GraphQLString),
  description: '文章内容'
},
cover: {
  type: GraphQLString,
  description: '文章封面'
},
tags: {
  type: new GraphQLList(GraphQLID),
  description: '标签'
}
```

### Response

```
{
  ...article_fragment
}
```

## deleteArticle <Mutation>

> 删除文章

### Arguments

```
id: {
  type: new GraphQLNonNull(GraphQLString),
  description: '文章id'
}
```

### Response

```
{
  ...article_fragment
}
```

## releaseArticle <Mutation>

> 发布或下架文章

### Arguments

```
id: {
  type: new GraphQLNonNull(GraphQLString),
  description: '文章id'
}
```

### Response

```
{
  ...article_fragment
}
```

## updateArticle <Mutation>

> 更新文章

### Arguments

```
id: {
  type: new GraphQLNonNull(GraphQLString),
  description: '文章id'
},
title: {
  type: new GraphQLNonNull(GraphQLString),
  description: '文章标题'
},
content: {
  type: new GraphQLNonNull(GraphQLString),
  description: '文章内容'
},
cover: {
  type: GraphQLString,
  description: '文章封面'
},
tags: {
  type: new GraphQLList(GraphQLID),
  description: '标签'
}
```

### Response

```
{
  ...article_fragment
}
```