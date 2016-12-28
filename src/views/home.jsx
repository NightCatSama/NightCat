import React, { Component, PropTypes } from 'react'
import Menu from '../components/Menu/'
import Canvas from '../asset/Canvas/'

import '../stylesheets/home'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HeaderBtnAction from '../actions/HeaderBtnAction'

class Home extends Component {
	constructor (props) {
	    super(props)
	    this.canvas = null
	    this.offsetView = this.offsetView.bind(this)
	}
	componentDidMount() {
		new Canvas('canvas')
		this.props.actions.register(() => {
			console.log('click')
		})
	}
	offsetView() {
		this.refs.view.classList.toggle('offset')
	}
	render() {
		return (
			<div ref="view" className="home-view">
				<section className="info">
					<h1>NightCat</h1>
					<small>- This is a nothing's website -</small>
				</section>
				<Menu callback={this.offsetView} />
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