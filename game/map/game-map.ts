import { Coor } from "../coor";
import { BaseLandGenerator, BaseLandType } from "./base-land";


export class GameMap {
 
  gameMap: BaseLandGenerator = new BaseLandGenerator()

  constructor() {
    this.gameMap.growAmount(500, BaseLandType.land, .1)
  }
  


  getAllPoints() : number[][] {
    return []
  }


  getPointAt(point: Coor) : number | null {
    if (this.gameMap.checkForPoint(point)) return 1
    return null
  }
}




// const gameMap: number[][] = [
//   [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//   [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
//   [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
//   [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
//   [0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0],
//   [0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1],
//   [0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
//   [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
//   [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
//   [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
//   [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
//   [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
//   [1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0],
//   [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0]
// ]