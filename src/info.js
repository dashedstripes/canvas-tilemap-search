class Info {
  constructor(context) {
    this.context = context
    this.text = ''
  }

  draw() {
    this.context.fillStyle = '#ffffff'
    this.context.font = "18px Open Sans";
    this.context.fillText(this.text, this.context.canvas.width - (this.context.measureText(this.text).width + 20), 30)
  }
}

module.exports = Info