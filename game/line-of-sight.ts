import { Coor } from "."
import { GameMap } from "./map"



export function getLine(from: Coor, to: Coor) : Coor[] {
  let points: Coor[] = []

  let x0 = from.x
  let y0 = from.y
  let x1 = to.x
  let y1 = to.y

  const dx = Math.abs(x1 - x0)
  const sx = x0 < x1 ? 1 : -1

  const dy = Math.abs(y1 - y0)
  const sy = y0 < y1 ? 1 : -1

  let err = dx - dy

  while (true) {
    points.push(new Coor(x0, y0))
    if (x0 == x1 && y0 == y1) break

    const e2 = 2 * err
    if (e2 > -dy) {
      err -= dy
      x0 += sx
    }
    if (e2 < dx) {
      err += dx
      y0 += sy
    }
  }

  return points
}

export function getLineOfSight(point: Coor, gameMap: GameMap, maxDistance?: number) : Coor[] {
  let points: Coor[] = []


  let shouldContinue = true
  let distance = 1
  while (shouldContinue) {
    shouldContinue = false

    if (maxDistance && distance == maxDistance) return points

    point.ring(distance).forEach(newPoint => {
      const pointToNewPoint: Coor[] = getLine(point, newPoint)

      const newPointToPoint: Coor[] = getLine(newPoint, point)

      let isLineBroken = false

      for (const step of pointToNewPoint) {
        if (gameMap.getPointAt(step) != 1) {
          isLineBroken = true
          break
        }
      }

      if (!isLineBroken) {
        points.push(newPoint)
        shouldContinue = true
      } else {
        isLineBroken = false
        for (const step of newPointToPoint) {
          if (gameMap.getPointAt(step) != 1) {
            isLineBroken = true
            break
          }
        }
  
        if (!isLineBroken) {
          points.push(newPoint)
          shouldContinue = true
        }
      }
      
    })

    distance++
  }


  return points
}