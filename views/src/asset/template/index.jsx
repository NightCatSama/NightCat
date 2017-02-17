import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'

import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

class Template extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}
	render() {
		return (
			<div ref="view" className="template-view">
				<h1>
					我是一个路由模板，方便添加至项目
					<small>By NightCat</small>
				</h1>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {store: state}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Template)

Template.propTypes = {
	actions: PropTypes.object
}