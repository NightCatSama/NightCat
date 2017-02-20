import React, { Component, PropTypes } from 'react'
import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'
import io from 'socket.io-client'
import config from 'config'

import Tabs from './components/Tabs'
import Lobby from './components/Lobby'
import Game from './components/Game'

class Gobang extends Component {
	constructor (props) {
		super(props)
		this.state = {
			online_count: 0,
			seat: 'lobby',
			data: [],
			room_data: null,
			room_id: '',
			role: '',
			room_info: {
				room_name: `${this.props.userInfo.name}的房间`,
				password: ''
			}
		}
		this.notice = (msg, status = 'error') => this.props.actions.execute('notice', msg, 3000, { status: status })
		this.socket = io(config.socket_host + '/gobang')
		this.socket.emit('Connect', this.props.userInfo)
		this.joinRoom = this.joinRoom.bind(this)
		this.createRoom = this.createRoom.bind(this)
		this.leaveRoom = this.leaveRoom.bind(this)
	}
	componentDidMount() {
		this.initState()
	}
	componentWillUnmount() {
		this.socket.close()
	}
	/*  初始化  */
	initState() {
		this.onEvent()

		this.socket.on('disconnect', () => {
			console.log('与服务其断开')
		})

		this.socket.on('reconnect', () => {
			console.log('重新连接到服务器!')
			this.setState({
				data: []
			})
		})
	}
	/*  提取需要传递的用户信息  */
	extractInfo() {
		let { account, avatar, name, gameData } = this.props.userInfo
		return {
			account,
			avatar,
			name,
			gameData
		}
	}
	/*  监听事件  */
	onEvent() {
		this.socket.on('Rooms', this.getRooms.bind(this))
		this.socket.on('Room', this.getRoomData.bind(this))
		this.socket.on('inRoom', this.intoTheRoom.bind(this))
		this.socket.on('Message', this.getMessage.bind(this))
		this.socket.on('Play', this.addPiece.bind(this))
	}
	/*  加载更新所有房间信息  */
	getRooms(data) {
		this.setState({
			...data
		})
	}
	/*  获取单个房间信息  */
	getRoomData(data) {
		this.setState({
			...data
		})
	}
	/**
	 * 进入房间
	 * @param  {object} room_data  单个房间信息
	 * @param  {string} room_id    房间id
	 * @param  {string} role       角色 ['owner', 'challenger' [, 'audience']]
	 * @return {null}
	 */
	intoTheRoom({room_data, room_id, role}) {
		this.setState({
			seat: 'room',
			room_data,
			room_id,
			role
		})
	}
	/**
	 * 收到消息
	 * @param  {string} type  消息类型
	 * @param  {string} msg   消息主体
	 * @return {null}
	 */
	getMessage({type, msg}) {
		switch(type) {
			case 'error':
				this.notice(msg)
				break
			case 'success':
				this.notice(msg, 'success')
				break
			case 'print':
				this.refs.gobang && this.refs.gobang.printMsg(msg)
				break
			case 'start':
				if (this.refs.gobang) {
					this.refs.gobang.printMsg(msg)
					this.refs.gobang.start()
				}
				break
			case 'end':
				if (this.refs.gobang) {
					this.refs.gobang.printMsg(msg)
					this.refs.gobang.over()
				}
				break
			default:
				break
		}
	}
	/*  下一枚棋子  */
	addPiece(player, index) {
		let gobang = this.refs.gobang
		gobang && gobang.getIndex(player, index)
	}
	/*  切换模态框  */
	toggleModal() {
		this.modal.toggle()
	}
	/*  创建房间  */
	createRoom(data) {
		if (!this.state.room_info.room_name) {
			return this.notice('房间名不能为空')
		}
		this.socket.emit('Create', {
			userInfo: this.extractInfo(this.props.userInfo),
			...data
		})
	}
	/*  申请加入房间  */
	joinRoom(room_id, password, role) {
		this.socket.emit('Join', {
			room_id,
			password,
			userInfo: this.extractInfo(this.props.userInfo)
		})
	}
	/*  离开房间  */
	leaveRoom() {
		this.socket.emit('Leave')
		this.setState({
			seat: 'lobby',
			room_data: null,
			room_id: ''
		})
	}
	render() {
		let userInfo = this.props.userInfo
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
				{
					this.state.seat === 'lobby' ?
					<section className="game-lobby-wrap">
						<Tabs online_count={this.state.online_count} room_info={this.state.room_info} createRoom={this.createRoom} />
						<Lobby data={this.state.data} joinRoom={this.joinRoom} />
					</section> :
					<Game ref="gobang" role={this.state.role} room_id={this.state.room_id} room_data={this.state.room_data} socket={this.socket} leaveRoom={this.leaveRoom} />
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { userInfo: state.auth.userInfo }
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Gobang)

Gobang.propTypes = {
	children: PropTypes.any,
	userInfo: PropTypes.object,
	actions: PropTypes.object,
	location: PropTypes.any
}

Gobang.contextTypes = {
	router: React.PropTypes.any.isRequired
}