import $ from 'jquery'
/**
 * $.extend(true, target, other) 合并target,和other,赋值给target, true表示深拷贝
 *
 */
export default function FireworkMap (canvas) {
  window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  })()
  let ctx = canvas.getContext('2d')
  let cw = canvas.clientWidth
  let ch = canvas.clientHeight
  canvas.width = cw
  canvas.height = ch
  let fireworks = []
  let particles = []
  let hue = 120
  let valve = 60 // 达到改值出现烟花
  let defaultCount = 0 // 自动出现烟花的计数器
  let mousedownCount = 0 // 点击出现烟花的计数器
  let mousedown = false
  let mx = 0
  let my = 0
  function loop () {
    window.requestAnimFrame(loop)
    hue += 0.5
    // 设置在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(0, 0, cw, ch)
    ctx.globalCompositeOperation = 'lighter'
    let i = fireworks.length
    while (i--) {
      fireworks[i].draw()
      fireworks[i].update(i)
    }
    i = particles.length
    while (i--) {
      particles[i].draw()
      particles[i].update(i)
    }
    if (defaultCount >= valve) {
      if (!mousedown) {
        // 添加一个烟火
        fireworks.push(new Firework({x: cw / 2, y: ch}, {x: random(0, cw), y: random(0, ch / 2)}))
        defaultCount = 0
      }
    } else {
      defaultCount++
    }
    if (mousedownCount >= valve) {
      if (mousedown) {
        // add firework
        fireworks.push(new Firework({x: cw / 2, y: ch}, {x: mx, y: my}))
        mousedownCount = 0
      }
    } else {
      mousedownCount += 12
    }
  }

  function Firework (start, target) { // create one firework
    this.start = $.extend(true, {}, start)
    this.actual = $.extend(true, {}, start)
    this.target = $.extend(true, {}, target)
    this.distance = calculateDistance(start, target)
    this.distanceTraveled = 0
    this.coordinates = []
    let count = 3
    while (count--) {
      this.coordinates.push({x: start.x, y: start.y})
    }
    this.angle = Math.atan2(target.y - start.y, target.x - start.x)
    this.brightness = random(50, 70)
    this.radius = 1
    this.speed = 4
    this.acceleration = 1.05
  }
  Firework.prototype.update = function (index) {
    this.coordinates.pop()
    this.coordinates.unshift({x: this.actual.x, y: this.actual.y})
    // 烟花点缩放
    if (this.radius < 8) {
      this.radius += 0.3
    } else {
      this.radius = 1
    }
    // 计算当前速度
    this.speed *= this.acceleration
    // 计算已移动距离
    let x = this.actual.x + Math.cos(this.angle) * this.speed
    let y = this.actual.y + Math.sin(this.angle) * this.speed
    this.distanceTraveled = calculateDistance(this.start, {x, y})
    if (this.distanceTraveled >= this.distance) {
      createParticles(this.target)
      // remove firework
      fireworks.splice(index, 1)
    } else {
      this.actual.x = x
      this.actual.y = y
    }
  }
  Firework.prototype.draw = function () {
    ctx.beginPath()
    let last = this.coordinates[this.coordinates.length - 1]
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(this.actual.x, this.actual.y)
    ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)'
    ctx.stroke()
    ctx.beginPath()
    ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)'
    ctx.arc(this.target.x, this.target.y, this.radius, 0, Math.PI * 2, true)
    ctx.stroke()
  }
  function Particle (p) {
    this.actual = $.extend(true, {}, p)
    this.coordinates = []
    let count = 5
    while (count--) {
      this.coordinates.push({x: p.x, y: p.y})
    }
    this.angle = random(0, Math.PI * 2)
    this.speed = random(1, 10) // 每帧动画的变化幅度
    this.friction = 0.95 // 减速系数
    this.gravity = 1
    this.hue = random(hue - 20, hue + 20)
    this.brightness = random(50, 80)
    this.alpha = 1
    this.decay = random(0.015, 0.03)
  }
  Particle.prototype.update = function (index) {
    this.coordinates.pop()
    this.coordinates.unshift({x: this.actual.x, y: this.actual.y})
    this.speed *= this.friction
    this.actual.x += Math.cos(this.angle) * this.speed
    this.actual.y += Math.sin(this.angle) * this.speed + this.gravity
    this.alpha -= this.decay
    if (this.alpha <= this.decay) {
      particles.splice(index, 1)
    }
  }
  Particle.prototype.draw = function () {
    ctx.beginPath()
    // ctx.moveTo(this.coordinate.x, this.coordinate.y)
    let last = this.coordinates[this.coordinates.length - 1]
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(this.actual.x, this.actual.y)
    ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')'
    ctx.stroke()
  }
  function createParticles (p) {
    let count = 30
    while (count--) {
      particles.push(new Particle(p))
    }
  }
  function calculateDistance (a, b) { // 计算距离
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  }
  function random (min, max) { // 随机数
    return Math.random() * (max - min) + min
  }
  canvas.addEventListener('mousemove', e => {
    mx = e.pageX - canvas.offsetLeft
    my = e.pageY - canvas.offsetTop
  })
  // toggle mousedown state and prevent canvas from being selected
  canvas.addEventListener('mousedown', e => {
    mousedown = true
  })
  canvas.addEventListener('mouseup', e => {
    mousedown = false
  })
  loop()
}
