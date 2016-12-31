import React, { Component, PropTypes } from 'react'
// import Canvas from '../asset/Canvas/'

import 'stylesheets/home'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

class Home extends Component {
	constructor (props) {
	    super(props)
	}
	componentDidMount() {
		// this.props.actions.register('toggleView', () => {
		// 	this.refs.view.classList.toggle('offset')
		// })
		// this.props.actions.register('isOpenView', () => {
		// 	this.refs.view.classList.contains('offset')
		// })
	}
	render() {
		return (
			<div ref="view" className="home-view">
				<section className="info">
					<h1>NightCat</h1>
					<small>- This is a nothing's website -</small>
				</section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

Home.propTypes = {
	actions: PropTypes.any
}