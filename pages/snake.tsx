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

const directions = {
  up: new Coor(0, -1),
  right: new Coor(1, 0),
  down: new Coor(0, 1),
  left: new Coor(-1, 0)
}

const applyDirection = (coor: Coor, direction: Coor) : Coor => {
  return new Coor(coor.x + direction.x, coor.y + direction.y)
}

const snake = {
  parts: [new Coor(6, 5), new Coor(5, 5), new Coor(4, 5)],
  direction: directions.right
}

function snakeIsOutOfBounds() : boolean {
  const head = snake.parts[0]

  if (
    head.x <= 0 ||
    head.y <= 0 ||
    head.x >= getMaxNumberOfTiles().x ||
    head.y >= getMaxNumberOfTiles().y
    ) {
      return true
    }

  return false
}

function snakeHasHitItself() : boolean {
  const head = snake.parts[0]
  const rest = snake.parts.slice(1)

  for (let piece of rest) {
    if (piece.sameAs(head)) {
      return true
    }
  }
  return false
}

const getMaxNumberOfTiles = () : Coor => {
  return new Coor(
    Math.floor(canvasContext.drawer.canvasSize.width / tileSize.width),
    Math.floor(canvasContext.drawer.canvasSize.height / tileSize.height)
  )
}

function randomlySetFood() {
  food.location = new Coor(
    getRandomNumber(1, getMaxNumberOfTiles().x - 1),
    getRandomNumber(1, getMaxNumberOfTiles().y - 1)
  )

  for (let piece of snake.parts) {
    if (piece.sameAs(food.location)) {
      randomlySetFood()
    }
  }
}

function checkIfSnakeCollidesWithFood() {
  if (snake.parts[0].sameAs(food.location)) {
    randomlySetFood()
    snake.parts.push(snake.parts[snake.parts.length - 1])
  }
}

const food = {
  location: new Coor(-1, -1)
}

let pause = false

const tileSize = new RectangleSize(25, 25)

function coorWithTileSizeApplied(coor: Coor) : Coor {
  return new Coor(coor.x * tileSize.width, coor.y * tileSize.height)
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms))
}

(async () => {
  await delay(75)
  randomlySetFood()
  
  while (true) {
    await delay(75)

    if (pause) {
      continue
    }

    snake.parts.pop()
    snake.parts = [
      applyDirection(snake.parts[0], snake.direction),
      ...snake.parts
    ]

    if (snakeIsOutOfBounds() || snakeHasHitItself()) {
      pause = true
      if (typeof window !== "undefined") {
        window.location.reload()
      }
    }

    checkIfSnakeCollidesWithFood()

    canvasContext.draw()
  }
})()

const canvasDrawer = new CanvasDrawer((ctx: CanvasContext) => {
  snake.parts.forEach((part, index) => {
    ctx.drawer.drawRectangle(
      coorWithTileSizeApplied(part),
      tileSize,
      index == 0 ? 'orange' : 'yellow'
    )
  })

  ctx.drawer.drawRectangle(
    coorWithTileSizeApplied(food.location),
    tileSize,
    'green'
  )
})

export const canvasContext = new CanvasContext(canvasDrawer, (ctx: CanvasContext) => {

  
  
  ctx.handleResize = (window) => {
    ctx.drawer.canvasSize = new RectangleSize(window.innerWidth, window.innerHeight)
    ctx.draw()
  }

  ctx.keyboardHandler.on('ArrowUp', {
    keydown: () => {
      if (snake.direction.sameAs(directions.down)) return
      snake.direction = directions.up
    }
  })

  ctx.keyboardHandler.on('ArrowRight', {
    keydown: () => {
      if (snake.direction.sameAs(directions.left)) return
      snake.direction = directions.right
    }
  })

  ctx.keyboardHandler.on('ArrowDown', {
    keydown: () => {
      if (snake.direction.sameAs(directions.up)) return
      snake.direction = directions.down
    }
  })

  ctx.keyboardHandler.on('ArrowLeft', {
    keydown: () => {
      if (snake.direction.sameAs(directions.right)) return
      snake.direction = directions.left
    }
  })

  ctx.keyboardHandler.on(' ', {
    keydown: () => {
      pause = !pause
    }
  })
  
})