import React, { Component, PropTypes } from 'react'

import $ from 'jquery'

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
		$.ajax({
			url: `${process.env.NODE_ENV === 'development' ? 'http://localhost:80': ''}/miao`,
			method: 'POST',
			data: {
				name: 'nightcat'
			},
			success: function(data) {
				console.log(data)
			},
			error: function(err) {
				console.log(err)
			}
		})
	}
	render() {
		return (
			<div ref="view" className="home-view">
				<div className="first-screen">
					<section className="info">
						<h1>NightCat</h1>
						<small>- Welcome to NightCat game city -</small>
					</section>
				</div>
				<div className="main">
					<section>
						Factory
					</section>
				</div>
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