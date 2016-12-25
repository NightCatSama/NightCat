import React, { Component } from 'react'
import MyCanvas from '../asset/MyCanvas/'

import '../stylesheets/home'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HeaderBtnAction from '../actions/HeaderBtnAction'

class Home extends Component {
	constructor (props) {
	    super(props)
	    this.canvas = null
	}
	componentDidMount() {
		setTimeout(() => {
			this.canvas = new MyCanvas('canvas')
		}, 0)

		this.props.actions.register(() => {
			this.canvas.toggle()
		})
	}
	render() {
		return (
			<div className="home-view">
				<canvas id="canvas" className="canvas"></canvas>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {store: state}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(HeaderBtnAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

Home.propTypes = {
}