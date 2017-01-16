import React, { Component, PropTypes } from 'react'
import Mask from 'components/Mask'
import cs from 'classnames'

export default class RuleModel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: !!this.props.show
		}
		this.toggle = this.toggle.bind(this)
	}
	toggle() {
		this.setState({
			show: !this.state.show
		})
	}
	render() {
		let HelpClass = cs('game-help', {
			show: this.state.show
		})
		return (
			<span>
				<Mask show={this.state.show} onClick={this.toggle} zIndex={8} />
				<div className={HelpClass}>
					<i className="iconfont icon-close" onClick={this.toggle}></i>
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
							由入口INPUT或者上个处理器(Processor)传过来的值, 下次执行时覆盖ACC值
						</p>
						<p className="help-item">
							<span>ACC：</span>
							一个从入口输入(INPUT), 经过处理到最终输出(OUTPUT)对应的结果的值
						</p>
						<p className="help-item">
							<span>COM：</span>
							处理器(Processor)的存储值, 只能通过方法C去获取或设置
						</p>
					</section>

					<section>
					<h3>内置方法</h3>
						<p className="help-item">
							<span>T：</span>
							参数缺省时为传递初始ACC, 传向上方的处理器(Processor), 当该方向是OUTPUT时为输出结果
						</p>
						<p className="help-item">
							<span>B：</span>
							参数缺省时为传递初始ACC, 传向下方的处理器(Processor), 当该方向是OUTPUT时为输出结果
						</p>
						<p className="help-item">
							<span>L：</span>
							参数缺省时为传递初始ACC, 传向左方的处理器(Processor), 当该方向是OUTPUT时为输出结果
						</p>
						<p className="help-item">
							<span>R：</span>
							参数缺省时为传递初始ACC, 传向右方的处理器(Processor), 当该方向是OUTPUT时为输出结果
						</p>
						<p className="help-item">
							<span>C：</span>
							设置存储值(COM), 参数缺省时为清空存储值(ACC)
						</p>
					</section>

					<section>
					<h3>提示</h3>
						<p className="help-item">
							使用ES6能让代码更加精简(前提你的浏览器支持)
						</p>
						<p className="help-item">
							请遵守游戏规则, 不要使用window或者WebStorage等黑科技！
						</p>
					</section>

					<section>
						<h3>感言</h3>
						<p className="help-item">
							当前为测试版本, 如果有BUG希望能反馈给我<a href="https://nightcatsama.github.io/NightCat/dist/" target="_blank">ISSUE</a>
						</p>
						<p className="help-item">
							如果你想参与关卡设计, 也可以告诉我。我的GITHUB地址为：<a href="https://github.com/NightCatSama/NightCat" target="_blank">https://github.com/NightCatSama/NightCat</a>
						</p>
					</section>
				</div>
			</span>
		);
	}
}

RuleModel.propTypes = {
	show: PropTypes.bool
}