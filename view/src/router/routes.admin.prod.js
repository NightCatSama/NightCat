const Admin = r => require.ensure([], () => r(require('@/admin/index')), 'admin')
const Sign = r => require.ensure([], () => r(require('@/admin/sign')), 'admin-sign')
const Home = r => require.ensure([], () => r(require('@/admin/home')), 'admin-home')
const User = r => require.ensure([], () => r(require('@/admin/user')), 'admin-home')
const Article = r => require.ensure([], () => r(require('@/admin/article')), 'admin-article')
const EditArticle = r => require.ensure([], () => r(require('@/admin/editArticle')), 'admin-article')
const Tag = r => require.ensure([], () => r(require('@/admin/tag')), 'admin-tag')

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
      path: 'article/:type/:id',
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
