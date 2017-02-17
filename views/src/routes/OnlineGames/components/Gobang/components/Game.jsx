import React, { Component, PropTypes } from 'react'

export default class Game extends Component {
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
		return (
			<div>
				<canvas />
			</div>
		)
	}
}

Game.propTypes = {
	socket: PropTypes.object
}