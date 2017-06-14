const Home = r => require.ensure([], () => r(require('@/views/admin/home')), 'admin')
const Admin = r => require.ensure([], () => r(require('@/views/admin/')), 'admin')
const User = r => require.ensure([], () => r(require('@/views/admin/user')), 'admin')
const Article = r => require.ensure([], () => r(require('@/views/admin/article')), 'admin')
const EditArticle = r => require.ensure([], () => r(require('@/views/admin/editArticle')), 'admin')
const Tag = r => require.ensure([], () => r(require('@/views/admin/tag')), 'admin')

const Sign = r => require.ensure([], () => r(require('@/views/common/sign')), 'sign')

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
