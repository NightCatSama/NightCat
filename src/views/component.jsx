import React, { Component } from 'react'

export default class component extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		return (
			<div>
				<h1 style={{ textAlign: 'center', marginTop: '100px' }}>I'm component!</h1>
			</div>
		);
	}
}

component.propTypes = {
}