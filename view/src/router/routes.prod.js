// const Page = r => require.ensure([], () => r(require('@/views/fe/index')), 'home')
import Page from '@/views/fe/index'

const Home = r => require.ensure([], () => r(require('@/views/fe/home')), 'home')
const ArticleList = r => require.ensure([], () => r(require('@/views/fe/articleList')), 'home')
const ArticleDetail = r => require.ensure([], () => r(require('@/views/fe/articleDetail')), 'article')
const Links = r => require.ensure([], () => r(require('@/views/fe/links')), 'links')
const About = r => require.ensure([], () => r(require('@/views/fe/about')), 'about')
const User = r => require.ensure([], () => r(require('@/views/fe/user')), 'user')

const SetPassword = r => require.ensure([], () => r(require('@/views/common/setPassword')), 'setPassword')
const ActiveEmail = r => require.ensure([], () => r(require('@/views/common/activeEmail')), 'activeEmail')
const Sign = r => require.ensure([], () => r(require('@/views/common/sign')), 'sign')

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
