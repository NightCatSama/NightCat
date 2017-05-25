const Admin = r => require.ensure([], () => r(require('@/admin/index')), 'admin')
const Sign = r => require.ensure([], () => r(require('@/admin/sign')), 'admin-sign')
const Home = r => require.ensure([], () => r(require('@/admin/home')), 'admin-home')

export default {
  path: '/admin',
  name: 'Admin',
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
