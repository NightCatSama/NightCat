import Home from '@/views/home'
import Article from '@/views/article'
import SetPassword from '@/views/setPassword'

export default [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/article',
  name: 'Article',
  component: Article
}, {
  path: '/setPassword',
  name: 'SetPassword',
  component: SetPassword
}]
