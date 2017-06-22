import React, { Component, PropTypes } from 'react'

export default class Template extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}
	render() {
		return (
			<h1>
				我是一个页面模板，方便添加至项目
				<small>By NightCat</small>
			</h1>
		)
	}
}

Template.propTypes = {
}