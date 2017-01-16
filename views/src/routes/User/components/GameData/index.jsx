import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'

import './styles'

export default class GameData extends Component {
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
				<p>There is no game data.</p>
			</div>
		)
	}
}

GameData.propTypes = {
	actions: PropTypes.any,
	history: PropTypes.any,
	location: PropTypes.any
}

GameData.contextTypes = {
	router: React.PropTypes.any.isRequired
}