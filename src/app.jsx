import React, { Component, PropTypes } from 'react'
import Header from './components/Header/'
import './stylesheets/common/reset'
import './stylesheets/app'

export default class App extends Component {
	constructor (props) {
	    super(props)
	    this.state = {
	    	name: 'NightCat',
	    	description: 'miao~ miao~ miao~'
	    }
	}
	render() {
		return (
			<div>
				<Header />
				<span>{ this.props.children }</span>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.any
}
