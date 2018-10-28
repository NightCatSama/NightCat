import Page from '@/views/fe/index'
import Home from '@/views/fe/home'
import ArticleList from '@/views/fe/articleList'
import ArticleDetail from '@/views/fe/articleDetail'
import Links from '@/views/fe/links'
import About from '@/views/fe/about'
import User from '@/views/fe/user'

import SetPassword from '@/views/common/setPassword'
import ActiveEmail from '@/views/common/activeEmail'
import Sign from '@/views/common/sign'

export default [{
  path: '/',
  name: 'Home',
  component: ArticleList
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
    name: 'ArticleDetail',
    component: ArticleDetail
  }, {
    path: 'links',
    name: 'Links',
    component: Links
  }, {
    path: 'about',
    name: 'About',
    component: About
  }, {
    path: 'user',
    name: 'User',
    component: User
  }, {
    path: 'user/:account',
    name: 'UserDetail',
    component: User
  }]
}]
