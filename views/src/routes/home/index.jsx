import React, { Component, PropTypes } from 'react'
// import Canvas from '../asset/Canvas/'

import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

class Home extends Component {
	constructor (props) {
		super(props)
	}
	render() {
		return (
			<span>
				<div ref="view" className="home-view">
					<div className="first-screen">
						<section className="info">
							<h1>NightCat</h1>
							<small>- Welcome to NightCat game city -</small>
						</section>
					</div>
					<div className="main hide">
						<section>
							Factory
						</section>
					</div>
				</div>
			</span>
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