import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './styles'

class GameData extends Component {
	constructor (props) {
		super(props)
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	componentWillMount() {
	}
	render() {
		let { gameData } = this.props.userInfo
		return (
			<div ref="view" className="game-data-view">
				{
					gameData ? (
						<div className="game-data">
							<i className="iconfont icon-cat"></i>
							<p>
								游戏场数：{ gameData.all_count }<br />
								胜利场数：{ gameData.win_count }<br />
								胜率：{ gameData.winRate }%
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

export default GameData

GameData.propTypes = {
	userInfo: PropTypes.object.isRequired
}