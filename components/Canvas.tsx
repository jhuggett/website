import { useRef, useEffect } from "react"
import { Coor } from "../game"

export class RectangleSize {

  constructor(public width: number, public height: number) {}

  area() : number {
    return this.width * this.height
  }
}

class MouseHandler {

  userInteractionEnabled = true

  mouseLocation = {
    x: 0,
    y: 0
  }

  eventActions = {
    mouseMove: {
      event: 'mousemove',
      func: (e) => {
        if (!this.userInteractionEnabled) return
        this.eventActions.mouseMove.actions.forEach(action => action(e))
      },
      actions: []
    },
    mouseDown: {
      event: 'mousedown',
      func: (e) => {
        if (!this.userInteractionEnabled) return
        this.eventActions.mouseDown.actions.forEach(action => action(e))
      },
      actions: []
    }
  }

  registerEvents(window) {
    window.addEventListener(this.eventActions.mouseMove.event, this.eventActions.mouseMove.func)
    window.addEventListener(this.eventActions.mouseDown.event, this.eventActions.mouseDown.func)
  }

  unregisterEvents(window) {
    window.removeEventListener(this.eventActions.mouseMove.event, this.eventActions.mouseMove.func)
    window.removeEventListener(this.eventActions.mouseDown.event, this.eventActions.mouseDown.func)
  }


  addMouseMoveAction(action: any) {
    this.eventActions.mouseMove.actions.push(action)
  }

  addMouseDownAction(action: any) {
    this.eventActions.mouseDown.actions.push(action)
  }

  constructor() {
    this.addMouseMoveAction((e) => {
      this.mouseLocation = {
        x: e.pageX,
        y: e.pageY
      }
    })
  }
}

// class DragHandler {
//   isDown: boolean
//   firstOffset: Coord                
//   start: Coord

//   constructor(public doThisOnDrag: (current: Coord, start: Coord, initial: Coord) => void, public getFirstOffset: () => Coord) {

//   }

//   registerEvents(window) {
//     window.addEventListener('mousedown', this.handleMouseDown(this, true))
//     window.addEventListener('mouseup', this.handleMouseUp(this, true))
//     window.addEventListener('mousemove', this.handleMouseMove(this, true))

//     window.addEventListener('touchstart', this.handleMouseDown(this, false))
//     window.addEventListener('touchend', this.handleMouseUp(this, false))
//     window.addEventListener('touchmove', this.handleMouseMove(this, false))
//   }

//   handleMouseMove(handler: DragHandler, withMouse: boolean) {
//     return (e) => {
//       if (this.isDown) {
//         const current = {
//           x: withMouse ? e.clientX : e.touches[0].pageX,
//           y: withMouse ? e.clientY : e.touches[0].pageY
//         }
//         handler.doThisOnDrag(current, handler.start, handler.firstOffset)
//       }
//     }
//   }

//   handleMouseUp(handler: DragHandler, withMouse: boolean) {
//     return () => {
//       handler.isDown = false
//     }
    
//   }

//   handleMouseDown(handler: DragHandler, withMouse: boolean) {
//     return (e) => {
//       handler.isDown = true
//       handler.start = {
//         x: withMouse ? e.clientX : e.touches[0].pageX,
//         y: withMouse ? e.clientY : e.touches[0].pageY
//       }
//       handler.firstOffset = handler.getFirstOffset()
//     }
//   }

//   cleanup() {
//     window.removeEventListener('mousedown', this.handleMouseDown(this, true))
//     window.removeEventListener('mouseup', this.handleMouseUp(this, true))
//     window.removeEventListener('mousemove', this.handleMouseMove(this, true))

//     window.removeEventListener('touchstart', this.handleMouseDown(this, false))
//     window.removeEventListener('touchend', this.handleMouseUp(this, false))
//     window.removeEventListener('touchmove', this.handleMouseMove(this, false))
//   }
// }

export class CanvasDrawer {
  
  offset = {
    x: 0,
    y: 0
  }

  canvasSize: RectangleSize = new RectangleSize(200, 150)

  canvas?

  draw: (ctx: CanvasContext) => void
  private canvasContext

  constructor(suppliedDraw: (context: CanvasContext) => void) {
    this.draw = (ctx: CanvasContext) => {
      if (!this.canvas) return

      this.canvasContext = this.getCanvasContext()

      this.canvasContext.width = this.canvasSize.width
      this.canvasContext.height = this.canvasSize.height

      suppliedDraw(ctx)
    }
  }

  getCanvasContext() {
    if (this.canvas) return this.canvas.getContext('2d')
  }

  

  drawRectangle(at: Coor, size: RectangleSize, color: string, opacity?: number) {
    if (!this.canvas) return

    this.canvasContext.globalAlpha = opacity ? opacity : 1
    this.canvasContext.fillStyle = color
    this.canvasContext.fillRect(at.x, at.y, size.width, size.height)
  }
}

export class CanvasContext {

  userInteractionEnabled = true
  
  drawer: CanvasDrawer

  mouseHandler: MouseHandler

  enableUserInteraction() {
    this.userInteractionEnabled = true
    this.mouseHandler.userInteractionEnabled = true
  }

  disableUserInteraction() {
    this.userInteractionEnabled = false
    this.mouseHandler.userInteractionEnabled = false
  }

  supplyCanvas(canvas) {
    this.drawer.canvas = canvas
  }

  constructor(drawer: CanvasDrawer, config: (ctx: CanvasContext) => void) {
    this.drawer = drawer

    this.mouseHandler = new MouseHandler()

    config(this)
  }

  


  draw() {
    this.drawer.draw(this)
  }
}

export interface CanvasProps {
  context: CanvasContext
}

const Canvas = ({ context } : CanvasProps) => {

  const canvasRef = useRef(null)

  context.supplyCanvas(canvasRef.current)
  
  useEffect(() => {
    function handleResize() {
      context.draw()
    }

    window.addEventListener('resize', handleResize)


    context.draw()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <canvas className={'canvas'} ref={canvasRef} />
  )
}

export default Canvas