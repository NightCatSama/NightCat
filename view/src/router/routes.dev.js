import Page from '@/views/fe/index'
import Home from '@/views/fe/home'
import ArticleList from '@/views/fe/articleList'
import Article from '@/views/fe/article'
import Search from '@/views/fe/search'
import Link from '@/views/fe/link'
import User from '@/views/fe/user'

import SetPassword from '@/views/common/setPassword'
import ActiveEmail from '@/views/common/activeEmail'
import Sign from '@/views/common/sign'

export default [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: 'login',
  name: 'Login',
  meta: {
    to: '/',
    type: 'login',
    login: 'Login',
    register: 'Register'
  },
  component: Sign
}, {
  path: 'register',
  name: 'Register',
  meta: {
    to: '/',
    type: 'register',
    login: 'Login',
    register: 'Register'
  },
  component: Sign
}, {
  path: '/setPassword',
  name: 'SetPassword',
  component: SetPassword
}, {
  path: '/activeEmail',
  name: 'ActiveEmail',
  component: ActiveEmail
}, {
  path: '/',
  name: 'Page',
  component: Page,
  children: [{
    path: 'article',
    name: 'ArticleList',
    component: ArticleList
  }, {
    path: 'article/:id',
    name: 'Article',
    component: Article
  }, {
    path: 'search',
    name: 'Search',
    component: Search
  }, {
    path: 'link',
    name: 'Link',
    component: Link
  }, {
    path: 'user',
    name: 'User',
    component: User
  }, {
    path: 'user/:id',
    name: 'UserDetail',
    component: User
  }]
}]
