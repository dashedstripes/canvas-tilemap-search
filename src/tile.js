class Tile {
  constructor(context, x, y, color) {
    this.context = context
    this.x = x
    this.y = y
    this.color = color
    this.width = this.height = 16
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }
}

module.exports = Tile