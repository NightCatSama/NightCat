const Admin = r => require.ensure([], () => r(require('@/admin/index')), 'admin')
const Sign = r => require.ensure([], () => r(require('@/admin/sign')), 'admin-sign')
const Home = r => require.ensure([], () => r(require('@/admin/home')), 'admin-home')
const User = r => require.ensure([], () => r(require('@/admin/user')), 'admin-user')
const Article = r => require.ensure([], () => r(require('@/admin/article')), 'admin-article')

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

