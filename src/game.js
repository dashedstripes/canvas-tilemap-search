let Canvas = require('./canvas')
let Map = require('./map')
let Info = require('./info')

class Game {
  constructor() {
    this.canvas = new Canvas()
    this.context = this.canvas.getContext('2d')
    this.map = new Map(this.context)
    this.info = new Info(this.context)
    this.running = false
    this.input()
  }

  start() {
    console.log('Starting game...')
    this.running = true
    this.loop()
  }

  loop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.fillStyle = '#000000'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.update()
    this.render()
    requestAnimationFrame(this.loop.bind(this))
  }

  update() {
    this.map.update()
  }

  render() {
    this.map.draw()
    this.info.draw()
  }

  input() {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'a':
          this.map.vx = this.map.speed
          break
        case 'd':
          this.map.vx = -this.map.speed
          break
        case 's':
          this.map.vy = -this.map.speed
          break
        case 'w':
          this.map.vy = this.map.speed
          break
      }
    })

    document.addEventListener('keyup', (e) => {
      switch(e.key) {
        case 'd':
          this.map.vx = 0
          break
        case 'a':
          this.map.vx = 0
          break
        case 'w':
          this.map.vy = 0
          break
        case 's':
          this.map.vy = 0
          break
      }
    })

    this.canvas.addEventListener('mousemove', (e) => {
      let xPos = e.clientX
      let yPos = e.clientY

      let canvasOffset = this.canvas.getBoundingClientRect()
      let currentTile = this.map.getTile({
        x: (xPos - canvasOffset.left) - this.map.x,
        y: (yPos - canvasOffset.top) - this.map.y
      })

      this.info.text = this.map.currentTile.name.toLowerCase().replace('_', ' ')
    })
  }

}

module.exports = Game