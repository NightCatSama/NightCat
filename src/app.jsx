import React, { Component, PropTypes } from 'react'
import Menu from 'components/Menu/'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HeaderBtnAction from 'actions/HeaderBtnAction'

import 'stylesheets/common/reset'
import 'stylesheets/app'

class App extends Component {
	constructor(props) {
	    super(props)
	    this.offsetView = this.offsetView.bind(this)
	}
	offsetView() {
		// this.props.actions.execute('toggleView')
		this.refs.container.classList.toggle('offset')
	}
	render() {
		return (
			<div ref="container" className="container">
				{ this.props.children }
				<Menu ref="menu" callback={this.offsetView} />
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
