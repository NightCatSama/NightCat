import React, { Component, PropTypes } from 'react'
import Modal from 'components/Modal'

export default class Lobby extends Component {
	constructor(props) {
		super(props)
		this.state = {
			password: ''
		}
		this.room_id = 0
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}
	openPassword(isLock, room_id) {
		if (!isLock) {
			return this.props.joinRoom(room_id)
		}
		this.room_id = room_id
		this.modal.open()
	}
	handleChange(e) {
		this.setState({
			password: e.target.value
		})
	}
	render() {
		let modalProps = {
			key: 'modal',
			ref: (ref) => this.modal = ref,
			className: 'myModal',
			title: '输入房间密码',
			cancelText: '取消',
			confirmText: '确定',
			onCancel: () => this.modal.close(),
			onConfirm: () => {
				this.modal.close()
				this.props.joinRoom(this.room_id, this.state.password)
			}
		}
		let className = this.props.data.length ? 'gobang-list' : 'no-data'
		return (
			<section className={className}>
				{
					this.props.data.length ? (
						Array.from(this.props.data, (obj, i) => {
							return (
								<div className="gobang-item" key={i}>
									<div className="gobang-item-top">
										房间名：{ obj.room_name }<br />
										<small className={`gobang-status ${obj.status === '等待中' ? 'waiting' : 'playing'}`}>{ obj.status }</small>
									</div>
									<div className="gobang-item-main">
										<div className="gobang-item-player">
											<img className="avatar" src={ obj.owner && obj.owner.avatar } />
											<div className="name">{ obj.owner && obj.owner.name }</div>
										</div>
										VS
										{
											obj.challenger ? (
											<div className="gobang-item-player">
												<img className="avatar" src={ obj.challenger.avatar } />
												<div className="name">{ obj.challenger.name }</div>
											</div>
											) : (
											<div className="gobang-item-player">
												<div className="avatar placeholder">
													{ obj.isLock && <i className="iconfont icon-lock"></i> }
												</div>
												<div className="join-btn name" onClick={() => this.openPassword(obj.isLock, obj.owner.account)}>点击加入</div>
											</div>
											)
										}
									</div>
								</div>
							)
						})
					) : (
						<div>
							<i className="iconfont icon-cat-sleep"></i> No Room
						</div>
					)
				}

				<Modal {...modalProps}>
					<div className="form-control">
						<input id="password" type="text" placeholder="请输入密码" value={this.state.password} onChange={(e) => this.handleChange(e) } />
					</div>
				</Modal>
			</section>
		)
	}
}

Lobby.propTypes = {
	data: PropTypes.array,
	joinRoom: PropTypes.func
}