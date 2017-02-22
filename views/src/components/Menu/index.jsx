import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Link, IndexLink } from 'react-router'
import './Menu'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'
import AuthAction from 'actions/AuthAction'

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
			if (res.success) {
				this.props.actions.execute('notice', '退出成功！', 2000, { status: 'success' })
				this.clearWebStorage()
				this.props.authConf.clearStatus()
			}
		})
		.catch((err) => this.props.actions.execute('notice', err.message, 2000, { status: 'error' }))
	}
	/*  清除 webstorage  */
	clearWebStorage(data) {
		window.localStorage.removeItem('token')
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
	/*  跳转到登陆注册页  */
	gotoSign(e, bool) {
		this.linkClick(e)
		this.context.router.push(`/sign?link=${this.context.router.location.pathname + (bool ? '&signup=1' : '')}`)
	}
	/*  点击 跳转后自动收回  */
	linkClick(e) {
		if (!e.currentTarget.classList.contains('active')) {
			this.toggleMenu()
		}
	}
	render() {
		let menuClass = classNames('menu', {
			show: this.props.show,
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
						<Link to="/games" activeClassName="active" className="link" onClick={this.linkClick}>
							<i className="iconfont icon-game"></i>
							<span>All Game</span>
						</Link>
						<Link to="/games/local" activeClassName="active" className="link" onClick={this.linkClick}>
							<i className="iconfont icon-singleGames"></i>
							<span>Single Game</span>
						</Link>
						<Link to="/games/online" activeClassName="active" className="link" onClick={this.linkClick}>
							<i className="iconfont icon-onlineGames"></i>
							<span>Online Game</span>
						</Link>
						{/*
						暂时取消My Friends页面
						<Link to="/my-friends" activeClassName="active" className="link" onClick={this.linkClick}>
							<i className="iconfont icon-myFriends"></i>
							<span>My Friends</span>
						</Link>
						*/}
						<Link to="/about" activeClassName="active" className="link" onClick={this.linkClick}>
							<i className="iconfont icon-about"></i>
							<span>About Me</span>
						</Link>
					</div>
					{ this.props.showUserGroup && (this.props.isLogin ? (
						<div className="user-group">
							<div className="personal-information">
								<img className="avatar" src={this.props.userInfo.avatar} />
								<h2 className="user-name">{this.props.userInfo.name}</h2>
								<small className="user-profile">{this.props.userInfo.profile}</small>
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
							</div>
							<div className="sign-btn-group">
								<Link to="/user" className="sign-btn blue-btn" onClick={this.linkClick}>
									My info
								</Link>
								<a href="javascript:;" className="sign-btn" onClick={this.signout}>Sign out</a>
							</div>
						</div>
					) : (
						<div className="user-group">
							<div className="sign-btn-group">
								<a href="javascript:;" className="sign-btn blue-btn" onClick={(e) => this.gotoSign(e)}>
									Sign in
								</a>
								<a href="javascript:;" className="sign-btn green-btn" onClick={(e) => this.gotoSign(e, true)}>
									Sign up
								</a>
							</div>
						</div>
					) )}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.auth.userInfo,
		isLogin: state.auth.isLogin
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch),
	authConf: bindActionCreators(AuthAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

Menu.propTypes = {
	show: PropTypes.bool,
	isLogin: PropTypes.bool,
	userInfo: PropTypes.object,
	callback: PropTypes.func,
	showUserGroup: PropTypes.bool,
	store: PropTypes.object,
	authConf: PropTypes.object,
	actions: PropTypes.object
}

Menu.defaultProps = {
	show: true,
	showUserGroup: true
}

Menu.contextTypes = {
	router: React.PropTypes.any.isRequired
}