import React from 'react'
import { render } from 'react-dom'
import Root from 'router/route'
import { Provider } from 'react-redux'
import store from 'store'
import axios from './http'

window.axios = axios

render(
<Provider store={store}>
	<Root />
</Provider>, document.getElementById('app')
)