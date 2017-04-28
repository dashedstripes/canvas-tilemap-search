let Tile = require('./tile')

class Map {
  constructor(context) {
    this.context = context
    this.speed = 4
    this.x = this.y = 1
    this.vx = this.vy = 0
    this.width = this.height = 0
    this.rows = this.cols = 100

    this.tileWidth = 16

    this.tiles = [
      {
        name: 'grass',
        color: '#26A65B'
      },
      {
        name: 'cut_grass',
        color: '#2ECC71'
      },
      {
        name: 'wet_grass',
        color: '#1E824C'
      },
      {
        name: 'water',
        color: '#81CFE0'
      }
    ]

    this.currentTile = {}

    this.map = this.createMap()

    if(this.map != null && this.map.length > 0) {
      this.height += this.map.length * (this.tileWidth + 1)
      if(this.map[0] != null && this.map[0].length > 0) {
        this.width += this.map[0].length * (this.tileWidth + 1)
      }
    }
  }

  createMap() {
    let map = []
    for(let i = 0; i < this.rows; i++) {
      let row = []
      for(let j = 0; j < this.cols; j++) {
        let chosenTile = this.tiles[Math.floor(Math.random() * this.tiles.length)]
        let tile = new Tile(this.context, chosenTile.name, chosenTile.color)
        tile.x = j * (tile.width + 1)
        tile.y = i * (tile.height + 1)
        row.push(tile)
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

  getTile(m) {
    let x = m.x
    let y = m.y

    let map = Object.assign([], this.map)
    this.searchTiles(map, x, y)
  }

  getRow(arr, x, y) {
    if(arr != undefined) {
      if(arr.length == 1) {
        if(arr[0] != undefined) {
          return arr
        }
      }
    }

    let halfLength = Math.ceil(arr.length / 2)
    
    let left = arr.splice(0, halfLength)
    let right = arr.splice(left[left.length], halfLength + 1)
    let middle = right[0][0]

    if(y < middle.y) {
      this.searchTiles(left, x, y)
    }else if(y > middle.y) {
      this.searchTiles(right, x, y)
    }
  }

  getCol(arr, x, y) {
    if(arr.length == 1) {
      this.currentTile = arr[0]
      return arr[0]
    }

    let halfLength = Math.ceil(arr.length / 2)
    let left = arr.splice(0, halfLength)
    let right = arr.splice(left[left.length], halfLength + 1)
    let middle = right[0]
    
    if(x < middle.x) {
      this.getCol(left, x, y)
    }else if(x > middle.x) {
      this.getCol(right, x, y)
    }
  }

  searchTiles(arr, x, y) {
    let row = this.getRow(arr, x, y)

    if(row != undefined) {
      if(row[0] != undefined) {
        let newRow = Object.assign([], row[0])
        this.getCol(newRow, x, y)
      }
    }
  }

}

module.exports = Map