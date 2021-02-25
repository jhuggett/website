import { useRef, useEffect } from "react"
import { CanvasContext } from "./context"

export interface CanvasProps {
  context: CanvasContext
}

export const Canvas = ({ context } : CanvasProps) => {

  const canvasRef = useRef(null)

  useEffect(() => {
    context.supplyCanvas(canvasRef.current)

    function handleResize() {
      context.handleResize(window)
    }

    window.addEventListener('resize', handleResize)

    context.registerEvents(window)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      context.unregisterEvents(window)
    }
  }, [])
  
  return (
    <canvas className={'canvas'} ref={canvasRef} />
  )
}
