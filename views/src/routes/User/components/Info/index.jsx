import React, { Component, PropTypes } from 'react'
// import cs from 'classnames'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

import './styles'

class Info extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isChange: false,
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
		this.notice = (msg, interval, options) => this.props.actions.execute('notice', msg, interval, options)
	}
	componentWillMount() {
		let accessToken = window.sessionStorage['accessToken']
		axios.get('/getUserInfo', {
			params: {
				accessToken: accessToken
			}
		})
		.then((res) => {
			let data = res.data.data
			let obj = {}
			for (let name in this.state.info) {
				obj[name] = data[name]
			}
			this.setState({
				info: obj
			})
		})
	}
	/*  update data  */
	update() {
		this.notice('Uploading data...', 0, { status: 'loading', styles: { top: 'auto', bottom: '30px' } })

		/*  此处axios保存数据，接口未写  */
		axios.post('/saveUserInfo', {
			accessToken: window.sessionStorage['accessToken'],
			info: this.state.info
		})
		.then((res) => {
			this.notice(res.data.message, 2000, { status: 'success', styles: { top: 'auto', bottom: '30px' } })
			window.sessionStorage.removeItem('login_status')
			setTimeout(() =>　window.location.reload(), 1000)
		})
		.catch((err) => {
			this.notice(err.response.data.message, 2000, { status: 'error', styles: { top: 'auto', bottom: '30px' } })
		})
	}
	/*  上传图片  */
	uploadImg(e) {
		let file = e.target.files[0]
		if (!file) {
			return false
		}
		if (file.size > 102400) {
			return this.notice('Avatar can not be greater than 100kb', 2000, { status: 'error', styles: { top: 'auto', bottom: '30px' } })
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
					<div className="form-item">
						<label htmlFor="name">Avatar</label>
						<div className="user-avatar">
							<img src={this.state.info.avatar} />
							<input type="file" className="updateHeadImg" onChange={this.uploadImg} />
						</div>
						<small> Click the picture to upload avatar </small>
					</div>
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
					<button className="update-btn" onClick={this.update}>Update Info</button>
				</div>
				<div className="modal"></div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {store: state}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Info)

Info.propTypes = {
	actions: PropTypes.any,
	history: PropTypes.any,
	location: PropTypes.any
}

Info.contextTypes = {
	router: React.PropTypes.any.isRequired
}