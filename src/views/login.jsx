import React, { Component } from 'react'

export default class Login extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		return (
			<div>
				<h1 style={{ textAlign: 'center', marginTop: '100px' }}>I'm Login!</h1>
			</div>
		);
	}
}

Login.propTypes = {
}