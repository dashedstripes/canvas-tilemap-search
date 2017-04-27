let Tile = require('./tile')

class Map {
  constructor(context) {
    this.context = context
    this.speed = 3
    this.x = this.y = 1
    this.vx = this.vy = 0
    this.width = this.height = 0
    this.rows = this.cols = 100

    this.tiles = [
      {
        name: 'grass',
        tile: new Tile(this.context, '#27ae60')
      },
      {
        name: 'grass2',
        tile: new Tile(this.context, '#2ecc71')
      },
      {
        name: 'grass3',
        tile: new Tile(this.context, '#00B16A')
      },
      {
        name: 'grass4',
        tile: new Tile(this.context, '#26C281')
      }
    ]

    this.map = this.createMap()

    if(this.map != null && this.map.length > 0) {
      this.height += this.map.length * (this.tiles[0].tile.height + 1)
      if(this.map[0] != null && this.map[0].length > 0) {
        this.width += this.map[0].length * (this.tiles[0].tile.width + 1)
      }
    }
  }

  createMap() {
    let map = []
    for(let i = 0; i < this.rows; i++) {
      let row = []
      for(let j = 0; j < this.cols; j++) {
        row.push(this.tiles[Math.floor(Math.random() * this.tiles.length)].tile)
      }
      map.push(row)
    }
    return map
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if(this.x >= 1) { this.x = 1 }
    if(this.y >= 1) { this.y = 1 }

    if(this.x <= -(this.width - this.context.canvas.width)) {
      this.x = -(this.width - this.context.canvas.width)
    }

    if(this.y <= -(this.height - this.context.canvas.height)) {
      this.y = -(this.height - this.context.canvas.height)
    }

  }

  draw() {
    this.map.forEach((row, i) => {
      row.forEach((column, j) => {
        column.draw(this.x + (j * (column.width + 1)), this.y + (i * (column.height + 1)))
      })
    })
  }

}

module.exports = Map