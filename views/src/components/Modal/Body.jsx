import React, { Component, PropTypes } from 'react'
import './modal.scss'

export default class Body extends Component {
	constructor (props) {
		super(props)
	}
	render() {
		return (
			<div className="Modal-Body">{this.props.children}</div>
		)
	}
}

Body.propTypes = {
  children: PropTypes.any
}