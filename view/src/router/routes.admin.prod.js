const Admin = r => require.ensure([], () => r(require('@/views/admin/index')), 'admin')
const Home = r => require.ensure([], () => r(require('@/views/admin/home')), 'admin-home')
const User = r => require.ensure([], () => r(require('@/views/admin/user')), 'admin-home')
const Article = r => require.ensure([], () => r(require('@/views/admin/article')), 'admin-article')
const EditArticle = r => require.ensure([], () => r(require('@/views/admin/editArticle')), 'admin-article')
const Tag = r => require.ensure([], () => r(require('@/views/admin/tag')), 'admin-tag')

const Sign = r => require.ensure([], () => r(require('@/views/common/sign')), 'admin-sign')

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
