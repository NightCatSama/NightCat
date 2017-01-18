import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'
// import { Link } from 'react-router'
import './styles'

export default class About extends Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}
	render() {
		return (
			<div ref="view" className="about-view">
				<h1>I'm NightCat!</h1>
			</div>
		);
	}
}

About.propTypes = {
	location: PropTypes.any
}

About.contextTypes = {
	router: React.PropTypes.any.isRequired
}