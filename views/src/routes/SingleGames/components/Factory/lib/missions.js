const initialState = {
	intro: '', //  关卡描述
	err: [],   //  不可用的Processor
	cols: 3,   //  列数
	rows: 3,   //  行数
	size: 64,  //  字节限制
	isMultigroup: false,  //  是否多个输出口
	entry: {}, //  入口信息
	export: {},//  出口信息
	default: undefined, // 默认 Processor value
	missionCreater: null // 生成
}

/*  关卡生成器  */
export default {
	initialState: initialState,
	'0': function() {
		let total = 0
		const missionCreater = () => {
			const createMandom = () => ~~(Math.random() * 10)
			let input = createMandom()
			let output = input * 2
			total += output
			return {
				input: input,
				output: {
					A: input * 2,
					B: total
				}
			}
		}
		return {
			intro: 'Mission 0：教程关',
			err: [],
			cols: 3,
			rows: 2,
			size: 256,
			isMultigroup: true,
			entry: {
				'0': {
					pos: 'top'
				}
			},
			export: {
				'2': {
					name: 'A',
					pos: 'top'
				},
				'5': {
					name: 'B',
					pos: 'bottom'
				}
			},
			default: {
				'0':
`//  由 IN 传入值

//  NEXT 为下一个值
console.log(NEXT)

//  ACC 为当前值
console.log(ACC)

//  将 ACC 传给右方 Processor
R(ACC)`,
				'1':
`//  Next 从左方 Processor 传入
console.log(NEXT)

//  将ACC 乘以 2
ACC = ACC * 2

//  将 ACC 传给右方 Process
R(ACC)`,
				'2':
`//  将 ACC 输出(OUT A)
T(ACC)

//  将 ACC 和存储值 COM 累加
ACC = COM + ACC

//  将 ACC 储存进 COM
C(ACC)

//  将 ACC 传给下方 Process
B(ACC)
`,
				'5':
`//  将 ACC 输出(OUT B)
//  参数缺省时，传递原始ACC值
B()

//  点击 右方 Next 或 Auto
//  就可以顺利的运行啦
//  ヽ(≧Д≦)ノ
`,
				'3':
`/* *********** 介绍 *************

  * 内置变量：ACC Next COM

    - NEXT  下一个值
    - ACC   当前值
    - COM   存储值

  * 内置方法：T B L R C

    - T B L R 四个方向的传输方法
    - C 设置 COM 存储值
`,
				'4':
`/* *********** 规则 *************

  * ACC 有值时 Processor 才会执行

  * 每次执行 Next 覆盖 ACC

  * COM 只能通过方法C()存储

  * 所有 OUT 均等于 期望值则通关
`,
			},
			missionCreater
		}
	},
	'1': function() {
		const missionCreater = () => {
			const createMandom = () => ~~(Math.random() * 10)
			let input = createMandom()
			return {
				input: input,
				output: input * 2
			}
		}
		return {
			intro: 'Mission 1：简单的乘法',
			err: [3, 4],
			cols: 3,
			rows: 3,
			size: 64,
			entry: {
				'0': {
					pos: 'top'
				}
			},
			export: {
				'6': {
					pos: 'bottom'
				}
			},
			missionCreater
		}
	},
	'2': function() {
		const missionCreater = () => {
			const createMandom = () => ~~(Math.random() * 3) - 1
			let input = createMandom()
			let output = input > 0 ? { 'A': 1, 'B': 0, 'C': 0 } : input === 0 ? { 'A': 0, 'B': 1, 'C': 0 } : { 'A': 0, 'B': 0, 'C': 1 }
			return {
				input: input,
				output: output
			}
		}
		return {
			intro: 'Mission 2：分类',
			err: [],
			size: 32,
			cols: 3,
			rows: 3,
			isMultigroup: true,
			entry: {
				'1': {
					pos: 'top'
				}
			},
			export: {
				'6': {
					name: 'A',
					pos: 'bottom'
				},
				'7': {
					name: 'B',
					pos: 'bottom'
				},
				'8': {
					name: 'C',
					pos: 'bottom'
				}
			},
			missionCreater
		}
	},
	'3': function() {
		let NextA = 0
		let NextB = 0
		const missionCreater = () => {
			const createMandom = () => ~~(Math.random() * 10)
			let input = createMandom()
			NextA += input
			NextB = Math.abs(input - NextB)
			return {
				input: input,
				output: {
					A: NextA,
					B: NextB
				}
			}
		}
		return {
			intro: 'Mission 3：累加 and 差值的绝对值',
			err: [],
			size: 64,
			cols: 2,
			rows: 2,
			isMultigroup: true,
			entry: {
				'0': {
					pos: 'top'
				}
			},
			export: {
				'2': {
					name: 'A',
					pos: 'bottom'
				},
				'3': {
					name: 'B',
					pos: 'bottom'
				}
			},
			missionCreater
		}
	}
}