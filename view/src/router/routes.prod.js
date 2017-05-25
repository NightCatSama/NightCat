const Home = resolve => require(['@/views/home'], resolve)
const SetPassword = resolve => require(['@/views/setPassword'], resolve)

export default [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/setPassword',
  name: 'SetPassword',
  component: SetPassword
}]

