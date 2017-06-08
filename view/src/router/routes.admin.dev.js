import Admin from '@/admin/'
import Home from '@/admin/home'
import Sign from '@/admin/sign'
import User from '@/admin/user'
import Article from '@/admin/article'
import EditArticle from '@/admin/editArticle'
import Tag from '@/admin/tag'

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
    component: Sign
  }, {
    path: 'register',
    name: 'Admin-Register',
    component: Sign
  }]
}
