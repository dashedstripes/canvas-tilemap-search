class Tile {
  constructor(context, name, color) {
    this.name = name
    this.context = context
    this.color = color
    this.width = this.height = 16
    this.x = this.y = 0
  }

  draw(x, y) {
    this.context.fillStyle = this.color
    this.context.fillRect(x, y, this.width, this.height)
  }
}

module.exports = Tile