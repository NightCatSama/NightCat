import React, { Component, PropTypes } from 'react'
import Modal from 'components/Modal'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class Tabs extends Component {
	constructor(props) {
		super(props)
		this.state = {
			room_info: this.props.room_info,
		}
		this.toggleModal = this.toggleModal.bind(this)
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	componentDidMount() {
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			room_info: nextProps.room_info
		})
	}
	shouldComponentUpdate(nextProps, nextState) {
		for (let key in nextProps.room_info) {
			if (nextProps.room_info[key] === this.state.room_info[key]) {
				return false
			}
		}
		return true
	}
	componentWillUnmount() {
	}
	/*  切换模态框  */
	toggleModal() {
		this.modal.toggle()
	}
	/*  处理表单  */
	handleChange(e, key) {
		let val = e.target.value
		this.setState({
			room_info: Object.assign({}, this.state.room_info, { [key]: val })
		})
	}
	/*  创建房间  */
	createRoom() {
		if (!this.state.room_info.room_name) {
			return this.notice('房间名不能为空')
		}
		this.toggleModal()
		this.props.createRoom(this.state.room_info)
	}
	render() {
		let modalProps = {
			key: 'modal',
			ref: (ref) => this.modal = ref,
			className: 'myModal',
			title: '创建房间',
			cancelText: '取消',
			confirmText: '创建',
			onCancel: () => this.modal.close(),
			onConfirm: () => this.createRoom()
		}
		return (
			<div>
				<section className="tabs">
					<div className="online-count">
						在线人数：{ this.props.online_count }
					</div>
					<div className="btn-group">
						<button onClick={this.toggleModal}>快速开始</button>
						<button onClick={this.toggleModal}>创建房间</button>
					</div>
				</section>

				<Modal {...modalProps}>
					<div className="form-control">
						<label htmlFor="room_name">Room Name：</label>
						<input id="room_name" type="text" placeholder="输入房间名" value={this.state.room_info.room_name} onChange={(e) => this.handleChange(e, 'room_name')} />
					</div>
					<div className="form-control">
						<label htmlFor="password">Password：</label>
						<input id="password" type="text" placeholder="留空则房间不加密" value={this.state.room_info.password} onChange={(e) => this.handleChange(e, 'password')} />
					</div>
				</Modal>
			</div>
		)
	}
}

Tabs.propTypes = {
	room_info: PropTypes.object,
	createRoom: PropTypes.func,
	online_count: PropTypes.number
}