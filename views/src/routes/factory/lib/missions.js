
/*  关卡生成器  */
export default {
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
					pos: 'topProcessor'
				}
			},
			export: {
				'6': {
					pos: 'bottomProcessor'
				}
			},
			missionCreater
		}
	},
	'2': function() {
		const missionCreater = () => {
			const createMandom = () => ~~(Math.random() * 10)
			let input = [createMandom(), createMandom(), createMandom()]
			let output = Array.from(input.slice().sort((a, b) => a - b), (num, i) => num - i)
			return {
				input: input,
				output: output.reduce((a, b) => a * b)
			}
		}
		return {
			intro: 'Mission 2：排序后减去索引，最后再相乘',
			err: [],
			size: 64,
			cols: 4,
			rows: 3,
			entry: {
				'0': {
					pos: 'topProcessor'
				}
			},
			export: {
				'11': {
					pos: 'bottomProcessor'
				}
			},
			missionCreater
		}
	},
	'3': function() {
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
			intro: 'Mission 3：分类',
			err: [],
			size: 32,
			cols: 3,
			rows: 3,
			isMultigroup: true,
			entry: {
				'1': {
					pos: 'topProcessor'
				}
			},
			export: {
				'6': {
					name: 'A',
					pos: 'bottomProcessor'
				},
				'7': {
					name: 'B',
					pos: 'bottomProcessor'
				},
				'8': {
					name: 'C',
					pos: 'bottomProcessor'
				}
			},
			missionCreater
		}
	},
	'4': function() {
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
			intro: 'Mission 4：累加 and 差值的绝对值',
			err: [],
			size: 64,
			cols: 2,
			rows: 2,
			isMultigroup: true,
			entry: {
				'0': {
					pos: 'topProcessor'
				}
			},
			export: {
				'2': {
					name: 'A',
					pos: 'bottomProcessor'
				},
				'3': {
					name: 'B',
					pos: 'bottomProcessor'
				}
			},
			missionCreater
		}
	}
}