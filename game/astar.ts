import { Coor } from "."
import { GameMap } from "./map"


interface Node {
  g: number
  h: number
  f: number

  parent?: Node

  location: Coor
}


export function aStar(start: Coor, end: Coor, grid: GameMap) {
  let open: Node[] = []
  let closed: Node[] = []

  const startNode = {
    g: 0,
    h: 0,
    f: 0,
    location: start
  }

  const endNode = {
    g: 0,
    h: 0,
    f: 0,
    location: end
  }

  open.push(startNode)

  while(open.length > 0) {

    let currentIndex = 0
    let currentNode = open[0]
    

    open.forEach((item, index) => {
      if (item.f < currentNode.f) {
        currentNode = item
        currentIndex = index
      }
    })

    open = open.filter(item => !item.location.sameAs(currentNode.location))
    closed.push(currentNode)

    if (currentNode.location.sameAs(endNode.location)) {
      let path = []
      let current = currentNode
      while (current) {
        path.push(current.location)
        current = current.parent
      }
      return path.reverse()
    }

    let children = []
    
    const adjacents = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    
    adjacents.forEach(item => {
      const nodePosition: Coor = new Coor(
        currentNode.location.x + item[0], 
        currentNode.location.y + item[1]
      )

      if (grid.getPointAt(nodePosition) != 1) return

      const newNode: Node = {
        g: 0,
        h: 0,
        f: 0,
        parent: currentNode,
        location: nodePosition
      }

      children.push(newNode)
    });

    children.forEach((child: Node) => {

      let childInClosed = false
      closed.forEach((closedChild: Node) => {
        if (child.location.sameAs(closedChild.location)) childInClosed = true
      })
      if (childInClosed) return
      
      child.g = currentNode.g + 1
      child.h = ((child.location.x - end.x) ** 2) + ((child.location.y - end.y) ** 2)
      child.f = child.g + child.h

      let childInOpen = false
      open.forEach(openNode => {
        if (child.location.sameAs(openNode.location) && child.g > openNode.g) childInOpen = true
      })
      if (childInOpen) return

      open.push(child)
    })
  }
}
