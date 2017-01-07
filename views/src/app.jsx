import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import 'stylesheets/common/reset'
import 'stylesheets/app'

class App extends Component {
	constructor(props) {
	    super(props)
	}
	render() {
		return (
			<span>
				<div ref="container" className="container">
					{ this.props.children }
				</div>
			</span>
		)
	}
}

const mapStateToProps = (state) => {
	return {store: state}
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)

App.propTypes = {
	children: PropTypes.any,
	actions: PropTypes.any
}
