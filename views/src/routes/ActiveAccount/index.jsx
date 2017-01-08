import React, { Component, PropTypes } from 'react'
import './styles'

class ActiveAccount extends Component {
	constructor (props) {
		super(props)
		this.state = {
			message: ''
		}
	}
	componentWillMount() {
		axios.get(`/activeAccount${this.props.location.search}`)
		.then((res) => {
			this.setState({
				message: res.data.message
			})
		})
		.catch((err) => console.log(err.response.data.message))
	}
	render() {
		return (
			<div ref="view" className="active_account-view">
				<h1>{ this.state.message }</h1>
			</div>
		);
	}
}

export default ActiveAccount

ActiveAccount.propTypes = {
	location: PropTypes.any
}