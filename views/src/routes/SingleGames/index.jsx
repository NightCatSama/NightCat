import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

class SingleGames extends Component {
	constructor (props) {
		super(props)
	}
	render() {
		return (
			<div className="single-games-view">
				{ this.props.children }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {store: state}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleGames)

SingleGames.propTypes = {
	children: PropTypes.any,
	actions: PropTypes.any,
	history: PropTypes.any,
	location: PropTypes.any
}

SingleGames.contextTypes = {
	router: React.PropTypes.any.isRequired
}