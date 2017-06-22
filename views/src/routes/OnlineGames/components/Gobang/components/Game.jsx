import React, { Component, PropTypes } from 'react'
import Modal from 'components/Modal'
import cs from 'classnames'

import Chess from '../gobang'

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			off: 0
		}
		this.timer = null
		this.onKeyboard = this.onKeyboard.bind(this)
	}
	componentDidMount() {
		this.chess = new Chess(this.canvas, {
			addPiece: (index) => this.sendIndex(index)
		})
		document.addEventListener('keydown', this.onKeyboard)
	}
	componentWillUnmount() {
		this.timerEnd()
		this.chess.unbindEvent()
		document.removeEventListener('keydown', this.onKeyboard)
	}
	/*  回车快速 发送消息  */
	onKeyboard(event) {
		var code = event.keyCode
		if (code === 13 && this.msg.value) {
			this.sendMessage()
		}
	}
	/*  发送消息  */
	sendMessage() {
		let { room_data, role } = this.props
		this.props.socket.emit('Message', `【${room_data[role].name}】${this.msg.value}`, 'print')
		this.msg.value = ''
	}
	/*  打印消息  */
	printMsg(msg, type) {
		this.setState({
			messages: [...this.state.messages, {
				type,
				msg
			}]
		}, () => {
			this.messages.scrollTop = 9999
		})
	}
	/*  开始计时  */
	timerBegin() {
		this.timer = setInterval(() => {
			this.setState({
				off: this.state.off + 1
			})
		}, 1000)
	}
	/*  计时结束  */
	timerEnd() {
		clearInterval(this.timer)
		this.timer = null
	}
	/*  游戏开始  */
	start() {
		!this.timer && this.timerBegin()
		this.chess.gameStart()
	}
	/*  游戏结束  */
	over() {
		this.timerEnd()
		this.chess.gameOver()
	}
	/*  切换准备状态  */
	toggleReady() {
		this.props.socket.emit('Ready')
	}
	/*  发送棋子位置  */
	sendIndex(index) {
		this.timerEnd()
		this.props.socket.emit('Play', this.chess.player, index)
	}
	/*  获取棋子位置  */
	getIndex(player, index) {
		this.timerEnd()
		this.setState({
			off: 0
		})
		this.props.room_data.status !== '等待中' && this.timerBegin()
		this.chess.renderPiece(player, index)
		this.chess.status = +!this.chess.status
	}
	/*  根据准备状态返回字  */
	getReadyWord(isReady, isSelf) {
		if (isReady) {
			return isSelf ? '取消准备' : '已准备'
		}
		else {
			return isSelf ? '点击准备' : '未准备'
		}
	}
	/*  格式化时间  */
	formatTime(number, isPlayer) {
		if (isPlayer) {
			number -= this.state.off
		}
		let minute = ~~(number / 60)
		let second = number % 60
		return `${(minute < 10 ? '0' : '') + minute}:${(second < 10 ? '0' : '') + second}`
	}
	setPlayer(obj, role) {
		let isSelf = this.props.role === role
		let btnClass = cs('gobang-player-status', {
			'ready-btn': isSelf,
			'is-ready': obj && obj.ready
		})
		let groupClass = cs('gobang-player-group', {
			'is-self-bout': obj && this.props.room_data.status !== '等待中' && this.props.room_data.player === obj.player && isSelf
		})
		if (isSelf && this.chess) {
			this.chess.player = obj.player
		}
		let player = obj ? (
		<div className={groupClass}>
			<div className="gobang-player">
				<img className="avatar" src={ obj.avatar } />
				<div className="user-info">
					<div className="name">{ obj.name }</div>
					{
						obj.gameData ? (
							<p className="user-game-data">
								<span>游戏次数：{ obj.gameData.all_count }</span>
								<span>胜率：{ obj.gameData.winRate }%</span>
							</p>
						) : (
							<small className="user-game-data">暂无比赛记录</small>
						)
					}
				</div>
			</div>
			<div className="gobang-panel">
				<div className="gobang-panel-item">
					<span>阵营：</span>
					{ obj.player === undefined ? '随机' : (obj.player ? '白旗' : '黑棋') }
				</div>
				<div className="gobang-panel-item">
					<span>剩余时间：</span>
					{ this.formatTime(obj.time, obj.player === this.props.room_data.player) }
				</div>
				<div className="gobang-panel-item">
					<span>得分：</span>
					{ obj.win_number }
				</div>
			</div>
			{
				this.props.room_data.status === '等待中' ?
				<div className={btnClass} onClick={() => isSelf && this.toggleReady()}>{ this.getReadyWord(obj.ready, isSelf) }</div> :
				<div className="gobang-player-status">{ obj.status }</div>
			}
		</div>
		) : (
		<div className="gobang-player-group">
			<div className="gobang-player">
				<div className="avatar placeholder">
					<i className="iconfont icon-cat"></i>
				</div>
				<div className="name">{ role === 'owner' ? '房主跑路了' : '待加入' }</div>
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
		let { room_name, status, owner, challenger } = this.props.room_data
		return (
			<div className="gobang">
				<div className="gobang-room-info">
					<div className="gobang-room-status">
						<span>{ room_name }</span>
						<span className={`gobang-status ${status === '等待中' ? 'waiting' : 'playing'}`}>{ status }</span>
					</div>
					<div className="leave-room-btn" onClick={() => this.modal.toggle()}>离开房间</div>
				</div>
				<div className="gobang-main">
					<div className="gobang-left">
						{ this.setPlayer(owner, 'owner') }
						{ this.setPlayer(challenger, 'challenger') }
					</div>
					<div className="gobang-chessboard" ref={(ref) => this.chessboard = ref}>
						<canvas ref={(ref) => this.canvas = ref}></canvas>
					</div>
					<div className="gobang-control">
						<div className="gobang-messages" ref={(ref) => this.messages = ref}>
							{
								Array.from(this.state.messages, (obj, i) => {
									let className = cs('gobang-msg')
									return (
										<div className={className} key={i}>{ obj.msg }</div>
									)
								})
							}
						</div>
						<div className="gobang-input-group">
							<input ref={(ref) => this.msg = ref} className="gobang-input" type="text" placeholder="Enter 发送消息" />
							<i className="iconfont icon-send" onClick={() => this.sendMessage()}></i>
						</div>
					</div>
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