import React, { Component, PropTypes } from 'react'
import './styles'

import io from 'socket.io-client'

let socket = io('http://localhost:80/gobang')

export default class Gobang extends Component {
	constructor (props) {
		super(props)
		this.state = {
			rooms: null,
			userInfo: {}
		}
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
		socket.on('rooms', (data) => {
			console.log(data)
			this.setState({
				rooms: data
			})
		})
	}
	createRoom() {

	}
	render() {
		let userInfo = this.state.userInfo
		return (
			<div ref="view" className="gobang-view">
				<section className="user-header">
					<img className="user-avatar" src={ userInfo.avatar } />
					<div className="user-info">
						<h1 className="user-account">{ userInfo.account }</h1>
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