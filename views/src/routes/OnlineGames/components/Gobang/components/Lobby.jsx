import React, { Component, PropTypes } from 'react'

export default class Lobby extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}
	render() {
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
											<img className="avatar" src={ obj.owner.avatar } />
											<div className="name">{ obj.owner.name }</div>
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
												<div className="join-btn name" onClick={this.props.joinRoom}>点击加入</div>
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
			</section>
		)
	}
}

Lobby.propTypes = {
	data: PropTypes.array,
	joinRoom: PropTypes.func
}