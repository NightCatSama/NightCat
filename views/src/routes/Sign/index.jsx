import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import cs from 'classnames'
import isEmail from 'validator/lib/isEmail'

import Message from 'components/Message'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import './styles'

class Sign extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isSignin: this.props.location.query.signup ? false : true,
			shrinks: {},
			account: '',
			password: '',
			repassword: '',
			email: '',
			success: '',
			notice: {}
		}
		this.progress = []
		this.form = null
		this.timer = null
		this.signup = this.signup.bind(this)
		this.signin = this.signin.bind(this)
		this.switchType = this.switchType.bind(this)
	}
	noticeMsg(msg, status) {
		this.setState({
			notice: {
				message: msg,
				status: status
			}
		})
		this.timer && clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.setState({
				notice: {}
			})
		}, 2000)
	}
	signup() {
		if (this.progress.length && !this.progress.every((progress) => progress.classList.contains('success')))
			return this.noticeMsg('Please enter correct information', 'error')

		axios.post('/signup', {
			account: this.state.account,
			password: this.state.password,
			repassword: this.state.repassword,
			email: this.state.email,
		})
		.then((res) => {
			// this.refs.switchTypeBtn.classList.add('cover')
			// this.setState({
			// 	success: '注册成功，已给您的注册邮箱发送了一封邮件，请点击里面的链接激活账号'
			// })
		})
		.catch((err) => {
			this.noticeMsg(err.response.data.message, 'error')
		})
	}
	signin() {
		if (this.progress.length && !this.progress.every((progress) => progress.classList.contains('success')))
			return this.noticeMsg('Please enter correct information', 'error')

		axios.post('/signin', {
			account: this.state.account,
			password: this.state.password
		})
		.then((res) => {
			this.refs.switchTypeBtn.classList.add('cover')
			this.setState({
				success: '登录成功'
			})
		})
		.catch((err) => {
			this.noticeMsg(err.response.data.message, 'error')
		})
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
	/*  切换类型  */
	switchType() {
		let el = this.refs.switchTypeBtn
		if (el.classList.contains('cover'))
			return

		el.classList.add('cover')
		setTimeout(() => {
			this.setState({
				account: '',
				password: '',
				repassword: '',
				email: '',
				shrinks: {},
				isSignin: !this.state.isSignin
			})
			setTimeout(() => {
				el.classList.remove('cover')
			}, 300)
		}, 400)
	}
	isShrink(name) {
		let bool = (document.activeElement.id === name || this.state[name])
		Object.assign(this.state.shrinks, { [name]: bool })
		this.setState({
			shrinks: this.state.shrinks
		})
	}
	/*  验证账号 */
	accountIsRight(val, progress, el) {
		val = val.replace(/[^\w\.\/]/ig,'')
		this.setState({
			account: val
		})
		val.length < 6 ? this.setProgress(progress, 'error', val.length / 6 * 100) : this.setProgress(progress, 'success')
	}
	/*  验证密码  */
	passwordIsRight(val, progress) {
		let len = val.length
		len < 6 ? this.setProgress(progress, 'error', len / 6 * 100) : this.setProgress(progress, 'success')
		let repass_el = this.refs.repassword
		if (!repass_el)
			return false

		let repass = repass_el.value
		repass && (repass !== val ? this.setProgress(repass_el.nextSibling, 'error') : this.setProgress(repass_el.nextSibling, 'success'))
	}
	/*  验证再次密码  */
	repasswordIsRight(val, progress) {
		if (val.length === 0) {
			progress.classList.remove('success')
			progress.classList.remove('error')
			return
		}
		val === this.refs.password.value ? this.setProgress(progress, 'success') : this.setProgress(progress, 'error')
	}
	/*  验证邮箱  */
	emailIsRight(val, progress) {
		return isEmail(val) ? this.setProgress(progress, 'success') : this.setProgress(progress, 'error')
	}
	/*  生成input的props  */
	createProps(name, type, valid) {
		return {
			spellCheck: false,
			autoComplete: false,
			id: name, 
			ref: name, 
			type: type, 
			value: this.state[name],
			onFocus: () => this.isShrink(name),
			onBlur: () => this.isShrink(name),
			onChange: (e) => this.handleChange(e, name, valid)
		}
	}
	/*  生成input的progress  */
	createProgress() {
		return (<span ref={(progress) => progress && this.progress.push(progress)} className="input-progress"></span>)
	}
	/*  得到表单  */
	getForm() {
		return this.state.isSignin ? (
		<div className="form-wrap" key="signin">
			<h3>Sign in</h3>
			<div className="sign-form">
				<div className="form-item">
					<label htmlFor="account" className={this.state.shrinks['account'] ? 'shrink' : ''}>Account</label>
					<input {...this.createProps('account', 'text', this.accountIsRight.bind(this))} />
					{ this.createProgress() }
				</div>
				<div className="form-item">
					<label htmlFor="password" className={this.state.shrinks['password'] ? 'shrink' : ''}>Password</label>
					<input {...this.createProps('password', 'password', this.passwordIsRight.bind(this))} />
					{ this.createProgress() }
				</div>
				<button onClick={this.signin}>Sign in</button>
			</div>
		</div>
		) : (
		<div className="form-wrap" key="signup">
			<h3>Sign up</h3>
			<div className="sign-form">
				<div className="form-item">
					<label htmlFor="account" className={this.state.shrinks['account'] ? 'shrink' : ''}>Account</label>
					<input {...this.createProps('account', 'text', this.accountIsRight.bind(this))} />
					{ this.createProgress() }
				</div>
				<div className="form-item">
					<label htmlFor="password" className={this.state.shrinks['password'] ? 'shrink' : ''}>Password</label>
					<input {...this.createProps('password', 'password', this.passwordIsRight.bind(this))} />
					{ this.createProgress() }
				</div>
				<div className="form-item">
					<label htmlFor="repassword" className={this.state.shrinks['repassword'] ? 'shrink' : ''}>Password Again</label>
					<input {...this.createProps('repassword', 'password', this.repasswordIsRight.bind(this))} />
					{ this.createProgress() }
				</div>
				<div className="form-item">
					<label htmlFor="email" className={this.state.shrinks['email'] ? 'shrink' : ''}>Email</label>
					<input {...this.createProps('email', 'text', this.emailIsRight.bind(this))} />
					{ this.createProgress() }
				</div>
				<button onClick={this.signup}>sign up</button>
			</div>
		</div>
		)
	}
	render() {
		this.progress.length = 0
		let classNames = cs('sign-wrap', {
			signin: this.state.isSignin
		})
		this.form = this.getForm()
		return (
			<div ref="view" className="sign-view">
				<div className={classNames}>
					<div ref="switchTypeBtn" className="switch-type-btn" onClick={this.switchType}></div>
					{ this.form }
					{ this.state.success && (
						<div className="success-cover">
							<i className="iconfont icon-checked"></i>
							<span className="success-word">{ this.state.success }</span>
						</div>
					)}
				</div>
				<ReactCSSTransitionGroup
					transitionName="example"
					transitionEnterTimeout={0}
					transitionLeaveTimeout={0}>
					{
						this.state.notice.message && <Message key="message" status={this.state.notice.status} message={this.state.notice.message} />
					}
				</ReactCSSTransitionGroup>
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