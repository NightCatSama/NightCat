// 默认颜色变化数组
const _defaultColors = [[240, 91, 114, 3000], [49, 105, 146, 3000], [153, 47, 37, 3000], [120, 115, 201, 3000], [153, 105, 33, 3000], [70, 120, 33, 3000], [28, 110, 110, 3000], [75, 75, 120]]
// 设备像素比
const DPR = window.devicePixelRatio || 1
// 鼠标类型
const MOUSE_TYPE = -1
// 小球类型
const BALL_TYPES = {
  SOLID: 0, // 实心球
  RING: 1, // 圆环
  DOUBLE_RING: 2 // 双圆环
}
// 鼠标与小球的距离关系
const WITH_MOUSE = {
  OUTSIDE: 0, // 范围外
  INSIDE: 1, // 范围内
  OVERLAP: 2 // 球中
}

// 默认设置
const _default = {
  txt: 'NightCat',      // 文本
  font: 'normal normal 120px Nothing You Could Do', // 文本样式
  bottomTxt: ' - press any key to enter - ',  // 底部文本
  bottomFont: 'normal normal 24px Nothing You Could Do', // 底部文本样式
  ballCount: 30,       // 总个数
  lineWidth: 1,        // 连线的粗度
  lineRange: 200,      // 连线范围
  radiusRange: [10, 20],    // 半径范围
  color: _defaultColors, // 小球颜色组 [[r, g, b, time]...] *time: 在该颜色停留的时间
  bgColor: [[224, 224, 224, 10000], [22, 22, 22, 10000]], // 背景颜色组
  textColor: [[52, 52, 52, 10000], [224, 224, 224, 10000]], // 文本颜色组
  mouseColor: _defaultColors, // 鼠标颜色组
  period: 5000,  // 颜色呼吸周期
  bgPeriod: 5000, // 背景颜色呼吸周期
  textPeriod: 5000, // 文本颜色呼吸周期
  opacity: [0.3, 0.8],   // 透明度范围
  speed: [-1, 1],    // 速度范围
  clickPause: false // 是否点击暂停
}

