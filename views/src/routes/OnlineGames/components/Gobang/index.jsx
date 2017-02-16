import React, { Component, PropTypes } from 'react'
import Modal from 'components/Modal'
import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'
import io from 'socket.io-client'
import config from 'config'

import GobangMain from './game'

class Gobang extends Component {
	constructor (props) {
		super(props)
		this.state = {
			online_count: 0,
			seat: 'lobby',
			data: [],
			room_data: {
				room_name: '',
				password: ''
			},
			userInfo: {}
		}
		this.notice = (msg, interval = 2000, status = 'error') => this.props.actions.execute('notice', msg, interval, { status: status })
		this.socket = io(config.socket_host + '/gobang')
		this.joinRoom = this.joinRoom.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.createRoom = this.createRoom.bind(this)
	}
	componentDidMount() {
		this.initState()
	}
	componentWillUnmount() {
		console.log('断开websocket链接~~~')
		this.socket.close()
	}
	initState() {
		axios.get('/getUserInfo')
		.then((res) => {
			this.setState({
				userInfo: res.data,
				room_data: {
					room_name: `${res.data.name}的房间`,
					password: ''
				}
			})
		})

		this.updateRooms()

		this.socket.on('disconnect', function() {
			console.log('与服务其断开')
		})

		this.socket.on('reconnect', function() {
			console.log('重新连接到服务器')
		})
	}
	/*  加载更新所有房间信息  */
	updateRooms() {
		this.socket.on('Rooms', (data) => {
			console.log(data)
			this.setState({
				...data
			})
		})
	}
	/*  切换模态框  */
	toggleModal() {
		this.modal.toggle()
	}
	/*  创建房间  */
	createRoom() {
		if (!this.state.room_data.room_name) {
			return this.notice('房间名不能为空')
		}
		this.modal.close()
		this.socket.emit('Create', {
			userInfo: this.state.userInfo,
			...this.state.room_data
		})
		this.setState({
			seat: 'room'
		})
	}
	/*  加入房间  */
	joinRoom() {

	}
	handleChange(e, key) {
		let val = e.target.value
		this.setState({
			room_data: Object.assign({}, this.state.room_data, { [key]: val })
		})
	}
	render() {
		let modalProps = {
			key: 'modal',
			ref: (ref) => this.modal = ref,
			title: '创建房间',
			cancelText: '取消',
			confirmText: '创建',
			width: 400,
			role: 'confirm',
			onCancel: () => this.modal.close(),
			onConfirm: () => this.createRoom()
		}
		let userInfo = this.state.userInfo
		return (
			<div ref="view" className="gobang-view">
				<section className="user-header">
					<img className="user-avatar" src={ userInfo.avatar } />
					<div className="user-info">
						<h2 className="user-account">{ userInfo.name }</h2>
						{
							userInfo.gameData ? (
								<p className="user-game-data">
									游戏次数：{ userInfo.gameData.count }<br />
									胜率：{ userInfo.gameData.winRate }
								</p>
							) : (
								<small className="user-game-data">暂无比赛记录</small>
							)
						}
					</div>
				</section>
				<section className="tabs">
					<div className="online-count">
						在线人数：{ this.state.online_count }
					</div>
					<div className="btn-group">
						<button onClick={this.toggleModal}>快速开始</button>
						<button onClick={this.toggleModal}>创建房间</button>
					</div>
				</section>
				{
					this.state.data.length ? (
					<section className="gobang-list">
						{ Array.from(this.state.data, (obj, i) => {
							return (
								<div className="gobang-item" key={i}>
									<div className="gobang-top">
										房间名：{ obj.room_name }<br />
										<small className={`gobang-status ${obj.status === '等待中' ? 'waiting' : 'playing'}`}>{ obj.status }</small>
									</div>
									<div className="gobang-main">
										<div className="gobang-player">
											<img className="avatar" src={ obj.owner.avatar } />
											<div className="name">{ obj.owner.name }</div>
										</div>
										VS
										{
											obj.challenger ? (
											<div className="gobang-player">
												<img className="avatar" src={ obj.challenger.avatar } />
												<div className="name">{ obj.challenger.name }</div>
											</div>
											) : (
											<div className="gobang-player">
												<div className="avatar placeholder">
													{ obj.isLock && <i className="iconfont icon-lock"></i> }
												</div>
												<div className="join-btn name" onClick={this.joinRoom}>点击加入</div>
											</div>
											)
										}
									</div>
								</div>
							)
						})
						}
					</section>
					) : (
						<aside className="no-data">
							<i className="iconfont icon-cat-sleep"></i> No Room
						</aside>
					)
				}
				<Modal {...modalProps}>
					<div className="form-control">
						<label htmlFor="room_name">Room Name：</label>
						<input id="room_name" type="text" placeholder="输入房间名" value={this.state.room_data.room_name} onChange={ (e) => this.handleChange(e, 'room_name') } />
					</div>
					<div className="form-control">
						<label htmlFor="password">Password：</label>
						<input id="password" type="text" placeholder="留空则房间不加密" value={this.state.room_data.password} onChange={ (e) => this.handleChange(e, 'password') } />
					</div>
				</Modal>
				{
					this.state.seat === 'room' && GobangMain({
						socket: this.socket,
						room_data: this.state.room_data
					})
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { store: state }
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Gobang)

Gobang.propTypes = {
	children: PropTypes.any,
	actions: PropTypes.object,
	location: PropTypes.any
}

Gobang.contextTypes = {
	router: React.PropTypes.any.isRequired
}