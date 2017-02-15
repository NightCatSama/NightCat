import React, { Component, PropTypes } from 'react'
import Mask from '../Mask'
import './modal.scss'

export default class Modal extends Component {
	constructor (props) {
		super(props)
		this.state = {
			show : false
		}
		this.dragFlag = false
		this.startX = 0
		this.startY = 0
		this.enter = this.props.animateEnter || 'zoomIn'
		this.leave = this.props.animateLeave || 'zoomOut'
		let events = ['toggle', 'open', 'close', 'cancel', 'confirm', 'onKeyboard']
		Array.from(events, (name) => this[name] = this[name].bind(this))
	}
	componentDidMount() {
		let wrap = this.wrap,
			modal = this.modal,
			{ size, role, theme, top, left, width } = this.props

		wrap.classList.add('Modal-Off')

		if (role) {
			switch(role) {
				case 'alert': modal.classList.add('Modal-Alert')
			}
		}

		if (size) {
			switch(size) {
				case 'lg': wrap.style.fontSize = '20px'
				break
				case 'md': wrap.style.fontSize = '14px'
				break
				case 'sm': wrap.style.fontSize = '13px'
				break
				case 'xs': wrap.style.fontSize = '12px'
				break
				default: wrap.style.fontSize = `${size}px`
				break
			}
		}

		if (theme) {
			modal.classList.add('Modal-' + theme)
		}

		if (width) {
			modal.style.width = typeof width === 'number' ? `${width}px` : width
		}

		if (top) {
			modal.style.top = typeof top === 'number' ? `${top}px` : top
		}
		else {
			modal.classList.add('Modal-Vertical')
		}

		if (left) {
			modal.style.left = typeof left === 'number' ? `${left}px` : left
		}
		else {
			modal.classList.add('Modal-Horizontal')
		}

		//键盘绑定事件
		document.addEventListener('keydown', this.onKeyboard)
	}
	shouldComponentUpdate(props, state) {
		if (this.state.show === state.show) return false
		return true
	}
	componentDidUpdate() {
		let wrap = this. wrap
		let modal = this.modal
		if (this.state.show) {
			wrap.classList.remove('Modal-Off')
			modal.classList.add(this.enter)
			setTimeout(() => modal.classList.remove(this.enter), 300)
		}
		else {
			modal.classList.add(this.leave)
			setTimeout(() => {
				wrap.classList.add('Modal-Off')
				modal.classList.remove(this.leave)
			}, 300)
		}
	}
	componentWillUnMount() {
		document.removeEventListener('keydown', this.onKeyboard)
	}
	onKeyboard(event) {
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
			this.props.onCancel()
		}
		this.close()
	}
	confirm() {
		if (this.props.onConfirm) {
			this.props.onConfirm()
		}
		this.close()
	}
	toggle(bool) {
		if (this.preventMultipleClick()) return false
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
	preventMultipleClick() {
		if (this.modal.classList.contains(this.enter) || this.modal.classList.contains(this.leave)) {
			return true
		}
		return false
	}
	render() {
		let styles = this.props.style
		return (
			<div ref={(ref) => this.wrap = ref } className="Modal-Wrap">
				{this.props.noMask || <Mask show={this.state.show} onclick={this.cancel} />}
				<div ref={(ref) => this.modal = ref } className="Modal" style={styles}>
					<span className="Modal-Close" onClick={this.cancel}>×</span>
					{this.props.children}
				</div>
			</div>
		)
	}
}

Modal.propTypes = {
	children: PropTypes.any,
	style: PropTypes.object,
	noMask: PropTypes.bool,
	size: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	top: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	left: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	theme: PropTypes.string,
	role: PropTypes.string,
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func,
	animateEnter: PropTypes.string,
	animateLeave: PropTypes.string
}