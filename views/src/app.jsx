import React, { Component, PropTypes } from 'react'
import Message from 'components/Message'
import Menu from 'components/Menu/'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import 'stylesheets/common/reset'
import 'stylesheets/app'

class App extends Component {
	constructor(props) {
	    super(props)
	    this.state = {
			notice: {
				show: false
			},
			menu: {
			}
	    }
	    this.timer = null
		this.offsetView = this.offsetView.bind(this)
	}
	/*  redux注册全局事件  */
	componentWillMount() {
		this.props.actions.register('notice', this.openNotice.bind(this))
		this.props.actions.register('menu', this.setMenu.bind(this))
	}
	componentDidMount() {
		setTimeout(() => this.refs.container.style.display = 'block')
	}
	offsetView() {
		this.refs.view.classList.toggle('offset')
	}
	/*  控制菜单栏  */
	setMenu(bool, options) {
		this.setState({
			menu: {
				show: bool,
				...options
			}
		})
	}
	/*  全局的消息弹窗  */
	openNotice(msg, interval, options) {
		this.setState({
			notice: {
				show: true,
				message: msg,
				...options
			}
		})
		if (interval) {
			this.timer && clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.setState({
					notice: {
						show: false,
						message: msg,
						...options
					}
				})
			}, interval)
		}
	}
	render() {
		return (
			<div ref="container" style={{display: 'none'}}>
				<div ref="view" className="container">
					{ this.props.children }
				</div>
				<Menu ref="menu" {...this.state.menu} callback={this.offsetView} />
				<Message key="Message" {...this.state.notice} />
			</div>
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
