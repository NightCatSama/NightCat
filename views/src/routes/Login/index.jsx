import React, { Component, PropTypes } from 'react'

// import Canvas from '../asset/Canvas/'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import style from './style'

class Home extends Component {
	constructor (props) {
		super(props)
		this.state = {
			name: 'nightcat',
			password: '123456',
			repassword: '123456',
			email: '642163903@qq.com'
		}
		this.singUp = this.singUp.bind(this)
		this.setName = this.setName.bind(this)
		this.setPassword = this.setPassword.bind(this)
		this.setRepassword = this.setRepassword.bind(this)
		this.setEmail = this.setEmail.bind(this)
	}
	componentDidMount() {
	}
	singUp(e) {
		e.preventDefault()

		axios.post('/signup', {
			name: this.state.name,
			password: this.state.password,
			repassword: this.state.repassword,
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
			<div ref="view" className={style['login-view']}>
				<form id="login-form" onSubmit={this.singUp}>
					<div className="form-item">
						<label htmlFor="name">用户名</label>
						<input id="name" type="text" value={this.state.name} onChange={this.setName} />
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