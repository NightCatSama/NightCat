import React, { Component, PropTypes } from 'react'
import Canvas from './canvas'
import './styles'

export default class MyFriends extends Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
		new Canvas(this.canvas)
	}
	render() {
		return (
			<div ref="view" className="my-friends-view">
				<canvas id="canvas" ref={(ref) => this.canvas = ref}></canvas>
			</div>
		)
	}
}

MyFriends.propTypes = {
	location: PropTypes.any
}

MyFriends.contextTypes = {
	router: React.PropTypes.any.isRequired
}