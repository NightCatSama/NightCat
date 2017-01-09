import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'
import isEmail from 'validator/lib/isEmail'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import './styles'

class Sign extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isSignin: this.props.location.query.signup ? false : true,
			name: '',
			password: '',
			repassword: '',
			email: ''
		}
		this.progress = []
		this.shrinkBabel = this.shrinkBabel.bind(this)
		this.setBabel = this.setBabel.bind(this)
		this.signup = this.signup.bind(this)
		this.signin = this.signin.bind(this)
		this.switchType = this.switchType.bind(this)
	}
	componentDidMount() {
	}
	signup() {
		if (!this.progress.every((progress) => progress.classList.contains('success')))
			return console.log('error')

		axios.post('/signup', {
			account: this.state.account,
			password: this.state.password,
			repassword: this.state.repassword,
			email: this.state.email,
		})
		.then((res) => console.log(res.data.message))
		.catch((err) => console.log(err.response.data.message))
	}
	signin() {
		axios.post('/signin', {
			account: this.state.account,
			password: this.state.password
		})
		.then((res) => console.log(res.data.message))
		.catch((err) => console.log(err.response.data.message))
	}
	handleChange(e, name, fn) {
		let val = e.target.value
		let progress = e.target.nextSibling

		this.setState({
			[name]: val
		})
		fn(val, progress, e.target)
	}
	setEmail(e) {
		this.setState({
			email: e.target.value
		})
	}
	shrinkBabel(e) {
		e.target.previousSibling.classList.add('shrink')
	}
	setBabel(e) {
		if (e.target.value === '') {
			e.target.previousSibling.classList.remove('shrink')
		}
	}
	setProgress(progress, status, percentage = 100) {
		if (status === 'success') {
			progress.style.width = '100%'
			progress.classList.add('success')
			progress.classList.remove('error')
		}
		else {
			progress.style.width = `${percentage}%`
			progress.classList.remove('success')
			progress.classList.add('error')
		}
	}
	switchType() {
		this.setState({
			isSignin: !this.state.isSignin
		})
	}
	render() {
		let inputProps = {
			spellCheck: false,
			autoComplete: false,
			onBlur: this.setBabel,
			onFocus: this.shrinkBabel
		}

		/*  验证账号 */
		const accountIsRight = (val, progress, el) => {
			val = val.replace(/[^\w\.\/]/ig,'')
			this.setState({
				account: val
			})
			val.length < 6 ? this.setProgress(progress, 'error', val.length / 6 * 100) : this.setProgress(progress, 'success')
		}

		/*  验证密码  */
		const passwordIsRight = (val, progress) => {
			let len = val.length
			len < 6 ? this.setProgress(progress, 'error', len / 6 * 100) : this.setProgress(progress, 'success')
			let repass_el = this.refs.repassword
			if (!repass_el)
				return false

			let repass = repass_el.value
			repass && (repass !== val ? this.setProgress(repass_el.nextSibling, 'error') : this.setProgress(repass_el.nextSibling, 'success'))
		}

		/*  验证再次密码  */
		const repasswordIsRight = (val, progress) => {
			if (val.length === 0) {
				progress.classList.remove('success')
				progress.classList.remove('error')
				return
			}
			val === this.refs.password.value ? this.setProgress(progress, 'success') : this.setProgress(progress, 'error')
		}

		/*  验证邮箱  */
		const emailIsRight = (val, progress) => isEmail(val) ? this.setProgress(progress, 'success') : this.setProgress(progress, 'error')

		// let classNames = cs('sign-wrap', {
		// 	'signin': this.state.isSignin
		// })
		this.progress.length = 0
		return (
			<div ref="view" className="sign-view">
				<div className="sign-wrap signin">
					<div className="switch-type-btn" onClick={this.switchType}></div>
					{ this.state.isSignin ? (
					<span>
						<h3>Sign in</h3>
						<div className="sign-form">
							<div className="form-item">
								<label htmlFor="account">Account</label>
								<input {...inputProps} id="account" type="text" value={this.state.account || ''} onChange={(e) => this.handleChange(e, 'account', accountIsRight)} />
								<span ref={(progress) => this.progress[0] = progress} className="input-progress"></span>
							</div>
							<div className="form-item">
								<label htmlFor="password">Password</label>
								<input {...inputProps} id="password" ref="password" type="password" value={this.state.password || ''} onChange={(e) => this.handleChange(e, 'password', passwordIsRight)} />
								<span ref={(progress) => this.progress[1] = progress} className="input-progress"></span>
							</div>
							<button onClick={this.signin}>Sign in</button>
						</div>
					</span>
					) : (
					<span>
						<h3>Sign up</h3>
						<div className="sign-form">
							<div className="form-item">
								<label htmlFor="account">Account</label>
								<input {...inputProps} id="account" type="text" value={this.state.account || ''} onChange={(e) => this.handleChange(e, 'account', accountIsRight)} />
								<span ref={(progress) => this.progress[0] = progress} className="input-progress"></span>
							</div>
							<div className="form-item">
								<label htmlFor="password">Password</label>
								<input {...inputProps} id="password" ref="password" type="password" value={this.state.password || ''} onChange={(e) => this.handleChange(e, 'password', passwordIsRight)} />
								<span ref={(progress) => this.progress[1] = progress} className="input-progress"></span>
							</div>
							<div className="form-item">
								<label htmlFor="repassword">Password Again</label>
								<input {...inputProps} id="repassword" ref="repassword" type="password" value={this.state.repassword || ''} onChange={(e) => this.handleChange(e, 'repassword', repasswordIsRight)} />
								<span ref={(progress) => this.progress[2] = progress} className="input-progress"></span>
							</div>
							<div className="form-item">
								<label htmlFor="email">Email</label>
								<input {...inputProps} id="email" type="email" value={this.state.email || ''} onChange={(e) => this.handleChange(e, 'email', emailIsRight)} />
								<span ref={(progress) => this.progress[3] = progress} className="input-progress"></span>
							</div>
							<button onClick={this.signup}>sign up</button>
						</div>
					</span>
					)}
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