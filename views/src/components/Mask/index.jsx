import React, { Component, PropTypes } from 'react'
import './mask.scss'

export default class Mask extends Component {
	constructor (props) {
	    super(props)
	}
	render() {
		let style = {
			display: this.props.show ? 'block' : 'none',
			zIndex: this.props.zIndex || 0
		}
		return (
			<div ref={(ref) => this.mask = ref } style={style} className="ReactCat-Modal-Mask" onClick={this.props.onClick}></div>
		)
	}
}

Mask.propTypes = {
	show: PropTypes.bool,
	zIndex: PropTypes.number,
	onClick: PropTypes.func
}

Mask.defaultProps = {
	show: false
}
