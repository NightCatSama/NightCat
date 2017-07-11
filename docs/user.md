# Fragment

```
user_fragment {
  _id: <ObjectId> 用户 id
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

## users <Query>

> 所有用户的数据，支持分页

### Arguments

```
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
      ...user_fragment
    }
    cursor
  }
}
```


## user <Query>

> 单个用户数据，当 account 为空时则查询自己的数据

### Arguments

```
account: {
  type: GraphQLString,
  description: '账号'
}
```

### Response

```
{
  ...user_fragment
}
```


# GraphQL Mutation

## login <Mutation>

> 通过账号登录

### Arguments

```
account: {
  type: new GraphQLNonNull(GraphQLString),
  description: '账号'
},
password: {
  type: new GraphQLNonNull(GraphQLString),
  description: '密码'
}
```

### Response

```
{
  ...user_fragment
}
```

## loginByEmail <Mutation>

> 通过邮箱登录

### Arguments

```
email: {
  type: new GraphQLNonNull(GraphQLString),
  description: '邮箱'
},
password: {
  type: new GraphQLNonNull(GraphQLString),
  description: '密码'
}
```

### Response

```
{
  ...user_fragment
}
```

## register <Mutation>

> 账号注册

### Arguments

```
account: {
  type: new GraphQLNonNull(GraphQLString),
  description: '账号'
},
password: {
  type: new GraphQLNonNull(GraphQLString),
  description: '密码'
},
repassword: {
  type: new GraphQLNonNull(GraphQLString),
  description: '再次输入密码'
}
```

### Response

```
{
  ...user_fragment
}
```

## logout <Mutation>

> 退出登录

### Response

```
{
  ...user_fragment
}
```

## setAdmin <Mutation>

> 设置/取消 管理员

### Arguments

```
account: {
  type: new GraphQLNonNull(GraphQLString),
  description: '账号'
}
```

### Response

```
{
  ...user_fragment
}
```

## setPassword <Mutation>

> 修改密码

### Arguments

```
password: {
  type: new GraphQLNonNull(GraphQLString),
  description: '新密码'
}
```

### Response

```
{
  ...user_fragment
}
```

## removeUser <Mutation>

> 修改密码

### Arguments

```
account: {
  type: new GraphQLNonNull(GraphQLString),
  description: '账号'
}
```

### Response

```
{
  ...user_fragment
}
```

## updateUser <Mutation>

> 更新用户资料

### Arguments

```
avatar: {
  type: GraphQLString,
  description: '头像'
},
profile: {
  type: GraphQLString,
  description: '简介'
},
website: {
  type: GraphQLString,
  description: '个人网站'
},
github: {
  type: GraphQLString,
  description: 'github'
},
location: {
  type: GraphQLString,
  description: '地点'
}
```

### Response

```
{
  ...user_fragment
}
```

## setSubscribe <Mutation>

> 设置/取消 订阅消息提醒邮件

### Arguments

```
subscribe: {
  type: GraphQLBoolean,
  description: '是否订阅消息邮件'
}
```

### Response

```
{
  ...user_fragment
}
```

# Post

## sendSignupEmail

> 发送注册邮件

### Params

```
{
  email: <String> 注册邮箱
}
```

## activeEmail

> 激活邮箱

### Params

```
{
  key: <String> 加密后字符串
  email: <String> 注册邮箱
  account: <String> 账号
}
```





