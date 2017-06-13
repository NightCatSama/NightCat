import Page from '@/views/fe/index'
import Home from '@/views/fe/home'
import Article from '@/views/fe/article'

import SetPassword from '@/views/common/setPassword'
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
  path: '/',
  name: 'Page',
  component: Page,
  children: [{
    path: 'article',
    name: 'Article',
    component: Article
  }, {
    path: 'article/:id',
    name: 'OneArticle',
    component: Article
  }]
}]
