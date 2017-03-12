import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

// import './styles'

class OnlineGames extends Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
		/*  根据AccessToken获取用户基础信息  */
	}
	render() {
		return (
			<div className="online-games-view">
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

export default connect(mapStateToProps, mapDispatchToProps)(OnlineGames)

OnlineGames.propTypes = {
	children: PropTypes.any,
	actions: PropTypes.any,
	history: PropTypes.any,
	location: PropTypes.any
}

OnlineGames.contextTypes = {
	router: React.PropTypes.any.isRequired
}