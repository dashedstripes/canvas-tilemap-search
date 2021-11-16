class Canvas {
  constructor() {
    this.width = 640
    this.height = 480

    let canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height

    const root = document.getElementById('root');
    root.appendChild(canvas)

    return canvas
  }
}

module.exports = Canvas