import React, { Component } from 'react'

export default class Home extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		return (
			<div>
				<h1 style={{ textAlign: 'center', marginTop: '100px' }}>I'm Home!</h1>
			</div>
		);
	}
}

Home.propTypes = {
}