import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Link, IndexLink } from 'react-router'
import './Menu'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

class Menu extends Component {
	constructor (props) {
	    super(props)
	    this.state = {
	    	sideShow: false,
			isLogin: false,
			userInfo: null
	    }
	    this.toggleMenu = this.toggleMenu.bind(this)
	    this.signout = this.signout.bind(this)
	    this.linkClick = this.linkClick.bind(this)
	    this.windowClick = this.windowClick.bind(this)
	}
	/*  判断用户是否已登录  */
	componentWillMount() {
		let status = window.sessionStorage.login_status
		if (!status)
			return false

		status = JSON.parse(status)
		if (status.isLogin) {
			this.setState({
				isLogin: true,
				userInfo: {
					name: status.name,
					profile: status.profile,
					avatar: status.avatar
				}
			})
		}
	}
	/*  绑定全局事件  */
	componentDidMount() {
		document.body.addEventListener('click', this.windowClick, false)
	}
	componentWillUnmount() {
		document.body.removeEventListener('click', this.windowClick, false)
	}
	/*  退出登录  */
	signout() {
		axios.post('/signout', {})
		.then((res) => {
			if (res.data.success) {
				this.props.actions.execute('notice', '退出成功', 'success')
				this.clearWebStorage()
				this.setState({
					isLogin: false,
					userInfo: null
				})
			}
		})
		.catch((err) => console.log(err))
	}
	/*  清除 webstorage  */
	clearWebStorage(data) {
		window.localStorage.removeItem('token')
		window.sessionStorage.removeItem('login_status')
	}
	/*  点击menu以外地区关闭menu  */
	windowClick(e) {
		if (this.state.sideShow && !this.refs.sideMenu.contains(e.target)) {
			this.toggleMenu()
		}
	}
	/*  切换menu状态  */
	toggleMenu() {
		this.props.callback && this.props.callback()
		this.setState({
			sideShow: !this.state.sideShow
		})
	}
	/*  点击 跳转后自动收回  */
	linkClick(e) {
		if (!e.currentTarget.classList.contains('active')) {
			this.toggleMenu()
		}
	}
	render() {
		let menuClass = classNames('menu', {
			open: this.state.sideShow
		})
		return (
			<div className={menuClass}>
				<div className="menu-btn menu-btn-outside" onClick={this.toggleMenu}>
					<i className="iconfont icon-menu"></i>
					<span>Menu</span>
				</div>
				<div ref="sideMenu" className="side-menu">
					<div className="menu-btn menu-btn-inside" onClick={this.toggleMenu}>
						<i className="iconfont icon-menu"></i>
						<span>Menu</span>
					</div>
					<div className="link-group">
						<IndexLink to="/" activeClassName="active" className="link" onClick={this.linkClick}>
							<i className="iconfont icon-home"></i>
							<span>Home</span>
						</IndexLink>
						<Link to="/factory" activeClassName="active" className="link" onClick={this.linkClick}>
							<i className="iconfont icon-component"></i>
							<span>Factory</span>
						</Link>
					</div>
					{ this.state.isLogin ? (
						<div className="personal-information">
							<img className="avatar" src={ this.state.userInfo.avatar } />
							<h2 className="user-name">{ this.state.userInfo.name }</h2>
							<small className="user-profile">{ this.state.userInfo.profile }</small>
							<div className="follow">
								<a href="https://github.com/NightCatSama" target="_blank">
									<i className="iconfont icon-github"></i>
								</a>
								<a href="https://twitter.com/NightCatSama" target="_blank">
									<i className="iconfont icon-twitter"></i>
								</a>
								<a href="http://weibo.com/p/1005053909739860" target="_blank">
									<i className="iconfont icon-sina"></i>
								</a>
							</div>
							<a href="javascript:;" className="sign-btn" onClick={this.signout}>Sign out</a>
						</div>
					) : (
						<div className="user-group">
							<Link to="/Sign" className="sign-btn blue-btn" onClick={this.linkClick}>
								Sign in
							</Link>
							<Link to="/Sign?signup=1" className="sign-btn green-btn" onClick={this.linkClick}>
								Sign up
							</Link>
						</div>
					)}
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

Menu.propTypes = {
	callback: PropTypes.func,
	actions: PropTypes.object
}

Menu.contextTypes = {
	router: React.PropTypes.any.isRequired
}