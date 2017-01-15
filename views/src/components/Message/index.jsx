import React, { Component, PropTypes } from 'react'
import cs from 'classnames'
import style from './message'

export default class Message extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		const status_map = {
			'loading': 'loading',
			'success': 'success',
			'error': 'error',
			'warning': 'warning'
		}
		let classNames = cs(style['message'] || 'message', this.props.status)
		let iconClass = cs('iconfont', `icon-${status_map[this.props.status || 'warning']}`)
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
	message: '',
	status: ''
}
