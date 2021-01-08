import { useRef, useEffect } from "react"

interface Coord {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

class MouseHandler {

  mouseLocation = {
    x: 0,
    y: 0
  }

  eventActions = {
    mouseMove: {
      event: 'mousemove',
      func: (e) => {
        this.eventActions.mouseMove.actions.forEach(action => action(e))
      },
      actions: []
    },
    mouseDown: {

    }
  }

  registerEvents(window) {
    window.addEventListener(this.eventActions.mouseMove.event, this.eventActions.mouseMove.func)
  }

  unregisterEvents(window) {
    window.removeEventListener(this.eventActions.mouseMove.event, this.eventActions.mouseMove.func)
  }


  addMouseMoveAction(action: any) {
    this.eventActions.mouseMove.actions.push(action)
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

class DragHandler {
  isDown: boolean
  firstOffset: Coord                
  start: Coord

  constructor(public doThisOnDrag: (current: Coord, start: Coord, initial: Coord) => void, public getFirstOffset: () => Coord) {

  }

  registerEvents(window) {
    window.addEventListener('mousedown', this.handleMouseDown(this, true))
    window.addEventListener('mouseup', this.handleMouseUp(this, true))
    window.addEventListener('mousemove', this.handleMouseMove(this, true))

    window.addEventListener('touchstart', this.handleMouseDown(this, false))
    window.addEventListener('touchend', this.handleMouseUp(this, false))
    window.addEventListener('touchmove', this.handleMouseMove(this, false))
  }

  handleMouseMove(handler: DragHandler, withMouse: boolean) {
    return (e) => {
      if (this.isDown) {
        const current = {
          x: withMouse ? e.clientX : e.touches[0].pageX,
          y: withMouse ? e.clientY : e.touches[0].pageY
        }
        handler.doThisOnDrag(current, handler.start, handler.firstOffset)
      }
    }
  }

  handleMouseUp(handler: DragHandler, withMouse: boolean) {
    return () => {
      handler.isDown = false
    }
    
  }

  handleMouseDown(handler: DragHandler, withMouse: boolean) {
    return (e) => {
      handler.isDown = true
      handler.start = {
        x: withMouse ? e.clientX : e.touches[0].pageX,
        y: withMouse ? e.clientY : e.touches[0].pageY
      }
      handler.firstOffset = handler.getFirstOffset()
    }
  }

  cleanup() {
    window.removeEventListener('mousedown', this.handleMouseDown(this, true))
    window.removeEventListener('mouseup', this.handleMouseUp(this, true))
    window.removeEventListener('mousemove', this.handleMouseMove(this, true))

    window.removeEventListener('touchstart', this.handleMouseDown(this, false))
    window.removeEventListener('touchend', this.handleMouseUp(this, false))
    window.removeEventListener('touchmove', this.handleMouseMove(this, false))
  }
}

export class CanvasDrawer {
  xOffset = 0
  yOffset = 0

  tileSize = {
    width: 50,
    height: 50
  }

  drawnSquares = 0

  constructor(public draw: (context: CanvasContext, canvas) => void) {}
}

export class CanvasContext {
  
  drawer: CanvasDrawer

  mouseHandler: MouseHandler

  dragHandler?: DragHandler

  canvas?

  tileHighlighted = false

  events: { name: string, actions: ((e) => void)[] }[]

  handleKeyDown?: (e) => void

  supplyCanvas(canvas) {
    this.canvas = canvas
  }

  constructor(drawer: CanvasDrawer, events: { name: string, actions: ((e) => void)[] }[], config: (ctx: CanvasContext) => void) {
    this.drawer = drawer

    this.mouseHandler = new MouseHandler()

    this.events = events

    config(this)
  }

  registerEvents(window) {
    this.events.forEach( event => {
      event.actions.forEach( action => {
        window.addEventListener(event.name, e => { action(e); this.draw(); })
      })
    })
    this.mouseHandler.registerEvents(window)
  }

  unregisterEvents(window) {
    this.events.forEach( event => {
      event.actions.forEach( action => {
        window.removeEventListener(event.name, e => { action(e); this.draw(); })
      })
    })
    this.mouseHandler.unregisterEvents(window)
  }


  draw() {
    this.drawer.draw(this, this.canvas)
  }


}

export interface CanvasProps {
  context: CanvasContext
}

const Canvas = (props) => {

  const canvasRef = useRef(null)

  const context: CanvasContext = props.context

  context.supplyCanvas(canvasRef)
  
  useEffect(() => {
    function handleResize() {
      props.context.draw()
    }

    window.addEventListener('resize', handleResize)

    context.registerEvents(window)

    context.draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      context.unregisterEvents(window)
    }
  }, [])
  
  return (
    <canvas className={'canvas'} ref={canvasRef} {...props} />
  )
}

export default Canvas