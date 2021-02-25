import { InputHandler } from ".";
import { throws } from "assert";

export interface OnKeyboardEvent {
  keydown?: () => void
  keyup?: () => void
}

interface KeyboardEvent {
  keydown?: (() => void)[]
  keyup?: (() => void)[]
}

export class KeyboardHandler implements InputHandler {
  userInteractionEnabled = true

  events = new Map<string, KeyboardEvent>()

  keydown = (e) => {
    if (this.events.has(e.key)) {
      const event = this.events.get(e.key)
      if (event.keydown) {
        event.keydown.forEach(item => item())
      }
    }
  }


  keyup = (e) => {
    if (this.events.has(e.key)) {
      const event = this.events.get(e.key)
      if (event.keyup) {
        event.keyup.forEach(item => item())
      }
    }
  }

  registerEvents(window) {
    window.addEventListener('keydown', this.keydown)
    window.addEventListener('keyup', this.keyup)
  }

  unregisterEvents(window) {
    window.removeEventListener('keydown', this.keydown)
    window.removeEventListener('keyup', this.keyup)
  }


  on(key: string, onEvent: OnKeyboardEvent) {

    if (!this.events.has(key)) {
      this.events.set(key, {})
    }

    const event = this.events.get(key)

    if (onEvent.keydown) {
      if (!event.keydown) event.keydown = []
      event.keydown.push(onEvent.keydown)
    }

    if (onEvent.keyup) {
      if (!event.keyup) event.keyup = []
      event.keyup.push(onEvent.keyup)
    }
  }
}
