import { ContentBody, BodyLeft, BodyCenter, BodyRight } from "../components/PageLayout";
import { InlineBlocks } from "react-tinacms-inline";
import Canvas, { CanvasDrawer, CanvasContext, RectangleSize } from "../components/Canvas";
import { Coor } from "../game";




export default function Snake({file, cms, themeHandler, hideTopBar}) {


  return (
    <>
      <ContentBody>
      <BodyLeft>

      </BodyLeft>

      <BodyCenter>
        
      <Canvas context={canvasContext}>
      
      </Canvas>
        
      </BodyCenter>

      <BodyRight>
        
      </BodyRight>

    </ContentBody>
    </>
  )
}





const canvasDrawer = new CanvasDrawer((ctx: CanvasContext) => {
  
  ctx.drawer.drawRectangle(new Coor(0, 0), ctx.drawer.canvasSize, 'blue')
  
})


export const canvasContext = new CanvasContext(canvasDrawer, (ctx: CanvasContext) => {})