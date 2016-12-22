import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router';
import './header'

export default class Header extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		return (
			<div className="header">
				<div className="left-nav">
					<IndexLink to="/" activeClassName="active" className="link"><span>HOME</span></IndexLink>
					<Link to="/about" activeClassName="active" className="link"><span>ABOUT</span></Link>
					<Link to="/login" activeClassName="active" className="link"><span>LOGIN</span></Link>
				</div>
				<div className="header-btn-wrap">
					<div className="header-btn">
						<div className="btn-outer">
							<button className="btn"></button>
						</div>
					</div>
				</div>
				<div className="right-nav">
					<Link to="/component" activeClassName="active" className="link"><span>COMPONENT</span></Link>
					<Link to="/code" activeClassName="active" className="link"><span>CODE</span></Link>
					<Link to="/product" activeClassName="active" className="link"><span>PRODUCT</span></Link>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
}