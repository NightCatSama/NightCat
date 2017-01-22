import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'
import AuthAction from 'actions/AuthAction'

import './styles'

class Info extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isChange: false,
			isSelf: false,
			account: undefined,
			info: {
				name: '',
				location: '',
				avatar: '',
				profile: '',
				website: ''
			}
		}
		this.update = this.update.bind(this)
		this.uploadImg = this.uploadImg.bind(this)
		this.notice = (msg, interval, status) => this.props.actions.execute('notice', msg, interval, { status: status, styles: { top: 'auto', bottom: '30px' } })
	}
	componentDidMount() {
		this.props.authConf.subscribeEvents(this.loadSelfData.bind(this))
		this.getUserInfo()
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.params.account !== this.state.account) {
			this.getUserInfo()
		}
	}
	getUserInfo() {
		let account = this.context.router.params.account
		if (account) {
			this.loadData(account)
		}
		else {
			this.loadSelfData()
		}
	}
	/*  查看用户的信息  */
	loadData(account) {
		let { isLogin, userInfo } = this.props.auth
		if (isLogin && userInfo.account === account) {
			return this.loadSelfData()
		}

		axios.get('/getUserInfoByAccount', {
			params: {
				account: account
			}
		})
		.then((res) => {
			this.setState({
				isSelf: false,
				account: account,
				info: res.data
			})
		})
		.catch((err) => {
			this.notice(err.message, 2000, 'error')
		})
	}
	/*  查看自己的信息  */
	loadSelfData() {
		axios.get('/getUserInfo')
		.then((res) => {
			let obj = {}
			for (let name in this.state.info) {
				obj[name] = res.data[name]
			}
			this.setState({
				isSelf: true,
				info: obj
			})
		})
		.catch((err) => {
			this.notice(err.message, 2000, 'error')
		})
	}
	/*  保存用户信息  */
	update() {
		this.notice('Uploading data...', 0, 'loading')

		axios.post('/saveUserInfo', {
			info: this.state.info
		})
		.then((res) => {
			this.notice(res.message, 2000, 'success')
			this.props.authConf.setUserInfo(this.state.info)
			this.props.authConf.refresh()
		})
		.catch((err) => {
			this.notice(err.message, 2000, 'error')
		})
	}
	/*  上传图片  */
	uploadImg(e) {
		let file = e.target.files[0]
		if (!file) {
			return false
		}
		if (file.size > 102400) {
			return this.notice('Avatar can not be greater than 100kb', 2000, 'error')
		}
		var reader = new FileReader();
		reader.onload = (e) => {
			this.setState({
				info: Object.assign({}, this.state.info, { avatar: e.target.result })
			})
		}
		reader.readAsDataURL(file)
	}
	/*  input 输入同步  */
	handleChange(e, name) {
		let val = e.target.value
		this.setState({
			isChange: true,
			info: Object.assign(this.state.info, { [name]: val })
		})
	}
	/*  生成input的props  */
	createProps(name, type) {
		return {
			spellCheck: false,
			autoComplete: false,
			id: name,
			ref: name,
			type: type,
			value: this.state.info[name],
			onChange: (e) => this.handleChange(e, name)
		}
	}
	render() {
		return (
			<div ref="view" className="info-view">
				<div className="form-group">
					{
						this.state.isSelf && (
							<div className="form-item">
								<label htmlFor="name">Avatar</label>
								<div className="user-avatar">
									<img src={this.state.info.avatar} />
									<input type="file" className="updateHeadImg" onChange={this.uploadImg} />
								</div>
								<small> Click the picture to upload avatar </small>
							</div>
						)
					}
					<div className="form-item">
						<label htmlFor="name">Name</label>
						<input {...this.createProps('name', 'text')} />
					</div>
					<div className="form-item">
						<label htmlFor="profile">Profile</label>
						<input {...this.createProps('profile', 'text')} />
					</div>
					<div className="form-item">
						<label htmlFor="website">Website</label>
						<input {...this.createProps('website', 'text')} />
					</div>
					<div className="form-item">
						<label htmlFor="location">Location</label>
						<input {...this.createProps('location', 'text')} />
					</div>
					{
						this.state.isSelf && (
							<button className="update-btn" onClick={this.update}>Update Info</button>
						)
					}
				</div>
				<div className="modal"></div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth }
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch),
	authConf: bindActionCreators(AuthAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Info)

Info.propTypes = {
	auth: PropTypes.object,
	authConf: PropTypes.object,
	actions: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object
}

Info.contextTypes = {
	router: React.PropTypes.any.isRequired
}