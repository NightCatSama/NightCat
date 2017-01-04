import React, { Component } from 'react'
import cs from 'classnames'

import Mask from 'components/Mask/'
import 'stylesheets/factory'
import Factory from './lib/Factory'

export default class component extends Component {
	constructor(props) {
		super(props)
		this.state = {
			gameProgress: 100,
			gameSign: false,
			helpShow: false,
			word: 'Game Start',
			game: null
		}
		this.switchState = this.switchState.bind(this)
		this.toggleHelp = this.toggleHelp.bind(this)
		this.clickFn = this.clickFn.bind(this)
	}
	componentDidMount() {
		// this.switchState()
	}
	switchState() {
		let obj = {
			gameSign: !this.state.gameSign
		}
		if (!this.state.game) {
			obj.game = new Factory(this.refs.factory)
		}
		else {
			obj.word = 'Continue'
		}
		this.setState(obj)
	}
	toggleHelp() {
		this.setState({
			helpShow: !this.state.helpShow
		})
	}
	clickFn() {
		this.state.game.start()
	}
	render() {
		let GameClass = cs('game-main', {
			show: this.state.gameSign
		})
		let HelpClass = cs('game-help', {
			show: this.state.helpShow
		})
		let GroupClass = cs('game-prev-group', {
			hide: this.state.gameSign
		})
		return (
			<div ref="view" className="factory-view">
				<Mask show={this.state.helpShow} onClick={this.toggleHelp} zIndex={8} />
				<div className={GroupClass}>
					<section className="title-group">
						<h1 className="game-title">
							Factory
						</h1>
						<small className="version">beta</small>
					</section>
					<button className="game-btn" onClick={this.switchState}>{ this.state.word }</button>
					<button className="game-btn" onClick={this.toggleHelp}>Help</button>
				</div>
				<div className={GameClass}>
					<div className="game-btn-group">
						<button onClick={this.switchState}>
							<i className="iconfont icon-left"></i>
						</button>
						<button onClick={this.toggleHelp}>Help</button>
					</div>
					<div ref="factory" className="factory"></div>
				</div>
				<div className={HelpClass}>
					<i className="iconfont icon-close" onClick={this.toggleHelp}></i>
					<section>
						<h3>通关条件</h3>
						<p className="help-item">
							所有输出值(OUT)均已期望值(EXP)相等
						</p>
					</section>

					<section>
						<h3>内置变量</h3>
						<p className="help-item">
							<span>NEXT：</span>
							由INPUT或者上个处理器(Processor)传过来的值, 下次执行时覆盖ACC值
						</p>
						<p className="help-item">
							<span>ACC：</span>
							从入口输入(Input), 经过处理最终输出(Output)对应的结果
						</p>
					</section>

					<section>
					<h3>内置方法</h3>
						<p className="help-item">
							<span>T：</span>
							参数缺省时为传递ACC, 传向上方的处理器(Processor), 当该方向是Output时为输出(Output)结果
						</p>
						<p className="help-item">
							<span>B：</span>
							参数缺省时为传递ACC, 传向下方的处理器(Processor), 当该方向是Output时为输出(Output)结果
						</p>
						<p className="help-item">
							<span>L：</span>
							参数缺省时为传递ACC, 传向左方的处理器(Processor), 当该方向是Output时为输出(Output)结果
						</p>
						<p className="help-item">
							<span>R：</span>
							参数缺省时为传递ACC, 传向右方的处理器(Processor), 当该方向是Output时为输出(Output)结果
						</p>
					</section>

					<section>
						<h3>须知</h3>
						<p className="help-item">
							请遵守游戏规则, 不要使用window或者WebStorage等黑科技!
						</p>
						<p className="help-item">
							当前为测试版本, 如果有BUG希望能反馈给我<a href="https://nightcatsama.github.io/NightCat/dist/" target="_blank">ISSUE</a>
						</p>
						<p className="help-item">
							如果你想参与关卡设计, 也可以告诉我:>。我的GITHUB地址为：<a href="https://github.com/NightCatSama/NightCat" target="_blank">https://github.com/NightCatSama/NightCat</a>
						</p>
					</section>
				</div>
			</div>
		)
	}
}

component.propTypes = {}