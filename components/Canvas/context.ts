import { CanvasDrawer } from "./drawer"
import { MouseHandler, KeyboardHandler, InputHandler } from "./Handlers"


export class CanvasContext {

  userInteractionEnabled = true
  
  drawer: CanvasDrawer

  mouseHandler: MouseHandler

  keyboardHandler: KeyboardHandler

  handlers() : InputHandler[] {
    return [
      this.mouseHandler,
      this.keyboardHandler
    ]
  }

  enableUserInteraction() {
    this.handlers().map(handler => handler.userInteractionEnabled = true)
    this.userInteractionEnabled = true
  }

  disableUserInteraction() {
    this.handlers().map(handler => handler.userInteractionEnabled = false)
    this.userInteractionEnabled = false
  }

  supplyCanvas(canvas) {
    this.drawer.canvas = canvas
  }

  registerEvents(window) {
    this.handlers().map(handler => handler.registerEvents(window))
  }

  unregisterEvents(window) {
    this.handlers().map(handler => handler.unregisterEvents(window))
  }


  handleResize: (window) => void = (window) => { }

  constructor(drawer: CanvasDrawer, config: (ctx: CanvasContext) => void) {
    this.drawer = drawer

    this.mouseHandler = new MouseHandler()
    this.keyboardHandler = new KeyboardHandler()
    config(this)
  }

  


  draw() {
    this.drawer.draw(this)
  }
}