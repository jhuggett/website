import { useRef, useEffect } from "react"

interface Coord {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
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

  constructor(public draw: (canvas) => void) {}
}

export class CanvasContext {
  
  drawer: CanvasDrawer

  dragHandler?: DragHandler

  canvas?

  events: [{ name: string, actions: [(e) => void] }]

  handleKeyDown?: (e) => void

  supplyCanvas(canvas) {
    this.canvas = canvas
  }

  constructor(drawer: CanvasDrawer, events: [{ name: string, actions: [(e) => void] }]) {
    this.drawer = drawer

    this.events = events

    // if ( !options || options.draggable) {
    //   this.dragHandler = new DragHandler( (current, start, initial) => {

    //   }, () => {
    //     return {
    //       x: this.drawer.xOffset,
    //       y: this.drawer.yOffset
    //     }
    //   })
    // }

    // if ( !options || options?.useKeyDown) {
    //   this.handleKeyDown = (e) => {
    //     const offsetAmount = 50

    //     switch (e.keyCode) {
    //       case 37: {
    //         drawer.xOffset -= offsetAmount
    //         this.draw()
    //         break
    //       }
    //       case 38: {
    //         drawer.yOffset -= offsetAmount
    //         this.draw()
    //         break
    //       }
    //       case 39: {
    //         drawer.xOffset += offsetAmount
    //         this.draw()
    //         break
    //       }
    //       case 40: {
    //         drawer.yOffset += offsetAmount
    //         this.draw()
    //         break
    //       }
    //     }
    //   }
    //}
  }

  registerEvents(window) {
    this.events.forEach( event => {
      event.actions.forEach( action => {
        window.addEventListener(event.name, e => { action(e); this.draw(); })
      })
    })
  }

  unregisterEvents(window) {
    this.events.forEach( event => {
      event.actions.forEach( action => {
        window.removeEventListener(event.name, e => { action(e); this.draw(); })
      })
    })
  }


  draw() {
    this.drawer.draw(this.canvas)
  }


}

export interface CanvasProps {
  context: CanvasContext
}

const Canvas = (props) => {

  const canvasRef = useRef(null)

  props.context.supplyCanvas(canvasRef)

  
  
  
  
  useEffect(() => {
    function handleResize() {
      props.context.draw()
    }

    window.addEventListener('resize', handleResize)


    props.context.registerEvents(window)


    // function handleScroll(e) {
    //   console.log(e);
    //   if (e.deltaY > 0) {
    //     canvasDrawer.current.tileSize = {
    //       width: canvasDrawer.current.tileSize.width + 1,
    //       height: canvasDrawer.current.tileSize.height + 1
    //     }

    //     canvasDrawer.current.draw(growthMap.current)
    //   } else {
    //     if (canvasDrawer.current.tileSize.width <= 1 || canvasDrawer.current.tileSize.height <= 1) return
    //     canvasDrawer.current.tileSize = {
    //       width: canvasDrawer.current.tileSize.width - 1,
    //       height: canvasDrawer.current.tileSize.height - 1
    //     }

    //     canvasDrawer.current.draw(growthMap.current)
    //   }
    // }

    // window.addEventListener('wheel', handleScroll)

    props.context.draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      props.context.unregisterEvents(window)
    }
  }, [])
  
  return (
    <canvas className={'canvas'} ref={canvasRef} {...props} />
  )
}

export default Canvas