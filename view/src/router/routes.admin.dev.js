import Admin from '@/admin/'
import Login from '@/admin/login'

export default {
  path: '/admin',
  component: Admin,
  children: [{
    path: '',
    name: 'Admin-Login',
    component: Login
  }]
}

