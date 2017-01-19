import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
// import cs from 'classnames'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import './styles'

class Sign extends Component {
	constructor (props) {
		super(props)
		this.state = {
			userInfo: {}
		}
		this.notice = (msg, interval, options) => this.props.actions.execute('notice', msg, interval, options)
	}
	/*  设置顶部用户信息  */
	componentWillMount() {
		let account = this.context.router.params.account
		if (account) {
			this.loadData(account)
		}
		else {
			this.loadSelfData()
		}
	}
	/*  查看用户的信息  */
	loadData(account) {
		axios.get('/getUserInfoByAccount', {
			params: {
				account: account
			}
		})
		.then((res) => {
			this.setState({
				userInfo: res.data
			})
		})
		.catch((err) => {
			this.notice(err.message, 2000, { status: 'error', styles: { top: 'auto', bottom: '30px' } })
		})
	}
	/*  查看自己的信息  */
	loadSelfData() {
		let status = window.sessionStorage.login_status
		if (!status)
			return false

		status = JSON.parse(status)
		if (status.isLogin) {
			let userInfo = JSON.parse(window.sessionStorage.userInfo)
			this.setState({
				isLogin: true,
				userInfo: {
					account: userInfo.account,
					email: userInfo.email,
					avatar: userInfo.avatar
				}
			})
		}
		else {
			this.context.router.replace('/')
		}
	}
	render() {
		return (
			<div className="user-view">
				<div className="user-header">
					<img className="user-avatar" src={this.state.userInfo.avatar} />
					<h1 className="user-account">{this.state.userInfo.account}</h1>
					<small className="user-email">{this.state.userInfo.email}</small>
				</div>
				<ul className="user-router">
					<li>
						<IndexLink to={`/user${this.context.router.params.account ? ('/' + this.context.router.params.account) : ''}`} activeClassName="active">Information</IndexLink>
					</li>
					<li>
						<Link to={`/user/game-data${this.context.router.params.account ? ('/' + this.context.router.params.account) : ''}`} activeClassName="active">Game Data</Link>
					</li>
				</ul>
				{ this.props.children }
			</div>
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