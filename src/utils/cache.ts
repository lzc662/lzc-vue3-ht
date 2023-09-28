enum cache {
  location,
  session
}

class storage {
  storage: Storage

  constructor(types: cache) {
    this.storage = types === cache.location ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (key) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    if (key) {
      const value = this.storage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
    }
  }

  removeCache(key: string) {
    if (key) {
      this.storage.removeItem(key)
    }
  }

  clearCache() {
    this.storage.clear()
  }
}

const locationCache = new storage(cache.location)
const sessionCache = new storage(cache.session)
export { locationCache, sessionCache }