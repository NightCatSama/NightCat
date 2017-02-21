import React, { Component, PropTypes } from 'react'
import cs from 'classnames'
import { Link } from 'react-router'
import './styles'

class ActiveAccount extends Component {
	constructor (props) {
		super(props)
		this.state = {
			success: true,
			message: ''
		}
		this.timer = null
	}
	componentWillMount() {
		axios.get(`/activeAccount${this.props.location.search}`)
		.then((res) => {
			this.setState({
				success: res.success,
				message: res.message
			})
		})
		.catch((err) => console.log(err.message))
	}
	componentDidMount() {
		this.timer = setTimeout(() => {
			this.context.router.replace('/')
		}, 10000)
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer)
	}
	render() {
		let iconClass = cs('iconfont', `icon-${this.state.success ? 'success' : 'error'}`)
		let modalClass = cs('msg-modal', `${this.state.success ? 'success' : 'error'}`)
		return (
			<div ref="view" className="active_account-view">
				<div className={modalClass}>
					<h3>
						<i className={iconClass}></i>
						{ this.state.message }
					</h3>
					<Link to="/" className="link-btn">10秒后自动跳转到首页</Link>
				</div>
			</div>
		);
	}
}

export default ActiveAccount

ActiveAccount.propTypes = {
	location: PropTypes.any
}

ActiveAccount.contextTypes = {
	router: React.PropTypes.any.isRequired
}