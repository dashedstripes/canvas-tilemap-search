let Tile = require('./tile')

class Map {
  constructor(context) {
    this.context = context
    this.speed = 3
    this.x = this.y = 1
    this.vx = this.vy = 0
    this.width = 0
    this.height = 0
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if(this.x >= 1) {
      this.x = 1
    }

    if(this.x <= -(this.width - this.context.canvas.width)) {
      this.x = -(this.width - this.context.canvas.width)
    }

    if(this.y >= 1) {
      this.y = 1
    }

    if(this.y <= -(this.height - this.context.canvas.height)) {
      this.y = -(this.height - this.context.canvas.height)
    }

  }

  draw() {
    let map = []
    this.width = 0

    for(let i = 0; i < 60; i++) {
      let row = []
      this.width += 17
      this.height = 0
      for(let j = 0; j < 60; j++) {
        let color = ''
        if(i % 2 && j % 2) {
          color = '#2ecc71'
        }else {
          color = '#27ae60'
        }
        row.push(new Tile(this.context, this.x + (i * 17), this.y + (j * 17), color))
        this.height += 17
      }
      map.push(row)
    }

    map.forEach((row) => {
      row.forEach((tile) => {
        tile.draw()
      })
    })
  }
}

module.exports = Map