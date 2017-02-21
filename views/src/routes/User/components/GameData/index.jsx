import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import './styles'

class GameData extends Component {
	constructor (props) {
		super(props)
		this.state = {
			account: '',
			email: '',
			info: {
				name: '',
				location: '',
				profile: '',
				avatar: '',
				website: ''
			}
		}
	}
	componentWillMount() {
	}
	render() {
		return (
			<div ref="view" className="game-data-view">
				{
					this.props.gameData ? (
						<div className="game-data">
							<i className="iconfont icon-cat"></i>
							<p>
								游戏场数：{ this.props.gameData.all_count }<br />
								胜利场数：{ this.props.gameData.win_count }<br />
								胜率：{ this.props.gameData.winRate }%
							</p>
						</div>
					) : (
						<p className="no-data">There is no game data.</p>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { gameData: state.auth.userInfo.gameData }
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GameData)

GameData.propTypes = {
	gameData: PropTypes.object,
	actions: PropTypes.any,
	history: PropTypes.any,
	location: PropTypes.any
}

GameData.contextTypes = {
	router: React.PropTypes.any.isRequired
}