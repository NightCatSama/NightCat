import React, { Component, PropTypes } from 'react'
import cs from 'classnames'
import isEmail from 'validator/lib/isEmail'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import Velocity from 'velocity-animate'

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
			success_type: ''
		}
		this.progress = []
		this.form = null
		this.timer = null
		this.signup = this.signup.bind(this)
		this.signin = this.signin.bind(this)
		this.coverHandle = this.coverHandle.bind(this)
		this.switchType = this.switchType.bind(this)
		this.notice = (msg, interval = 2000, status = 'error') => this.props.actions.execute('notice', msg, interval, { status: status })
		this.toggleMenu = (bool, options) => this.props.actions.execute('menu', bool, options)
	}
	componentDidMount() {
		let msg = this.props.location.query.message
		msg && this.notice(msg)
		this.toggleMenu(true, {
			showUserGroup: false
		})
	}
	componentWillUnmount() {
		this.toggleMenu(true, {
			showUserGroup: true
		})
	}
	/*  调用注册接口  */
	signup() {
		if (this.progress.length && !this.progress.every((progress) => progress.classList.contains('success')))
			return this.notice('请正确输入注册信息')

		axios.post('/signup', {
			account: this.state.account,
			password: this.state.password,
			repassword: this.state.repassword,
			email: this.state.email,
		})
		.then((res) => {
			this.refs.switchTypeBtn.classList.add('cover')
			this.setState({
				success: (<small>注册成功，已给您的注册邮箱发送了一封邮件，请点击里面的链接激活账号</small>),
				success_type: 'signup'
			})
		})
		.catch((err) => {
			this.notice(err.message)
		})
	}
	/*  调用登录接口  */
	signin() {
		if (this.progress.length && !this.progress.every((progress) => progress.classList.contains('success')))
			return this.notice('请正确输入登录信息')

		axios.post('/signin', {
			account: this.state.account,
			password: this.state.password
		})
		.then((res) => {
			res.data && this.setWebStorage(res.data)
			this.props.actions.execute('refreshMenu')
			this.successTrantionToHome()
		})
		.catch((err) => this.notice(err.message))
	}
	/*  登录成功动画  */
	successTrantionToHome() {
		this.refs.switchTypeBtn.classList.add('full-cover')
		setTimeout(() => {
			this.setState({
				success: '登录成功',
				success_type: 'signin'
			})
			let el = this.refs.signWrap
			el.classList.add('reset-wrap')
			Velocity(el, { scale: 1.1 }, { duration: 200 })
			Velocity(el, { scale: 0 }, { duration: 500 })
			Velocity(el, { scale: 1, width: '100vw', height: '100vh' }, { duration: 1000, easing: 'easeOutQuart' })
			Velocity(el, { opacity: 0 }, { duration: 1000, complete: () => this.context.router.replace(this.props.location.query.link || '/') })
		}, 300)
	}
	/*  设置 webstorage  */
	setWebStorage(data) {
		window.localStorage.token = data.token
		window.sessionStorage.accessToken = data.accessToken
		window.sessionStorage.login_status = JSON.stringify({
			isLogin: true
		})
		window.sessionStorage.userInfo = JSON.stringify(data.userInfo)
	}
	/*  input 输入同步  */
	handleChange(e, name, fn) {
		let val = e.target.value
		let progress = e.target.nextSibling

		this.setState({
			[name]: val
		})
		fn(val, progress, e.target)
	}
	/*  设置input下方的进度条  */
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
	/*  处理注册成功后能直接登录  */
	coverHandle() {
		if (this.state.success_type === 'signup') {
			this.setState({
				success: '',
				success_type: ''
			})
			this.switchType()
		}
	}
	/*  切换类型  */
	switchType() {
		let el = this.refs.switchTypeBtn
		if (el.classList.contains('full-cover'))
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
	/*  babel缩小控制  */
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
			<div className="sign-view">
				<div className={classNames} ref="signWrap">
					<div ref="switchTypeBtn" className="switch-type-btn" onClick={this.switchType}></div>
					{ this.form }
					{ this.state.success && (
						<div className="success-cover" onClick={this.coverHandle}>
							<i className="iconfont icon-checked"></i>
							<span className="success-word">{ this.state.success }</span>
						</div>
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
	history: PropTypes.any,
	location: PropTypes.any
}

Sign.contextTypes = {
	router: React.PropTypes.any.isRequired
}