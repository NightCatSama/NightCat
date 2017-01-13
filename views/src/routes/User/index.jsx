import React, { Component, PropTypes } from 'react'
import Menu from 'components/Menu/'
// import cs from 'classnames'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import './styles'

class Sign extends Component {
	constructor (props) {
		super(props)
		this.state = {
		}
		this.offsetView = this.offsetView.bind(this)
	}
	componentDidMount() {
		/*  根据AccessToken获取用户基础信息  */
	}
	offsetView() {
		this.refs.view.classList.toggle('offset')
	}
	render() {
		return (
			<span>
				<div ref="view" className="user-view">
					{ this.props.children }
				</div>
				<Menu ref="menu" showUserGroup={false} callback={this.offsetView} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Sign)

Sign.propTypes = {
	children: PropTypes.any,
	actions: PropTypes.any,
	history: PropTypes.any,
	location: PropTypes.any
}

Sign.contextTypes = {
	router: React.PropTypes.any.isRequired
}