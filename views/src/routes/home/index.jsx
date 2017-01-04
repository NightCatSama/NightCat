import React, { Component, PropTypes } from 'react'

// import $ from 'jquery'
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
		// webpack proxy test

		// $.ajax({
		// 	url: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000': ''}/aa`,
		// 	method: 'POST',
		// 	success: function(data) {
		// 		console.log(data)
		// 	},
		// 	error: function(err) {
		// 		console.log(err)
		// 	}
		// })
	}
	render() {
		return (
			<div ref="view" className="home-view">
				<section className="info">
					<h1>NightCat</h1>
					<small>- Welcome to NightCat game city -</small>
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