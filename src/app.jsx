import React, { Component, PropTypes } from 'react'
import Header from './components/Header/'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HeaderBtnAction from './actions/HeaderBtnAction'

import './stylesheets/common/reset'
import './stylesheets/app'

class App extends Component {
	constructor(props) {
	    super(props)
	}
	clickFn() {
		this.props.actions.execute()
	}
	render() {
		return (
			<div className="container">
				<Header clickFn={this.clickFn.bind(this)} />
				{ this.props.children }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {store: state}
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(HeaderBtnAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)

App.propTypes = {
	children: PropTypes.any,
	actions: PropTypes.any
}
