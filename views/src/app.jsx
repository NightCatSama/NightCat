import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Message from 'components/Message'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import 'stylesheets/common/reset'
import 'stylesheets/app'

class App extends Component {
	constructor(props) {
	    super(props)
	    this.state = {
			notice: {}
	    }
	    this.timer = null
	}
	/*  redux注册消息弹窗  */
	componentWillMount() {
		this.props.actions.register('notice', this.openNotice.bind(this))
	}
	openNotice(msg, status = 'default', interval = 2000, options) {
		this.setState({
			notice: {
				message: msg,
				status: status,
				options: options
			}
		})
		if (interval) {
			this.timer && clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.setState({
					notice: {}
				})
			}, interval)
		}
	}
	render() {
		return (
			<span>
				<div ref="container" className="container">
					{ this.props.children }
				</div>
				<ReactCSSTransitionGroup
				transitionName="example"
				transitionAppear={true}
				transitionAppearTimeout={0}
				transitionEnterTimeout={0}
				transitionLeaveTimeout={0}>
				{
				this.state.notice.message && <Message key="Message" status={this.state.notice.status} options={this.state.notice.options} message={this.state.notice.message} />
				}
				</ReactCSSTransitionGroup>
			</span>
		)
	}
}

const mapStateToProps = (state) => {
	return {store: state}
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)

App.propTypes = {
	children: PropTypes.any,
	store: PropTypes.object,
	actions: PropTypes.any
}
