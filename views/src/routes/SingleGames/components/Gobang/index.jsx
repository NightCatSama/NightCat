import React, { Component, PropTypes } from 'react'
import Chess from './gobang'
import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

class Template extends Component {
	constructor(props) {
		super(props)
		this.state = {
			msg: ''
		}
	}
	componentDidMount() {
		let size = document.querySelector('.main').offsetWidth
		let gobang = new Chess(this.checkerboard, {
			size,
			cb: this.gameover.bind(this)
		})

		let bValue = gobang.player
		Object.defineProperty(gobang, 'player', {
			get: () => {
				return bValue
			},
			set: (newValue) => {
				this.changePlayer(newValue)
				bValue = newValue
			},
			enumerable: true,
			configurable: true
		})
	}
	changePlayer(player) {
		this.setState({
			msg: `当前玩家：${player ? '白棋' : '黑旗'}`
		})
	}
	gameover(player) {
		this.setState({
			msg: player === undefined ? '和棋' : `${player ? '白' : '黑'}棋获得了胜利!`
		})
	}
	render() {
		return (
			<div ref="view" className="template-view">
				<div className="main">
					<div className="msg">{ this.state.msg }</div>
					<canvas ref={(ref) => this.checkerboard = ref}></canvas>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {store: state}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Template)

Template.propTypes = {
	actions: PropTypes.object
}