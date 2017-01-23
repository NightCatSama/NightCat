import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'
// import { Link } from 'react-router'

import './styles'
// import './cat'

export default class About extends Component {
	constructor (props) {
		super(props)
		this.state = {
			WINDOW_WIDTH: 0,
			WINDOW_HEIGHT: 0,
			leftPupil: null,
			rightPupil: null,
			leftLight: null,
			rightLight: null
		}
		this.cat = {}
		this.follow = this.follow.bind(this)
		this.setScreenSize = this.setScreenSize.bind(this)
	}
	componentDidMount() {
		setTimeout(() => {
			document.addEventListener('mousemove', this.follow)
			window.addEventListener('resize', this.setScreenSize)
			this.setScreenSize()
			for (let name in this.cat) {
				this.cat[name].info = this.getElemData(this.cat[name], /Eye/g.test(name) ? 20 : 0, /Eye/g.test(name) ? 30 : 0)
			}
		}, 10)
	}
	componentWillUnmount() {
		document.removeEventListener('mousemove', this.follow)
		window.removeEventListener('resize', this.setScreenSize)
	}
	setScreenSize() {
		this.setState({
			WINDOW_WIDTH: document.body.offsetWidth,
			WINDOW_HEIGHT: document.body.offsetHeight
		})
	}
	follow(e) {
		let x = e.pageX
		let y = e.pageY

		let leftEye = this.cat.leftEye.info
		let rightEye = this.cat.rightEye.info
		this.setState({
			leftPupil: this.getPupilStyles(leftEye, x),
			rightPupil: this.getPupilStyles(rightEye, x),
			leftLight: this.getLightStyles(leftEye, x, y, this.cat.leftPupil.info.width),
			rightLight: this.getLightStyles(rightEye, x, y, this.cat.rightPupil.info.width)
		})
	}
	getPupilStyles(obj, x) {
		return {
			left: `${(obj.width / 2) + ( ( x - obj.left - (obj.width / 2) ) / ( this.state.WINDOW_WIDTH - obj.left - (obj.width / 2) ) ) * ( obj.width / 2 )}px`
		}
	}
	getLightStyles(obj, x, y, pupilSize) {
		return {
			left: `${( x / (this.state.WINDOW_WIDTH / (( pupilSize / 2 ))))}px`,
			top: `${(obj.height / 2) + ( ( y - obj.top - (obj.height / 2) ) / ( this.state.WINDOW_HEIGHT - obj.top - (obj.height / 2) ) ) * ( obj.height / 2 - 10 ) + 5}px`,
		}
	}
	getElemData(elem, diffX, diffY) {
		let { left, top } = elem.getBoundingClientRect()
		return {
			left: ~~left,
			top: ~~top,
			width: elem.clientWidth - diffX,
			height: elem.clientHeight - diffY
		}
	}
	render() {
		return (
			<div ref="view" className="about-view">
				<h1>NightCat</h1>
				<div className="cat-mobile"></div>
				<div className="cat">
					<div className="head">
						<div className="ear"></div>
						<div className="face">
							<div ref={(ref) => this.cat.leftEye = ref} className="left-eye eye blink">
								<div ref={(ref) => this.cat.leftPupil = ref} style={ this.state.leftPupil } className="pupil">
									<div ref={(ref) => this.cat.leftLight = ref} style={ this.state.leftLight } className="light"></div>
								</div>
							</div>
							<div ref={(ref) => this.cat.rightEye = ref} className="right-eye eye blink">
								<div ref={(ref) => this.cat.rightPupil = ref} style={ this.state.rightPupil } className="pupil">
									<div ref={(ref) => this.cat.rightLight = ref} style={ this.state.rightLight } className="light"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="body">
						<div className="leg"></div>
						<div className="left-hand hand"></div>
						<div className="right-hand hand"></div>
					</div>
					<div className="tail"></div>
				</div>
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