import React, { Component, PropTypes } from 'react'
import cs from 'classnames'
import './message'

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
		let classNames = cs('message', this.props.status, {
			show: this.props.show
		})
		let iconClass = cs('iconfont', `icon-${status_map[this.props.status || 'warning']}`)
		return (
			<div className={classNames} style={this.props.styles}>
				<i className={iconClass}></i>
				<span>{ this.props.message }</span>
			</div>
		)
	}
}

Message.propTypes = {
	show: PropTypes.bool,
	styles: PropTypes.object,
	message: PropTypes.any,
	status: PropTypes.string
}

Message.defaultProps = {
	show: false,
	styles: null,
	message: '',
	status: ''
}
