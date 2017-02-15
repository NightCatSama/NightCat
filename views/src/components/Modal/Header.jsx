import React, { Component, PropTypes } from 'react'
import './modal.scss'

export default class Header extends Component {
	constructor (props) {
		super(props)
	}
	render() {
		return (
			<h3 className="Modal-Header">{this.props.children}</h3>
		)
	}
}

Header.propTypes = {
  children: PropTypes.any
}