import React, { Component, PropTypes } from 'react'
// import Modal from 'components/Modal'
import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'
import io from 'socket.io-client'
import config from 'config'

import Tabs from './components/Tabs'
import Lobby from './components/Lobby'
import Game from './components/Game'
// import getGameMain from './game'

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
		this.createRoom = this.createRoom.bind(this)
	}
	componentDidMount() {
		this.initState()
	}
	componentWillUnmount() {
		console.log('断开websocket链接')
		this.socket.close()
	}
	/*  初始化  */
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
	/*  提取需要传递的用户信息  */
	extractInfo() {
		let { account, avatar, name, gameData } = this.state.userInfo
		return {
			account,
			avatar,
			name,
			gameData
		}
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
	createRoom(data) {
		if (!this.state.room_data.room_name) {
			return this.notice('房间名不能为空')
		}
		this.socket.emit('Create', {
			userInfo: this.extractInfo(this.state.userInfo),
			...data
		})
		this.setState({
			seat: 'room'
		})
	}
	/*  加入房间  */
	joinRoom() {
		console.log('join??')
	}
	render() {
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
				{
					this.state.seat === 'lobby' ?
					<section className="game-lobby-wrap">
						<Tabs online_count={this.state.online_count} room_data={this.state.room_data} createRoom={this.createRoom} />
						<Lobby data={this.state.data} joinRoom={this.joinRoom} />
					</section> :
					<Game socket={this.socket} />
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