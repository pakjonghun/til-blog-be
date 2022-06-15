class CacheStore {
  store = {};

  getData(term, data) {
    if (term == null) return null;

    const cached = this.store[term];
    if (cached) return cached;
    else {
      this.store[term] = data;
      return data;
    }
  }
}

module.exports = CacheStore;
