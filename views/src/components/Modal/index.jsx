import React, { Component, PropTypes } from 'react'
import cs from 'classnames'
import Mask from '../Mask'
import './modal.scss'

export default class Modal extends Component {
	static defaultProps = {
		show: false,
		noMask: false,
		maskClosable: true,
		noClose: false,
		title: 'Modal',
		cancelText: 'cancel',
		confirmText: 'Ok',
		animateEnter: 'zoomIn',
		animateLeave: 'zoomOut'
	}
	constructor (props) {
		super(props)
		this.state = {
			show : this.props.show
		}
		this.dragFlag = false
		this.startX = 0
		this.startY = 0
		this.enter = this.props.animateEnter || 'zoomIn'
		this.leave = this.props.animateLeave || 'zoomOut'
		let events = ['cancel', 'confirm', 'onKeyboard']
		Array.from(events, (name) => this[name] = this[name].bind(this))
	}
	componentDidMount() {
		document.addEventListener('keydown', this.onKeyboard)
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeyboard)
	}
	onKeyboard(event) {
		if (!this.state.show)
			return false
		
		var code = event.keyCode
		if (code === 27) {
			event.preventDefault()
			this.cancel()
		}
		else if (code === 13) {
			event.preventDefault()
			this.confirm()
		}
	}
	cancel() {
		if (this.props.onCancel) {
			return this.props.onCancel()
		}
		this.close()
	}
	confirm() {
		if (this.props.onConfirm) {
			return this.props.onConfirm()
		}
		this.close()
	}
	toggle(bool) {
		let newState = bool === undefined ? !this.state.show : bool
		this.setState({
			show : newState
		})
	}
	close() {
		this.toggle(false)
	}
	open() {
		this.toggle(true)
	}
	render() {
		let styles = {}

		let { width, top, role } = this.props

		if (width) {
			styles.width = typeof width === 'number' ? `${width}px` : width
		}

		if (top) {
			styles.top = typeof top === 'number' ? `${top}px` : top
		}

		let wrapClass = cs('Modal-Wrap', {
			hide: !this.state.show
		})

		let modalClass = cs('Modal', this.props.className, role ? `Modal-${role}` : '')

		return (
			<div ref={(ref) => this.wrap = ref } className={wrapClass}>
				{ this.props.noMask || <Mask show={this.state.show} onclick={() => this.props.maskClosable && this.cancel()} /> }
				<div ref={(ref) => this.modal = ref } className={modalClass} style={styles}>
					{ this.props.noClose || <i className="iconfont icon-close Modal-Close" onClick={this.cancel}></i> }
					{
						this.props.header || (
							<div className="Modal-Header">
								{ this.props.title }
							</div>
						)
					}
					<div className="Modal-Body">{this.props.children}</div>
					{
						this.props.footer || (
							<div className="Modal-Footer">
								<button className="Modal-Cancel-Btn" onClick={this.cancel}>{ this.props.cancelText }</button>
								<button className="Modal-Comfirm-Btn" onClick={this.confirm}>{ this.props.confirmText }</button>
							</div>
						)
					}
				</div>
			</div>
		)
	}
}

Modal.propTypes = {
	children: PropTypes.any,
	show: PropTypes.bool,
	role: PropTypes.string,
	className: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	noMask: PropTypes.bool,
	maskClosable: PropTypes.bool,
	noClose: PropTypes.bool,
	title: PropTypes.string,
	cancelText: PropTypes.string,
	confirmText: PropTypes.string,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	top: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	header: PropTypes.object,
	footer: PropTypes.object,
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func,
	animateEnter: PropTypes.string,
	animateLeave: PropTypes.string
}