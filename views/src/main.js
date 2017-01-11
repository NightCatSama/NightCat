import React from 'react'
import { render } from 'react-dom'
import Root from 'router/route'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'

import axios from 'axios'

window.axios = axios.create({
	baseURL: `${process.env.NODE_ENV === 'development' ? 'http://localhost:80' : ''}`,
	withCredentials: !!process.env.NODE_ENV === 'development'
})

const store = configureStore()

render(
<Provider store={store}>
	<Root />
</Provider>, document.getElementById('app')
)