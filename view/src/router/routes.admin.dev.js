import Admin from '@/admin/'
import Home from '@/admin/home'
import Sign from '@/admin/sign'
import User from '@/admin/user'

export default {
  path: '/admin',
  component: Admin,
  children: [{
    path: '',
    name: 'Admin-Home',
    component: Home,
    children: [{
      path: 'user',
      name: 'Admin-User',
      component: User
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
