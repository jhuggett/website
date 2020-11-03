export interface Persistant {
  key: string
  persist: () => void
  retrieve: () => void
}

export interface ProvidesDataToPersist {
  provideDataToPersist: () => string
}

class PersistanceHandler {

  persist(key: string, value: any) {
    const json = JSON.stringify(value)


    localStorage.setItem(key, json)
  }

  retrieve(key: string) : any {

    const json = localStorage.getItem(key)
    return JSON.parse(json)
  }

  removePersistant(object: Persistant) {
    this.remove(object.key)
  }

  remove(key: string) {

    localStorage.removeItem(key)
  }
}

export const Persistor = new PersistanceHandler()