import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'

// import './styles'

export default class Info extends Component {
	constructor (props) {
		super(props)
		this.state = {
		}
		this.offsetView = this.offsetView.bind(this)
	}
	offsetView() {
		this.refs.view.classList.toggle('offset')
	}
	render() {
		return (
			<span>
				<div ref="view" className="info-view">
					<h1>I'm info</h1>
				</div>
			</span>
		);
	}
}

Info.propTypes = {
	actions: PropTypes.any,
	history: PropTypes.any,
	location: PropTypes.any
}

Info.contextTypes = {
	router: React.PropTypes.any.isRequired
}