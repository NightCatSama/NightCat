import React from 'react'
import { render } from 'react-dom'
import Root from './router/route'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()


console.log(document.getElementById('app'))
render(
<Provider store={store}>
	<Root />
</Provider>, document.getElementById('app')
)