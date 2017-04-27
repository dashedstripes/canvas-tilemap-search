class Info {
  constructor(context) {
    this.context = context
    this.text = ''
  }

  draw() {
    let textWidth = this.context.measureText(this.text).width
    let textHeight = 18
    
    this.context.font = "18px Open Sans";
    this.context.fillStyle = '#000000'
    this.context.fillRect(this.context.canvas.width - (textWidth + 20) - 20, 20, textWidth * 2, textHeight * 2)
    this.context.fillStyle = '#ffffff'
    this.context.fillText(this.text, this.context.canvas.width - (textWidth + 20), 45)
  }
}

module.exports = Info