import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
// import cs from 'classnames'

import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

const games = [{
	name: 'Factory',
	isPC: true,
	path: 'single-games/factory',
	img: require('images/factory.png'),
	description: '将输入变量加工成对应的输出变量的游戏\n（编译环境取决你的浏览器）'
}]

const isPC = !/(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone)/i.test(navigator.userAgent)

class List extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.games = games.filter((game) => game.isPC === isPC)
	}
	jumpGame(path) {
		this.context.router.push(path)
	}
	render() {
		return (
			<div ref="view" className="single-games-list-view">
				<h2 className="title">
					Single Games
				</h2>
				<ul className="games-list">
					{
						this.games.length ?
						this.games.map((game, i) => (
							<li key={i} className="game-item">
								<div className="left-content">
									<img src={game.img} alt="game img" />
								</div>
								<div className="right-content">
									<h1>{game.name}</h1>
									<small>{game.description}</small>
									<Link to={game.path}>点击进入</Link>
								</div>
							</li>
						))
						:
						(
							<li>
								No Game ：(
							</li>
						)
					}
				</ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(List)

List.propTypes = {
	actions: PropTypes.object
}

List.contextTypes = {
	router: React.PropTypes.any.isRequired
}