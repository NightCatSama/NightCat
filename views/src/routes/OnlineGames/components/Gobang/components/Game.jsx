import React, { Component, PropTypes } from 'react'
import Modal from 'components/Modal'
import cs from 'classnames'

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			user: []
		}
	}
	componentDidMount() {
	}
	componentWillUnmount() {

	}
	/*  打印消息  */
	printMsg(msg, type) {
		this.setState({
			messages: [...this.state.messages, {
				type,
				msg
			}]
		})
	}
	setPlayer(obj, isSelf) {
		let player = obj ? (
		<div className="gobang-player-group">
			<div className="gobang-player">
				<img className="avatar" src={ obj.avatar } />
				<div className="user-info">
					<div className="name">{ obj.name }</div>
					{
						obj.gameData ? (
							<p className="user-game-data">
								游戏次数：{ obj.gameData.count }<br />
								胜率：{ obj.gameData.winRate }
							</p>
						) : (
							<small className="user-game-data">暂无比赛记录</small>
						)
					}
				</div>
			</div>
			{ isSelf && <button className="ready-btn">准备</button> }
		</div>
		) : (
		<div className="gobang-player-group">
			<div className="gobang-player">
				<div className="avatar placeholder">
					<i className="iconfont icon-cat"></i>
				</div>
			</div>
		</div>
		)
		return player
	}
	render() {
		let modalProps = {
			key: 'modal',
			ref: (ref) => this.modal = ref,
			className: 'myModal',
			role: 'confirm',
			cancelText: '不了',
			confirmText: '确定离开',
			onConfirm: () => {
				this.modal.toggle()
				this.props.leaveRoom()
			}
		}
		console.log(this.props.room_data)
		let { room_name, status, owner, challenger } = this.props.room_data
		return (
			<div className="gobang">
				<div className="gobang-room-info">
					<div>
						{ room_name }
						<small className={`gobang-status ${status === '等待中' ? 'waiting' : 'playing'}`}>{ status }</small>
					</div>
					<div className="leave-room-btn" onClick={() => this.modal.toggle()}>离开房间</div>
				</div>
				<div className="gobang-main">
					{ this.setPlayer(owner, this.props.role === 'owner') }
					<div className="gobang-chessboard">
						<canvas id="gobang"></canvas>
					</div>
					{ this.setPlayer(challenger, this.props.role === 'challenger') }
				</div>
				<div className="gobang-control">
					<div className="gobang-messages">
						{
							Array.from(this.state.messages, (obj, i) => {
								let className = cs('gobang-msg', `gobang-msg-${obj.type}`)
								return (
									<div className={className} key={i}>{ obj.msg }</div>
								)
							})
						}
					</div>
					<input className="gobang-input" type="text" placeholder="Enter 发送消息" />
				</div>

				<Modal {...modalProps}>
					<p>
						确定离开房间吗？<br />
						<small>（比赛中离开，结果判定为失败）</small>
					</p>
				</Modal>
			</div>
		)
	}
}

Game.propTypes = {
	role: PropTypes.string,
	leaveRoom: PropTypes.func,
	socket: PropTypes.object,
	room_id: PropTypes.string,
	room_data: PropTypes.object
}