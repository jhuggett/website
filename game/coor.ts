
export class Coor {
  constructor(public x: number, public y: number) {}

  sameAs(point: Coor) : boolean {
    return this.x == point.x && this.y == point.y
  }
}
