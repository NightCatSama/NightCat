import React, { Component } from 'react'

export default class Children extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		return (
			<div>
				<h1 style={{ textAlign: 'center', marginTop: '100px' }}>I'm template!</h1>
			</div>
		);
	}
}

Children.propTypes = {
}