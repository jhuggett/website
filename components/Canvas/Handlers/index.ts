export * from './keyboard'
export * from './mouse'

export interface InputHandler {
  userInteractionEnabled: boolean

  registerEvents: (window) => void
  unregisterEvents: (window) => void
}