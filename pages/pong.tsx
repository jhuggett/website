import { ContentBody, BodyLeft, BodyCenter, BodyRight } from "../components/PageLayout";
import { InlineBlocks } from "react-tinacms-inline";
import { Canvas, CanvasDrawer, CanvasContext, RectangleSize } from "../components/Canvas";
import { Coor, getRandomNumber } from "../game";
import styled from 'styled-components'



export default function Snake({file, cms, themeHandler, hideTopBar}) {


  return (
    <Page>
      <Canvas context={canvasContext} />
        
    </Page>
  )
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
`

interface P {
  x: () => number
  y: number
  width: number
}

const pDistanceFromEdge = 3

const p1: P = {
  x: () => pDistanceFromEdge,
  y: 10,
  width: 2
}

const p2: P = {
  x: () => (getNumberOfTiles().x - pDistanceFromEdge),
  y: 10,
  width: 2
}

const ball = {
  location: new Coor(15, 15),
  direction: new Coor(1, 1)
}

interface CollitionResponse {
  collides: boolean

  onX: boolean
  onY: boolean
}

function getNumberOfTiles() : Coor {
  return new Coor(
    Math.floor(canvasContext.drawer.canvasSize.width / tileSize.width),
    Math.floor(canvasContext.drawer.canvasSize.height / tileSize.height)
  )
}

function ballCollides() : CollitionResponse {
  const response: CollitionResponse = {
    collides: false,
    onX: false,
    onY: false
  }

  const newPosition = new Coor(
    ball.location.x + ball.direction.x,
    ball.location.y + ball.direction.y
  )

  const collidablePoints = [
    ...getPointsForP(p1),
    ...getPointsForP(p2)
  ]

  collidablePoints.forEach(point => {
    if (point.sameAs(new Coor(ball.location.x + ball.direction.x, ball.location.y))) {
      response.collides = true
      response.onX = true
    }
    if (point.sameAs(new Coor(ball.location.x, ball.location.y + ball.direction.y))) {
      response.collides = true
      response.onX = true
    }
  })

  if (
    newPosition.x < 0 ||
    newPosition.x >= getNumberOfTiles().x
  ) {
    response.collides = true
    response.onX = true
  }

  if (
    newPosition.y < 0 ||
    newPosition.y >= getNumberOfTiles().y
  ) {
    response.collides = true
    response.onY = true
  }

  return response
}

function moveBall() {

  const collision = ballCollides()

  if (collision.collides) {
    if (collision.onX) {
      ball.direction.x = -ball.direction.x
    }
    if (collision.onY) {
      ball.direction.y = -ball.direction.y
    }
  }


  ball.location.x += ball.direction.x
  ball.location.y += ball.direction.y
  
}

const tileSize = new RectangleSize(25, 25)

let pause = true

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms))
}

function hasP1Won() : boolean {
  const newBallLocation = new Coor(
    ball.location.x + ball.direction.x,
    ball.location.y + ball.direction.y
  )

  if (newBallLocation.x <= 0) return true
  return false
}

function hasP2Won() : boolean {
  const newBallLocation = new Coor(
    ball.location.x + ball.direction.x,
    ball.location.y + ball.direction.y
  )

  if (newBallLocation.x >= getNumberOfTiles().x) return true
  return false
}


(async () => {
  await delay(50)

  while (true) {
    await delay(50)

    if (pause) {
      continue
    }

    if (hasP1Won() || hasP2Won()) {
      pause = true
      if (typeof window !== "undefined") {
        window.location.reload()
      }
    }

    moveBall()

    canvasContext.draw()
  }
})()


function move(p: P, by: number) {
  if (
    p.y + p.width + by <= 0 ||
    p.y + p.width + by >= getNumberOfTiles().y
  ) {
    return
  }
  p.y += by
}


const locationOffsetByTileSize = (point: Coor) : Coor => {
  return new Coor(point.x * tileSize.width, point.y * tileSize.height)
}

const getPointsForP = (p: P) : Coor[] => {
  let points: Coor[] = [new Coor(p.x(), p.y)]
  for (let i = 0; i <= p.width; i++) {
    points.push(
      new Coor(p.x(), p.y + i)
    )
    points.push(
      new Coor(p.x(), p.y - i)
    )
  }
  return points
}

const canvasDrawer = new CanvasDrawer((ctx: CanvasContext) => {
  [
    p1,
    p2
  ].forEach(p => {
    getPointsForP(p).forEach(point => {
      ctx.drawer.drawRectangle(
        locationOffsetByTileSize(point),
        tileSize,
        'orange'
      )
    })
  })

  ctx.drawer.drawRectangle(
    locationOffsetByTileSize(ball.location),
    tileSize,
    'green'
  )
})

const moveAmount = 3

export const canvasContext = new CanvasContext(canvasDrawer, (ctx: CanvasContext) => {
  ctx.handleResize = (window) => {
    ctx.drawer.canvasSize = new RectangleSize(window.innerWidth, window.innerHeight)
    ctx.draw()
  }

  ctx.keyboardHandler.on(' ', {
    keydown: () => {
      pause = !pause
    }
  })


  ctx.keyboardHandler.on('ArrowUp', {
    keydown: () => {
      if (pause) return
      move(p2, -moveAmount)
      ctx.draw()
    }
  })

  ctx.keyboardHandler.on('ArrowDown', {
    keydown: () => {
      if (pause) return
      move(p2, moveAmount)
      ctx.draw()
    }
  })

  ctx.keyboardHandler.on('w', {
    keydown: () => {
      if (pause) return
      move(p1, -moveAmount)
      ctx.draw()
    }
  })

  ctx.keyboardHandler.on('s', {
    keydown: () => {
      if (pause) return
      move(p1, moveAmount)
      ctx.draw()
    }
  })
  
})