import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'
// import { Link } from 'react-router'
import './styles'

export default class MyFriends extends Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}
	render() {
		return (
			<div ref="view" className="my-friends-view">
				<h1>施工中：)</h1>
			</div>
		);
	}
}

MyFriends.propTypes = {
	location: PropTypes.any
}

MyFriends.contextTypes = {
	router: React.PropTypes.any.isRequired
}