export default class Canvas {
  constructor (id, option) {
    this.canvas = document.getElementById(id)
    this.cxt = this.canvas.getContext('2d')

    Object.assign(this, _default, option)

    this.font = this.font.replace(/\d+(?=px)/, (size) => parseFloat(size) * DPR)
    this.lineWidth = this.lineWidth * DPR
    this.lineRange = this.lineRange * DPR
    this.radiusRange = this.radiusRange.map(radius => radius * DPR)
    this.speed = this.speed.map(speed => speed * DPR)

    this.fontLoaded = false
    this.vballs = []
    this.balls = []
    this.mouse = {
      x: 0,
      y: 0,
      r: 0,
      type: MOUSE_TYPE,
      catchBall: false,
      onLine: false
    }
    Object.assign(this.mouse, this.initGradientData(this.period, this.mouseColor))
    this.bg = this.initGradientData(this.bgPeriod, this.bgColor)
    this.text = this.initGradientData(this.textPeriod, this.textColor)

    this.clickHandle = this.clickHandle.bind(this)
    this.mouseHandle = this.mouseHandle.bind(this)
    this.init = this.init.bind(this)
    this.bindEvent()
    this.init()
    this.start()
  }
  // 初始化canvas
  init () {
    this.width = this.canvas.width = this.canvas.offsetWidth * DPR
    this.height = this.canvas.height = this.canvas.offsetHeight * DPR
    this.bounds = this.canvas.getBoundingClientRect()
    this.mirrorRange = Math.max(this.radiusRange[1] * 2, this.lineRange)
  }
  // 判断字体是否加载完成
  isLoadFont () {
    if (document.fonts.check(this.font)) {
      this.fontLoaded = true
    } else if (document.fonts.status !== 'loading') {
      document.fonts.load(this.font)
    }
  }
  // 绑定事件
  bindEvent () {
    this.canvas.addEventListener('click', this.clickHandle, false)
    this.canvas.addEventListener('mousemove', this.mouseHandle, false)
    window.addEventListener('resize', this.init, false)
  }
  // 移除事件
  unbindEvent () {
    this.canvas.removeEventListener('click', this.clickHandle, false)
    this.canvas.removeEventListener('mousemove', this.mouseHandle, false)
    window.removeEventListener('resize', this.init, false)
  }
  // 点击控制动画
  clickHandle (e) {
    this.clickPause && this.toggleAnimateStatus()
  }
  // 鼠标移动事件
  mouseHandle (e) {
    let mx = e.clientX - this.bounds.left
    let my = e.clientY - this.bounds.top

    this.mouse.x = mx * DPR
    this.mouse.y = my * DPR
  }
  // 动画开始
  start () {
    if (this.isAnimate) {
      return false
    }

    for (var i = this.vballs.length; i < this.ballCount; i++) {
      this.addBall()
    }

    this.isAnimate = true

    const step = () => {
      if (!this.isAnimate) return false

      this.cxt.clearRect(0, 0, this.width, this.height)
      !this.fontLoaded && this.isLoadFont()
      this.fontLoaded && this.renderBackground()
      this.render()
      this.fontLoaded && this.renderText()
      this.update()
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }
  // 切换动画状态
  toggleAnimateStatus () {
    if (this.isAnimate) {
      this.isAnimate = false
    }
    else {
      this.start()
    }
  }
  // 得到颜色渐变数组
  getColorList (color) {
    // 颜色差值[r, g, b]
    let startColor = color[0]
    let endColor = color[1]

    let ColorDis = endColor.map((end, i) => end - startColor[i])

    // 颜色差最大的绝对值
    let ColorLength = Math.max(Math.abs(ColorDis[0]), Math.abs(ColorDis[1]), Math.abs(ColorDis[2]))

    // 颜色变化系数
    let ColorChange = ColorDis.map((c) => c / ColorLength)

    let ColorList = []

    for (let i = 0; i < ColorLength; i++) {
      ColorList.push(ColorChange.map((c, index) => (color[0][index] + c * i)))
    }

    return ColorList
  }
  // 增加一个球
  addBall () {
    let types = Object.keys(BALL_TYPES)
    let ball = {
      vx: this.getRandomNumber(this.speed),  // 水平方向加速度
      vy: this.getRandomNumber(this.speed),  // 垂直方向加速度
      opacity: this.getRandomNumber(this.opacity), // 透明度
      is_infect: false,  // 是否进入鼠标范围
      type: BALL_TYPES[types[~~(Math.random() * types.length)]],  // 小球类型
      reverse: false, // 是否反向颜色渐变
      withMouse: 0  // 与鼠标位置的关系  [0:范围外, 1:范围内, 2:球中]
    }

    // 半径由透明度决定（越谈越大）
    ball.r = (1 - ball.opacity) * (this.radiusRange[1] - this.radiusRange[0]) + this.radiusRange[0]
    ball.x = this.getRandomNumber([ball.r, this.width - ball.r])
    ball.y = this.getRandomNumber([ball.r, this.height - ball.r])

    // 判断是否重合，重合则重新加
    if (this.isOverlap(ball)) {
      return this.addBall()
    }

    Object.assign(ball, this.initGradientData(this.period, this.color))

    switch (ball.type) {
      case BALL_TYPES.SOLID: break
      case BALL_TYPES.RING:
        ball.emptyR = this.getRandomNumber([ball.r / 2, ball.r / 4 * 3])
        break
      case BALL_TYPES.DOUBLE_RING:
        ball.emptyR = this.getRandomNumber([ball.r / 2, ball.r / 4 * 3])
        ball.sonR = this.getRandomNumber([ball.emptyR / 2, ball.emptyR / 4 * 3])
        break
    }

    this.vballs.push(ball)
  }
  // 判断该位置是否重叠
  isOverlap (ball) {
    return !this.vballs.every((b) => {
      let d = Math.sqrt(Math.pow(ball.x - b.x, 2) + Math.pow(ball.y - b.y, 2))
      if (d <= (ball.r + b.r)) {
        return false
      }
      return true
    })
  }
  // 得到实体球和镜像球
  getBalls () {
    var ball = null
    var balls = []

    for (var i = 0, len = this.vballs.length; i < len; i++) {
      ball = this.vballs[i]
      balls.push(ball)
      balls = balls.concat(this.addMirrorBalls(ball))
    }

    return balls
  }
  // 判断位置生成镜像球
  addMirrorBalls (ball) {
    let range = this.mirrorRange
    let balls = []
    const newPos = {}
    if (ball.x < range) {
      newPos.x = ball.x + this.width
    }
    if (ball.x > this.width - range) {
      newPos.x = ball.x - this.width
    }
    if (ball.y < range) {
      newPos.y = ball.y + this.height
    }
    if (ball.y > this.height - range) {
      newPos.y = ball.y - this.height
    }

    for (var i in newPos) {
      balls.push(this.addMirrorBall(ball, { [i]: newPos[i], parent: ball }))
    }

    if (Object.keys(newPos).length === 2) {
      balls.push(this.addMirrorBall(ball, { x: newPos.x, y: newPos.y, parent: ball }))
    }

    return balls
  }
  // 添加一个镜像球
  addMirrorBall (ball, obj) {
    var newBall = {}
    for (var key in ball) {
      if (obj[key] !== undefined) {
        newBall[key] = obj[key]
      }
      else {
        newBall[key] = ball[key]
      }
    }

    return newBall
  }
  // 渲染
  render (progress) {
    this.balls.length = 0

    this.balls = this.getBalls()

    this.balls.push(this.mouse)

    this.mouse.noLine = this.mouse.catchBall
    this.mouse.catchBall = false
    Array.from(this.balls, (ball, i) => {
      this.renderBall(ball, i)
    })
  }
  // 渲染单个球
  renderBall (ball, i) {
    let x = ball.x
    let y = ball.y
    let color = ball.color

    // 连线
    Array.from(this.balls, (b, index) => {
      if (index <= i) {
        return false
      }

      // 得到距离
      let d = Math.sqrt(Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2))

      // 在范围内且没有碰撞时
      if (d < this.lineRange && d > (ball.r + b.r)) {
        if (b.type === MOUSE_TYPE) {
          ball.withMouse = WITH_MOUSE.INSIDE
          ball.is_infect = true

          if (this.mouse.noLine) {
            return false
          }
        }
        let opacity = 1 - d / this.lineRange
        let ballColor = this.getRGBA(color, opacity)
        let bColor = this.getRGBA(b.color, opacity)

        this.cxt.save()

        let g = this.cxt.createLinearGradient(x, y, b.x, b.y)

        if (ball.type === BALL_TYPES.RING) {
          g.addColorStop(0, ballColor)
          g.addColorStop(ball.emptyR / d, ballColor)
          g.addColorStop(ball.emptyR / d, 'transparent')
        }
        else if (ball.type === BALL_TYPES.DOUBLE_RING) {
          g.addColorStop(0, 'transparent')
          g.addColorStop(ball.sonR / d, 'transparent')
          g.addColorStop(ball.sonR / d, ballColor)
          g.addColorStop(ball.emptyR / d, ballColor)
          g.addColorStop(ball.emptyR / d, 'transparent')
        }
        else {
          g.addColorStop(0, 'transparent')
        }
        g.addColorStop(ball.r / d, 'transparent')
        g.addColorStop(ball.r / d, ballColor)
        g.addColorStop(1 - b.r / d, bColor)
        g.addColorStop(1 - b.r / d, 'transparent')
        g.addColorStop(1, 'transparent')

        this.cxt.strokeStyle = g
        this.cxt.lineWidth = this.lineWidth
        this.renderLine(x, y, b.x, b.y)

        this.cxt.restore()
      }
      // 碰撞
      else if (d < (ball.r + b.r) && !b.isCrash && !ball.isCrash) {
        if (b.type === MOUSE_TYPE) {
          ball.withMouse = WITH_MOUSE.OVERLAP
          ball.is_infect = true
          this.mouse.catchBall = true
        }
        else {
          ball.isCrash = true
          b.isCrash = true
          this.crashHandle(ball, b)

          if (ball.parent) {
            ball.parent.isCrash = true
          }

          if (b.parent) {
            b.parent.isCrash = true
          }
        }
      }
      // 范围外
      else if (b.type === MOUSE_TYPE) {
        ball.withMouse = WITH_MOUSE.OUTSIDE
        ball.is_infect = false
      }
    })

    // 画球【三种类型】
    if (ball.type === BALL_TYPES.SOLID) {
      this.renderTypeArc(x, y, ball.r, this.getRGBA(color, ball.opacity))
    }
    else if (ball.type === BALL_TYPES.RING) {
      this.renderTypeArc(x, y, ball.r, this.getRGBA(color, ball.opacity), ball.emptyR)
    }
    else if (ball.type === BALL_TYPES.DOUBLE_RING) {
      this.renderTypeArc(x, y, ball.r, this.getRGBA(color, ball.opacity), ball.emptyR, ball.sonR)
    }
  }
  // 处理两球碰撞
  // 参考链接：http://www.jscon.co/coding/frontend/canvas_ball_collision.html
  crashHandle (b1, b2) {
    let deg = Math.atan2(b2.y - b1.y, b2.x - b1.x)
    let speed1 = Math.sqrt(b1.vx * b1.vx + b1.vy * b1.vy)
    let speed2 = Math.sqrt(b2.vx * b2.vx + b2.vy * b2.vy)
    let dir1 = Math.atan2(b1.vy, b1.vx)
    let dir2 = Math.atan2(b2.vy, b2.vx)

    let vx1 = speed1 * Math.cos(dir1 - deg)
    let vy1 = speed1 * Math.sin(dir1 - deg)
    let vx2 = speed2 * Math.cos(dir2 - deg)
    let vy2 = speed2 * Math.sin(dir2 - deg)

    let fx1 = vx2
    let fy1 = vy1
    let fx2 = vx1
    let fy2 = vy2

    b1.fx = Math.cos(deg) * fx1 + Math.cos(deg + Math.PI / 2) * fy1
    b1.fy = Math.sin(deg) * fx1 + Math.sin(deg + Math.PI / 2) * fy1
    b2.fx = Math.cos(deg) * fx2 + Math.cos(deg + Math.PI / 2) * fy2
    b2.fy = Math.sin(deg) * fx2 + Math.sin(deg + Math.PI / 2) * fy2
  }
  // 更新
  update () {
    // 只需要计算更新实体球
    this.vballs = this.vballs.map((ball) => {
      // 超出页面范围重置到镜像位置
      if (ball.x < -ball.r) {
        ball.x = ball.x + this.width
      }
      else if (ball.x > this.width + ball.r) {
        ball.x = ball.x - this.width
      }
      else if (ball.y < -ball.r) {
        ball.y = ball.y + this.height
      }
      else if (ball.y > this.height + ball.r) {
        ball.y = ball.y - this.height
      }

      // 碰撞处理
      if (ball.isCrash) {
        ball.isCrash = false

        ball.vx = ball.fx
        ball.vy = ball.fy
      }

      // 在鼠标范围内（排斥）
      if (ball.withMouse === WITH_MOUSE.INSIDE) {
        let g = Math.random() * 0.02

        if (ball.y > this.mouse.y) {
          ball.vy = ball.vy * 0.99 + g
        } else {
          ball.vy = ball.vy * 0.99 - g
        }

        if (ball.x > this.mouse.x) {
          ball.vx = ball.vx * 0.99 + g
        } else {
          ball.vx = ball.vx * 0.99 - g
        }
      }

      // 如果鼠标停留在球上则不运动
      if (ball.withMouse !== WITH_MOUSE.OVERLAP) {
        ball.x += ball.vx
        ball.y += ball.vy
      }

      // 更新小球颜色
      this.updateGradientData(ball)

      return ball
    })

    this.updateGradientData(this.mouse)
    this.updateGradientData(this.bg)
    this.updateGradientData(this.text)
  }
  // 初始化颜色渐变对象
  initGradientData (period, colors) {
    let ColorList = this.getColorList(colors)
    return {
      cur_i: 0,  // 当前颜色step
      cur_color: 0,  // 当前颜色组索引
      color: colors[0],  // 当前颜色
      changeValue: ColorList.length / (period / 16.7),  // 每次渲染变化量
      ColorList: ColorList, // 当前颜色范围
      ColorGroup: colors  // 渐变颜色组
    }
  }
  // 更新颜色
  updateGradientData (ball) {
    let index
    // 颜色停留时间
    let pauseTime = ball.ColorGroup[ball.cur_color][3]

    if (pauseTime) {
      let v = pauseTime / 16.7
      if (ball.cur_i <= v) {
        ball.cur_i += 1
        return false
      }
      else {
        ball.cur_i += ball.changeValue
        index = ~~(ball.cur_i - v)
      }
    }
    else {
      ball.cur_i += ball.changeValue
      index = ~~(ball.cur_i)
    }

    if (index === ball.cur_i) {
      return false
    }

    // 更新颜色
    ball.color = ball.color.map((n, i) => {
      if (index >= ball.ColorList.length) {
        ball.cur_i = index = 0
        ball.cur_color++
        ball.cur_color = ball.cur_color % ball.ColorGroup.length
        if (ball.cur_color === ball.ColorGroup.length - 1) {
          ball.ColorList = this.getColorList([ball.ColorGroup[ball.cur_color], ball.ColorGroup[0]])
        }
        else {
          ball.ColorList = this.getColorList([ball.ColorGroup[ball.cur_color], ball.ColorGroup[ball.cur_color + 1]])
        }
      }
      return ball.ColorList.length ? ball.ColorList[index][i] : n
    })
  }
  // 根据颜色数组获取rgba颜色字符串
  getRGBA (color, opacity = 1) {
    return color === 'transparent' ? color : `rgba(${~~color[0]}, ${~~color[1]}, ${~~color[2]}, ${opacity})`
  }
  // 根据范围得到一个随机数 args: [范围]
  getRandomNumber ([min, max]) {
    return (Math.random() * (max - min)) + min
  }
  // 画各种类型的圆
  renderTypeArc (x, y, r, color, innerR, centerR) {
    this.cxt.fillStyle = color

    this.cxt.beginPath()
    this.cxt.arc(x, y, r, 0, Math.PI * 2, true)
    innerR && this.cxt.arc(x, y, innerR, 0, Math.PI * 2, false)
    centerR && this.cxt.arc(x, y, centerR, 0, Math.PI * 2, true)

    this.cxt.fill()
  }
  // 画一个实心圆
  renderArc (x, y, r, color) {
    this.cxt.fillStyle = color

    this.cxt.beginPath()
    this.cxt.arc(x, y, r, 0, Math.PI * 2, true)

    this.cxt.fill()
  }
  // 画一个圆环
  renderRing (x, y, r, color, innerR) {
    this.cxt.fillStyle = color

    this.cxt.beginPath()
    this.cxt.arc(x, y, r, 0, Math.PI * 2, true)
    this.cxt.arc(x, y, innerR, 0, Math.PI * 2, false)

    this.cxt.fill()
  }
  // 画一个双圆
  renderDoubleArc (x, y, r, color, innerR, centerR) {
    this.cxt.fillStyle = color

    this.cxt.beginPath()
    this.cxt.arc(x, y, r, 0, Math.PI * 2, true)
    this.cxt.arc(x, y, innerR, 0, Math.PI * 2, false)
    this.cxt.arc(x, y, r, 0, Math.PI * 2, true)

    this.cxt.fill()
  }
  // 画一条线
  renderLine (x1, y1, x2, y2) {
    this.cxt.beginPath()
    this.cxt.moveTo(x1, y1)
    this.cxt.lineTo(x2, y2)

    this.cxt.stroke()
  }
  // 画个三角形
  renderTri (coord1, coord2, coord3) {
    this.cxt.beginPath()
    this.cxt.moveTo(coord1.x, coord1.y)
    this.cxt.lineTo(coord2.x, coord2.y)
    this.cxt.lineTo(coord3.x, coord3.y)
    this.cxt.lineTo(coord1.x, coord1.y)
    this.cxt.closePath()

    this.cxt.stroke()
  }
  // 填充背景色
  renderBackground () {
    this.cxt.fillStyle = this.getRGBA(this.bg.color)
    this.cxt.fillRect(0, 0, this.width, this.height)
  }
  // 写字
  renderText () {
    this.cxt.save()

    this.cxt.font = this.font
    let fontSize = ~~(this.font.match(/\d+(?=px)/)[0])
    this.cxt.textAlign = 'center'
    this.cxt.fillStyle = this.getRGBA(this.text.color, 0.8)
    this.cxt.fillText(this.txt, this.width / 2, this.height / 2 + fontSize / 2)

    this.cxt.font = this.bottomFont
    this.cxt.textAlign = 'center'
    this.cxt.fillStyle = this.getRGBA(this.text.color, 0.6)
    this.cxt.fillText(this.bottomTxt, this.width / 2, this.height / 2 + fontSize + 30)

    this.cxt.restore()
  }
}
