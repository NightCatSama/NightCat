import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'

import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

const games = [{
	name: 'Factory',
	type: 'PC',
	description: '通过编写各个处理器来加工'
}]

class List extends Component {
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
			<div ref="view" className="single-games-list-view">
				<h2 className="title">
					Single Games
				</h2>
				<ul className="games-list">
					{
						games.map((game, i) => (
							<li key={i}>
								<h3>{game.name}</h3>
								<small>{game.description}</small>
							</li>
						))
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