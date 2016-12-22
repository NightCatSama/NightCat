import React, { Component } from 'react'

export default class Product extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		return (
			<div>
				<h1 style={{ textAlign: 'center', marginTop: '100px' }}>I'm Product!</h1>
			</div>
		);
	}
}

Product.propTypes = {
}