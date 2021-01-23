import { Coor } from '../coor'
import { getRandomBool, shuffle } from '../random'

interface BaseLandMap {
  land: Coor[]
}

export enum BaseLandType {
  land,
  scaffold
}

export class BaseLandGenerator implements BaseLandMap {

  land: Coor[] = []

  activeGrowthPoints: Coor[] = [new Coor(0, 0)]

  addPoint(point: Coor) {
    this.land.push(point)
  }

  removePoint(point: Coor) {
    this.land = this.land.filter(mapPoint => !point.sameAs(mapPoint))
  }

  checkForPoint(point: Coor) : boolean {
    for (const mapPoint of this.land) {
      if (mapPoint.sameAs(point)) return true
    }
    return false
  }

  grow(landType: BaseLandType, chanceForNewGrowth: number) : number {
    let newGrowth: Coor[] = []
    let growthCount = 0

    this.activeGrowthPoints.forEach(growthPoint => {
      shuffle(growthPoint.adjacentPoints()).forEach(adjacentPoint => {
        if (!this.checkForPoint(adjacentPoint)) {
          if (getRandomBool(chanceForNewGrowth) || newGrowth.length == 0) {
            if (landType == BaseLandType.land) this.addPoint(adjacentPoint)
            growthCount++
          }
          newGrowth.push(adjacentPoint)
        }
      })
    })

    this.activeGrowthPoints = newGrowth
    return growthCount
  }

  growAmount(amount: number, ofType: BaseLandType, chanceForNewGrowth: number) {
    let currentAmount = 0

    while (currentAmount < amount) {
      currentAmount += this.grow(ofType, chanceForNewGrowth)
    }
  }

}