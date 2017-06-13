import Admin from '@/views/admin/'
import Home from '@/views/admin/home'
import User from '@/views/admin/user'
import Article from '@/views/admin/article'
import EditArticle from '@/views/admin/editArticle'
import Tag from '@/views/admin/tag'

import Sign from '@/views/common/sign'

export default {
  path: '/admin',
  component: Admin,
  children: [{
    path: '',
    component: Home,
    children: [{
      path: '',
      redirect: { name: 'Admin-User' }
    }, {
      path: 'user',
      name: 'Admin-User',
      component: User
    }, {
      path: 'tag',
      name: 'Admin-Tag',
      component: Tag
    }, {
      path: 'article',
      name: 'Admin-Article',
      component: Article
    }, {
      path: 'article/add',
      name: 'Admin-AddArticle',
      component: EditArticle
    }, {
      path: 'article/edit/:id',
      name: 'Admin-EditArticle',
      component: EditArticle
    }]
  }, {
    path: 'login',
    name: 'Admin-Login',
    meta: {
      to: '/admin',
      type: 'login',
      login: 'Admin-Login',
      register: 'Admin-Register'
    },
    component: Sign
  }, {
    path: 'register',
    name: 'Admin-Register',
    meta: {
      to: '/admin',
      type: 'register',
      login: 'Admin-Login',
      register: 'Admin-Register'
    },
    component: Sign
  }]
}
