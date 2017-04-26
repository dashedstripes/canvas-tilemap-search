/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let Canvas = __webpack_require__(1)
let Map = __webpack_require__(3)

class Game {
  constructor() {
    this.canvas = new Canvas()
    this.context = this.canvas.getContext('2d')
    this.map = new Map(this.context)
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
    this.context.fillStyle = '#444444'
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
  }

}

module.exports = Game

/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Canvas {
  constructor() {
    this.width = 640
    this.height = 480

    let canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height
    document.body.appendChild(canvas)
    return canvas
  }
}

module.exports = Canvas

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0)
let game = new Game()

game.start()

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let Tile = __webpack_require__(4)

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

    for(let i = 0; i < 100; i++) {
      let row = []
      this.width += 17
      this.height = 0
      for(let j = 0; j < 100; j++) {
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);