import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import cs from 'classnames'

import './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBusAction from 'actions/EventBusAction'

const games = [{
	name: 'Factory',
	isPC: true,
	iconColor: '#333',
	path: 'single-games/factory',
	img: require('images/factory.jpg'),
	description: '将输入变量加工成对应的输出变量的游戏\n（编译环境取决你的浏览器）'
}]

const isPC = !/(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone)/i.test(navigator.userAgent)

class Games extends Component {
	constructor(props) {
		super(props)
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

		this.state = {
			active: 0,
			isFull: true,
			list_width: document.body.offsetWidth * 0.9
		}
		
		this.games = games.filter((game) => game.isPC === isPC)
		this.last = this.games.length - 1
		this.countLimit = 5
		this.windowResize = this.windowResize.bind(this)
		this.changeThum = this.changeThum.bind(this)
	}
	/*  绑定全局事件  */
	componentDidMount() {
		window.addEventListener('resize', this.windowResize, false)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.windowResize, false)
	}
	/*  屏幕改变时同步列表宽度  */
	windowResize() {
		this.setState({
			list_width:  document.body.offsetWidth * 0.9
		})
	}
	/*  切换缩略图模式  */
	changeThum() {
		this.setState({
			isFull: !this.state.isFull
		})
	}
	/*  设置当前游戏  */
	setAction(index) {
		if (index === this.state.active)
			return false

		this.setState({
			active: index
		})
	}
	/*  得到缩略图的class  */
	getItmeClass(index) {
		return cs('game-item', {
			active: index === this.state.active
		})
	}
	/*  得到上下页按钮的class  */
	getBtnClass(type) {
		return cs('change-game-btn', 'iconfont', `icon-${type}`, {
			disbaled: (type === 'prev' ? this.state.active === 0 : this.state.active === this.last)
		})
	}
	/*  页面主体  */
	renderMain(data) {
		let viewClass = cs('single-games-list-view', {
			full: this.games.length <= this.countLimit || this.state.isFull
		})
		let iconClass = cs('iconfont', 'thumbnail-btn', this.state.isFull ? 'icon-thumbnail' : 'icon-image')
		return (
			<div ref="view" className={viewClass}>
				<img src={data.img} className="bg-image" alt="background-img" />
				<div className="game-detail">
					<i className={this.getBtnClass('prev')} style={{ color: data.iconColor }} onClick={() => this.setAction(this.state.active - 1)}></i>
					<div className="cover-group" style={{ backgroundImage: `url(${data.img})` }}></div>
					<div className="detail-group">
						<h1>{data.name}</h1>
						<small>{data.description}</small>
						<Link to={data.path} className="jump-btn">Play</Link>
					</div>
					<i className={this.getBtnClass('next')} onClick={() => this.setAction(this.state.active + 1)}></i>
				</div>
				<ul className="games-list">
					<div className="list-wrap" style={{ transform: `translate3d(${(this.state.list_width - 270) / 2 - this.state.active * 270}px, 0, 0)` }}>
					{
						this.games.map((game, i) => (
							<li key={i} className={this.getItmeClass(i)} onClick={this.setAction.bind(this, i)}>
								<div className="left-content">
									<img src={game.img} alt="game img" />
								</div>
								<div className="right-content">
									<h1>{game.name}</h1>
								</div>
							</li>
						))
					}
					</div>
				</ul>
				{
					this.games.length > this.countLimit && <i className={iconClass} onClick={this.changeThum} style={{ color: data.iconColor }}></i>
				}
			</div>
		)
	}
	renderEmpty() {
		return (
			<div className="single-games-list-view">
				<h3 className="empty-data">
					No Game
				</h3>
			</div>
		)
	}
	render() {
		let cur_game = this.games[this.state.active]
		return cur_game ? this.renderMain(cur_game) : this.renderEmpty()
	}
}


const mapStateToProps = (state) => {
	return {store: state}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(EventBusAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Games)

Games.propTypes = {
	actions: PropTypes.object
}

Games.contextTypes = {
	router: React.PropTypes.any.isRequired
}