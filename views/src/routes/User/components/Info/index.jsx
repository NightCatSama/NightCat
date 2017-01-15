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
				profile: '',
				avatar: '',
				website: ''
			}
		}
		this.update = this.update.bind(this)
		this.notice = (msg, status) => this.props.actions.execute('notice', msg, status)
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
		this.notice('Uploading data...', 'loading', 0)

		/*  此处axios保存数据，接口未写  */
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