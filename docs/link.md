# Fragment

```graphql
link_fragment {
  _id: <ObjectId>  友链 id
  name: <String> 名字
  avatar: <String> 头像
  bio: <String> 简述
  link: <String> 链接
}
```

# GraphQL Query

## links <Query>

> 所有友链

### Response

```graphql
{
  ...link_fragment
}
```

# GraphQL Mutation

## addLink <Mutation>

> 添加友链

### Arguments

```graphql
name: {
  type: GraphQLString,
  description: '名字'
},
avatar: {
  type: GraphQLString,
  description: '头像'
},
bio: {
  type: GraphQLString,
  description: '简述'
},
link: {
  type: GraphQLString,
  description: '链接'
}
```

### Response

```graphql
{
  ...link_fragment
}
```

## removeLink <Mutation>

> 删除友链

### Arguments

```graphql
id: {
  type: GraphQLID,
  description: 'id'
}
```

### Response

```graphql
{
  ...link_fragment
}
```

## updateLink <Mutation>

> 更新友链

### Arguments

```graphql
id: {
  type: GraphQLID,
  description: 'id'
},
name: {
  type: GraphQLString,
  description: '名字'
},
avatar: {
  type: GraphQLString,
  description: '头像'
},
bio: {
  type: GraphQLString,
  description: '简述'
},
link: {
  type: GraphQLString,
  description: '链接'
}
```

### Response

```graphql
{
  ...link_fragment
}
```