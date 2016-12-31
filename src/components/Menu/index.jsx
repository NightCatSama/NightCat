import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Link, IndexLink } from 'react-router'
import config from '../../config'
import './Menu'

export default class Menu extends Component {
	constructor (props) {
	    super(props)
	    this.state = {
	    	sideShow: false
	    }
	    this.toggleMenu = this.toggleMenu.bind(this)
	    this.windowClick = this.windowClick.bind(this)
	}
	componentDidMount() {
		document.body.addEventListener('click', this.windowClick, false)
	}
	windowClick(e) {
		if (this.state.sideShow && !this.refs.sideMenu.contains(e.target)) {
			this.toggleMenu()
		}
	}
	toggleMenu() {
		this.props.callback && this.props.callback()
		this.setState({
			sideShow: !this.state.sideShow
		})
	}
	render() {
		let menuClass = classNames('menu', {
			open: this.state.sideShow
		})
		return (
			<div className={menuClass}>
				<div className="menu-btn menu-btn-outside" onClick={this.toggleMenu}>
					<i className="iconfont icon-star"></i>
					<span>Menu</span>
				</div>
				<div ref="sideMenu" className="side-menu">
					<div className="menu-btn menu-btn-inside" onClick={this.toggleMenu}>
						<i className="iconfont icon-star"></i>
						<span>Menu</span>
					</div>
					<div className="link-group">
						<IndexLink to="/" activeClassName="active" className="link">
							<i className="iconfont icon-home"></i>
							<span>Home</span>
						</IndexLink>
						<Link to="/components" activeClassName="active" className="link">
							<i className="iconfont icon-component"></i>
							<span>Component</span>
						</Link>
						<Link to="/code" activeClassName="active" className="link">
							<i className="iconfont icon-code"></i>
							<span>Code</span>
						</Link>
						<Link to="/product" activeClassName="active" className="link">
							<i className="iconfont icon-product"></i>
							<span>Product</span>
						</Link>
					</div>
					<div className="personal-information">
						<img className="avatar" src={config.avatar} />
						<h2 className="user-name">{ config.user_name }</h2>
						<small className="user-intro">{ config.intro }</small>
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
				</div>
			</div>
		);
	}
}

Menu.propTypes = {
	callback: PropTypes.func
}