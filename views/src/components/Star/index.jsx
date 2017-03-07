import React, { Component, PropTypes } from 'react'
import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

class Star extends Component {
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
			<div className="star-component">
				{
					Array.from(new Array(this.props.count), (v, i) => {
						return <i className="iconfont icon-star" key={i} ></i>
					})
				}
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

export default connect(mapStateToProps, mapDispatchToProps)(Star)

Star.propTypes = {
	count: PropTypes.number.isRequired,
	actions: PropTypes.object
}