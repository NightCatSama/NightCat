import React, { Component, PropTypes } from 'react'

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
		this.props.actions.register(() => {
			console.log('click')
		})
	}
	render() {
		return (
			<div className="home-view">
				<h1 style={{ textAlign: 'center', marginTop: '100px', fontSize: '50px' }}>NightCat</h1>
				<canvas id="cat" className="canvas"></canvas>
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
	actions: PropTypes.any
}