import React, { Component, PropTypes } from 'react'

import Canvas from 'asset/Canvas'
import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

const isPC = !/(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone)/i.test(navigator.userAgent)

class Home extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount () {
		const option = isPC ? null : {
			ball_count: 15,
			line_range: 120,
			r_range: [5, 12]
		} 
		setTimeout(() => {
			new Canvas('canvas', option)
		})
	}
	render() {
		return (
			<span>
				<div ref="view" className="home-view">
					<div className="first-screen">
						<section className="info">
							<h1>NightCat</h1>
						</section>
						<canvas id="canvas"></canvas>
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