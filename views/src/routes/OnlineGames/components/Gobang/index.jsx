import React, { Component, PropTypes } from 'react'
import './styles'

import io from 'socket.io-client'
import config from 'config'

export default class Gobang extends Component {
	constructor (props) {
		super(props)
		this.state = {
			rooms: null,
			userInfo: {}
		}
		this.socket = io(config.socket_host + '/gobang')
		this.createRoom = this.createRoom.bind(this)
	}
	componentDidMount() {
		this.initState()
	}
	initState() {
		axios.get('/getUserInfo')
		.then((res) => {
			this.setState({
				userInfo: res.data
			})
		})

		/*  请求所有房间信息  */
		this.socket.on('Rooms', (data) => {
			console.info(data)
		})

		this.socket.on('disconnect', function() {
			console.log('与服务其断开')
		})

		this.socket.on('reconnect', function() {
			console.log('重新连接到服务器')
		})
	}
	createRoom() {
		/*  创建房间  */
		this.socket.emit('Create', {
			userInfo: this.state.userInfo,
			room_name: '求虐',
			password: 'qweasd'
		})
	}
	render() {
		let userInfo = this.state.userInfo
		return (
			<div ref="view" className="gobang-view">
				<section className="user-header">
					<img className="user-avatar" src={ userInfo.avatar } />
					<div className="user-info">
						<h1 className="user-account">{ userInfo.name }</h1>
						{
							userInfo.gameData ? (
								<p className="user-game-data">
									游戏次数：{ userInfo.gameData.count }<br />
									胜率：{ userInfo.gameData.winRate }
								</p>
							) : (
								<small className="user-game-data">您仍未进行过比赛</small>
							)
						}
					</div>
				</section>
				<button onClick={this.createRoom}>创建房间</button>
			</div>
		)
	}
}

Gobang.propTypes = {
	location: PropTypes.any
}

Gobang.contextTypes = {
	router: React.PropTypes.any.isRequired
}