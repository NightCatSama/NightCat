import Admin from '@/admin/'
import Home from '@/admin/home'
import Sign from '@/admin/sign'

export default {
  path: '/admin',
  component: Admin,
  children: [{
    path: '',
    name: 'Admin-Home',
    component: Home
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
