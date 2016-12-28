import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Link, IndexLink } from 'react-router';
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
							<span>HOME</span>
						</IndexLink>
						<Link to="/component" activeClassName="active" className="link">
							<i className="iconfont icon-component"></i>
							<span>COMPONENT</span>
						</Link>
						<Link to="/code" activeClassName="active" className="link">
							<i className="iconfont icon-code"></i>
							<span>CODE</span>
						</Link>
						<Link to="/product" activeClassName="active" className="link">
							<i className="iconfont icon-product"></i>
							<span>PRODUCT</span>
						</Link>
					</div>
					<div className="personal-information"></div>
				</div>
			</div>
		);
	}
}

Menu.propTypes = {
	callback: PropTypes.func
}