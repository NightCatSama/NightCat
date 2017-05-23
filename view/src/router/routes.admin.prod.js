const Admin = r => require.ensure([], () => r(require('@/admin/index')), 'admin')
const Login = r => require.ensure([], () => r(require('@/admin/login')), 'admin')

export default {
  path: '/admin',
  name: 'Admin',
  component: Admin,
  children: [{
    path: '',
    name: 'Admin-Login',
    component: Login
  }]
}

