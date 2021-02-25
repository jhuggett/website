import { RectangleSize } from "."
import { CanvasContext } from "./context"
import { Coor } from "../../game"


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

      this.canvasContext.canvas.width = this.canvasSize.width
      this.canvasContext.canvas.height = this.canvasSize.height
      suppliedDraw(ctx)
    }
  }

  private getCanvasContext() {
    if (this.canvas) return this.canvas.getContext('2d')
  }

  translate() {
    if (!this.canvas) return
    this.canvasContext.translate(this.offset.x, this.offset.y)
  }

  drawRectangle(at: Coor, size: RectangleSize, color: string, opacity?: number) {
    if (!this.canvas) return

    this.canvasContext.globalAlpha = opacity ? opacity : 1
    this.canvasContext.fillStyle = color
    this.canvasContext.fillRect(at.x, at.y, size.width, size.height)
  }
}