import React, { Component } from 'react'

export default class About extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		return (
			<div>
				<h1 style={{ textAlign: 'center', marginTop: '100px' }}>I'm About!</h1>
			</div>
		);
	}
}

About.propTypes = {
}