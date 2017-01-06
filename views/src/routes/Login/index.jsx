import React, { Component, PropTypes } from 'react'

// import Canvas from '../asset/Canvas/'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

class Home extends Component {
	constructor (props) {
		super(props)
		this.state = {
			name: 'nightcat',
			password: '123456',
			email: '642163903@qq.com'
		}
		this.singUp = this.singUp.bind(this)
		this.setName = this.setName.bind(this)
		this.setPassword = this.setPassword.bind(this)
		this.setEmail = this.setEmail.bind(this)
	}
	componentDidMount() {
		axios.post('/miao', {
			firstName: 'Night',
			lastName: 'Cat'
		})
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
	}
	singUp(e) {
		e.preventDefault()

		axios.post('/signup', {
			name: this.state.name,
			password: this.state.password,
			email: this.state.email,
		})
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
	}
	setName(e) {
		this.setState({
			name: e.target.value
		})
	}
	setPassword(e) {
		this.setState({
			password: e.target.value
		})
	}
	setEmail(e) {
		this.setState({
			email: e.target.value
		})
	}
	render() {
		return (
			<div ref="view" className="login-view">
				<form id="login-form" onSubmit={this.singUp}>
					<input ref="name" type="text" value={this.state.name} onChange={this.setName} />
					<input ref="password" type="password" value={this.state.password} onChange={this.setPassword} />
					<input ref="email" type="email" value={this.state.email} onChange={this.setEmail} />
					<button type="submit">Sign up</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {store: state}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

Home.propTypes = {
	actions: PropTypes.any
}