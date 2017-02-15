import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Mask from '../Mask'
import './modal.scss'

export default class Modal extends Component {
	static defaultProps = {
		width: 520,
		top: 100,
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
			show : false
		}
		this.dragFlag = false
		this.startX = 0
		this.startY = 0
		this.enter = this.props.animateEnter || 'zoomIn'
		this.leave = this.props.animateLeave || 'zoomOut'
		let events = ['toggle', 'open', 'close', 'cancel', 'confirm', 'onKeyboard']
		Array.from(events, (name) => this[name] = this[name].bind(this))
		
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	componentDidMount() {
		let wrap = this.wrap,
			{ width, top } = this.props

		wrap.classList.add('Modal-Off')
		
		if (width) {
			this.modal.style.width = typeof width === 'number' ? `${width}px` : width
		}

		if (top) {
			this.modal.style.top = typeof top === 'number' ? `${top}px` : top
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
			setTimeout(() => modal.classList.remove(this.enter), 500)
		}
		else {
			modal.classList.add(this.leave)
			setTimeout(() => {
				wrap.classList.add('Modal-Off')
				modal.classList.remove(this.leave)
			}, 500)
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
	getModalHeader() {

	}
	render() {
		let styles = this.props.style
		return (
			<div ref={(ref) => this.wrap = ref } className="Modal-Wrap">
				{ this.props.noMask || <Mask show={this.state.show} onclick={() => this.props.maskClosable && this.cancel()} /> }
				<div ref={(ref) => this.modal = ref } className="Modal" style={styles}>
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
	style: PropTypes.object,
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