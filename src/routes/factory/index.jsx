import React, { Component } from 'react'
import cs from 'classnames'

import 'stylesheets/factory'
import Factory from './lib/Factory'

export default class component extends Component {
	constructor(props) {
		super(props)
		this.state = {
			gameProgress: 100,
			gameSign: true,
			game: null
		}
		this.gameStart = this.gameStart.bind(this)
		this.clickFn = this.clickFn.bind(this)
	}
	componentDidMount() {
		this.gameStart()
	}
	gameStart() {
		this.setState({
			gameSign: true,
			game: new Factory(this.refs.factory)
		})
	}
	clickFn() {
		this.state.game.start()
	}
	render() {
		let FactoryClass = cs('factory', {
			show: this.state.gameSign
		})
		let GroupClass = cs('game-prev-group', {
			hide: this.state.gameSign
		})
		return (
			<div ref="view" className="factory-view">
				<div className={GroupClass}>
					<h1 className="game-title">Welcome to Code Factory!</h1>
					<button className="game-btn" onClick={this.gameStart}>Start</button>
				</div>
				<div ref="factory" className={FactoryClass}></div>
				<button className="btn" onClick={this.clickFn}>start</button>
			</div>
		)
	}
}

component.propTypes = {}