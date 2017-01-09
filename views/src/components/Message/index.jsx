import React, { Component, PropTypes } from 'react'
import cs from 'classnames'
import style from './message'

export default class Message extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		let classNames = cs(style['message'] || 'message', this.props.status)
		let iconClass = cs('iconfont', `icon-${this.props.status}`)
		return (
			<div className={classNames}>
				<i className={iconClass}></i>
				<span>{ this.props.message }</span>
			</div>
		)
	}
}

Message.propTypes = {
	message: PropTypes.any,
	status: PropTypes.string
}

Message.defaultProps = {
	status: ''
}
