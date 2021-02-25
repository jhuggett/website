export * from './Canvas'
export * from './context'
export * from './drawer'
export * from './Handlers'


export class RectangleSize {

  constructor(public width: number, public height: number) {}

  area() : number {
    return this.width * this.height
  }
}