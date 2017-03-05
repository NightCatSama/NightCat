import React from 'react'
import { render } from 'react-dom'
import routes from 'router'
import { Provider } from 'react-redux'
import createStore from 'store'
import createInstance from './http'

const store = createStore()
window.axios = createInstance(store)

render(
<Provider store={store}>
	{routes(store)}
</Provider>, document.getElementById('app')
)