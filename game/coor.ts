
export function range(start: number, end: number) : Array<number> {
  let numbers = []

  let currentNumber = start
  while (currentNumber <= end) {
    numbers.push(currentNumber)
    currentNumber++
  }

  return numbers
}

export enum Direction {
  north,
  east,
  south,
  west
}

export class Coor {
  constructor(public x: number, public y: number) {}

  sameAs(point: Coor) : boolean {
    return this.x == point.x && this.y == point.y
  }

  scan(distance: number) : Coor[] {
    const xRange = range(this.x - distance, this.x + distance)
    const yRange = range(this.y - distance, this.y + distance)

    let array = []

    xRange.forEach(x => {
      yRange.forEach(y => {
        array.push(new Coor(x, y))
      })
    })

    
    console.log(this.x - distance, this.x + distance);
    console.log(this.y - distance, this.y + distance);
    
    console.log({xRange, yRange});
    console.log({array});
    
    return array
  }

  ring(distance: number) : Array<Coor> {
    let points: Coor[] = []

    range(this.x - distance, this.x + distance).forEach(x => points.push(new Coor(x, this.y + distance)))
    range(this.x - distance, this.x + distance).forEach(x => points.push(new Coor(x, this.y - distance)))
    range(this.y - distance + 1, this.y + distance - 1).forEach(y => points.push(new Coor(this.x + distance, y)))
    range(this.y - distance + 1, this.y + distance - 1).forEach(y => points.push(new Coor(this.x - distance, y)))

    return points
  }

  offsetTo(direction: Direction) : Coor {
    switch (direction) {
      case Direction.north: {
        return new Coor(this.x, this.y - 1)
      }
      case Direction.east: {
        return new Coor(this.x + 1, this.y)
      }
      case Direction.south: {
        return new Coor(this.x, this.y + 1)
      }
      case Direction.west: {
        return new Coor(this.x - 1, this.y)
      }
    }
  }

  adjacentPoints() : Coor[] {
    return [
      this.offsetTo(Direction.north),
      this.offsetTo(Direction.east),
      this.offsetTo(Direction.south),
      this.offsetTo(Direction.west)
    ]
  }
}