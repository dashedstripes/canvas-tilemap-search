class Tile {
  constructor(context, color) {
    this.context = context
    this.color = color
    this.width = this.height = 16
  }

  draw(x, y) {
    this.context.fillStyle = this.color
    this.context.fillRect(x, y, this.width, this.height)
  }
}

module.exports = Tile