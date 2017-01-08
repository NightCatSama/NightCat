import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import './styles'

class Sign extends Component {
	constructor (props) {
		super(props)
		// this.state = {
		// 	name: '',
		// 	password: '',
		// 	repassword: '',
		// 	email: ''
		// }
		this.state = {
			isLogin: this.props.location.query.signup ? false : true,
			account: 'nightcat',
			password: '123456',
			repassword: '123456',
			email: '642163903@qq.com'
		}
		this.singUp = this.singUp.bind(this)
		this.login = this.login.bind(this)
		this.setAccount = this.setAccount.bind(this)
		this.setPassword = this.setPassword.bind(this)
		this.setRepassword = this.setRepassword.bind(this)
		this.setEmail = this.setEmail.bind(this)
	}
	componentDidMount() {
		// this.singUp()
	}
	singUp() {
		axios.post('/signup', {
			account: this.state.account,
			password: this.state.password,
			repassword: this.state.repassword,
			email: this.state.email,
		})
		.then((res) => console.log(res.data.message))
		.catch((err) => console.log(err.response.data.message))
	}
	login() {
		axios.post('/login', {
			account: this.state.account,
			password: this.state.password
		})
		.then((res) => console.log(res.data.message))
		.catch((err) => console.log(err.response.data.message))
	}
	setAccount(e) {
		this.setState({
			account: e.target.value
		})
	}
	setPassword(e) {
		this.setState({
			password: e.target.value
		})
	}
	setRepassword(e) {
		this.setState({
			repassword: e.target.value
		})
	}
	setEmail(e) {
		this.setState({
			email: e.target.value
		})
	}
	render() {
		return (
			<div ref="view" className="sign-view">
				<h3>{ this.state.isLogin ? 'Login' : 'Sign up' }</h3>
				<div className="sign-form">
					<div className="form-item">
						<label htmlFor="account">用户名</label>
						<input id="account" type="text" value={this.state.account} onChange={this.setAccount} />
					</div>
					<div className="form-item">
						<label htmlFor="password">密码</label>
						<input id="password" type="password" value={this.state.password} onChange={this.setPassword} />
					</div>
					<div className="form-item">
						<label htmlFor="repassword">再次输入密码</label>
						<input id="repassword" type="password" value={this.state.repassword} onChange={this.setRepassword} />
					</div>
					<div className="form-item">
						<label htmlFor="email">邮箱</label>
						<input id="email" type="email" value={this.state.email} onChange={this.setEmail} />
					</div>
					<button onClick={this.singUp}>singUp</button>
					<button onClick={this.login}>login</button>
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sign)

Sign.propTypes = {
	actions: PropTypes.any,
	location: PropTypes.any
}