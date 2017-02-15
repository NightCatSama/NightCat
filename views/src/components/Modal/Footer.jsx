import React, { Component, PropTypes } from 'react'

import './modal.scss'

export default class Footer extends Component {
	constructor (props) {
		super(props)
	}
	render() {
		return (
			<div className="Modal-Footer" style={this.props.style || {}}>
				{this.props.children}
			</div>
		)
	}
}

Footer.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object
}