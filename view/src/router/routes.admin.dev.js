import Admin from '@/admin/'
import Home from '@/admin/home'
import Sign from '@/admin/sign'
import User from '@/admin/user'
import Article from '@/admin/article'

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
      path: 'book',
      name: 'Admin-Article',
      component: Article
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
