import Detector from './Detector'
import Processor from './Processor'
import missions from './missions'

const _default = {
	size: null,
	inService: false,
	missions: missions,
	mission: 1,
	data_count: 20,
	processor_count: 9
}

/*  Factory游戏对象  */
export default class Factory {
	constructor(el, options) {
		Object.assign(this, _default, options)
		this.elem = el
		this.data = []
		this.events = []
		this.detector = null
		this.active = 0
		this.init()
	}
	/*  初始化  */
	init() {
		this.initSize()
		this.getMissions()
		this.initMission()
		this.createContaner()
		this.createConsole()
		this.initProcessor()
		this.createDetector()
		this.createPanel()
	}
	/*  销毁对象  */
	destory() {
		this.elem.innerHTML = ''
		this.data = []
		this.events = []
		this.active = 0
		this.detector = null
		while(this.events.length) {
			(this.events.shift())()
		}
	}
	/*  初始化容器大小  */
	initSize() {
		if (this.size) {
			this.width = this.size[0]
			this.height = this.size[1]
			this.elem.style.cssText = `
				width: ${this.width}px;
				height: ${this.height}px;
			`
		} else {
			this.width = this.elem.offsetWidth
			this.height = this.elem.offsetHeight
		}
	}
	/*  生成检测器对象  */
	createDetector() {
		this.detector = new Detector({
			wrap: this.console,
			isMultigroup: this.isMultigroup || false,
			factory: this,
			data: this.data
		})
	}
	/*  生成游戏控制面板  */
	createPanel() {
		this.panel = document.createElement('DIV')
		this.panel.className = 'factory-panel'
		this.nextBtn = this.createBtn('Next', this.next, this.panel)
		this.nextBtn = this.createBtn('Auto', this.start, this.panel)
		this.nextBtn = this.createBtn('Pause', this.pause, this.panel)
		this.nextBtn = this.createBtn('Restart', this.restart, this.panel)
		this.nextBtn = this.createBtn('Reset', this.reset, this.panel)
		this.console.appendChild(this.panel)
	}
	/*  生成控制按钮  */
	createBtn(name, fn, wrap) {
		let btn = document.createElement('BUTTON')
		btn.className = 'factory-panel-btn'
		btn.textContent = name
		fn = fn.bind(this)
		btn.addEventListener('click', fn, false)
		this.events.push(() => btn.removeEventListener('click', fn, false))
		wrap.appendChild(btn)
		return btn
	}
	/*  生成游戏主体容器  */
	createContaner() {
		this.container = document.createElement('DIV')
		this.container.className = 'factory-container'
		this.elem.appendChild(this.container)
	}
	/*  生成右侧控制台  */
	createConsole() {
		this.console = document.createElement('DIV')
		this.console.className = 'factory-console'
		this.elem.appendChild(this.console)
	}
	/*  得到关卡数据  */
	getMissions() {
		let fn = this.missions[this.mission]
		if (typeof fn !== 'function') {
			Object.assign(this, this.missions[this.mission]())
		}
		else {
			Object.assign(this, this.missions[this.mission]())
		}
	}
	/*  设置关卡  */
	initMission() {
		for (let i = 0; i < this.data_count; i++) {
			let d = this.missionCreater()
			this.data.push({
				input: d.input,
				output: null,
				expectant_output: d.output,
				result: 'pending'
			})
		}
	}
	/*  初始化处理器  */
	initProcessor() {
		this.processors = []
		for (let i = 0; i < this.processor_count; i++) {
			this.processors.push(new Processor({
				status: this.err && this.err.indexOf(i) > -1 ? 'error' : 'idle',
				size: this.size,
				wrap: this.container,
				factory: this,
				index: i
			}))
		}
		Array.from(this.processors, (processor, i) => {
			let leftIndex = i - 1
			processor.leftProcessor = this.processors[leftIndex] || null
			let rightIndex = i + 1
			processor.rightProcessor = this.processors[rightIndex] || null
			let TopIndex = i - 3
			processor.topProcessor = this.processors[TopIndex] || null
			let BottomIndex = i + 3
			processor.bottomProcessor = this.processors[BottomIndex] || null

			if (this.entry[i]) {
				processor.setPort(this.entry[i], 'entry')
			}
			if (this.export[i]) {
				processor.setPort(this.export[i], 'export')
			}
		})
	}
	/*  运行中禁止代码输入  */
	unableCodeInput(bool) {
		/*  分别执行  */
		Array.from(this.processors, (processor) => {
			bool ? processor.code.setAttribute('disabled', true) : processor.code.removeAttribute('disabled')
		})
	}
	/*  游戏开始  */
	start() {
		this.timer = setInterval(() => {
			this.next()
		}, 200)
	}
	/*  游戏暂停  */
	pause() {
		clearInterval(this.timer)
		this.timer = null
	}
	/*  关卡结束  */
	end() {
		this.pause()
		this.unableCodeInput(false)
		if (this.detector.success_count === this.data.length) {
			alert('你通关了:)')
			this.mission = this.mission + 1
			this.restart()
		}
		else {
			console.log(`错了${this.data.length - this.detector.success_count}个`)
		}
	}
	/*  关卡重置  */
	restart() {
		this.pause()
		this.destory()
		this.init()
	}
	/*  运行重置  */
	reset() {
		this.active = 0
		this.unableCodeInput(false)
		this.detector.reset()
	}
	/*  执行下一步  */
	next() {
		if (this.active < this.data.length) {
			this.detector.setActive(this.active)
			this.entryGetNext()
			if (!this.inService) {
				this.inService = true
				this.unableCodeInput(true)
			}
			this.active++
		}
		else {
			this.detector.setActive()
		}

		/*  全部重置值  */
		Array.from(this.processors, (processor) => {
			processor.resetACC()
		})

		this.entryGetNext()

		/*  分别执行  */
		Array.from(this.processors, (processor) => {
			processor.next()
		})

		/*  判断是否全部停滞  */
		!this.processors.some((processor) => processor.status === 'run') && this.end()
	}
	/*  入口得到Next值  */
	entryGetNext() {
		for (let key in this.entry) {
			this.data[this.active] && this.processors[key].setNext(this.data[this.active].input)
		}
	}
}