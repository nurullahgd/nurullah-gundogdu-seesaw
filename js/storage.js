;(function () {
  var KEY = 'seesaw-state'

  function load() {
    try {
      var raw = window.localStorage.getItem(KEY)
      if (!raw) return null
      var data = JSON.parse(raw)
      if (!data || !Array.isArray(data.items)) return null

      var items = []
      for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i]
        if (!item) continue
        var side = item.side === 'left' ? 'left' : 'right'
        var distance = Number(item.distance)
        var weight = Number(item.weight)
        if (!isFinite(distance) || !isFinite(weight)) continue
        items.push({
          side: side,
          distance: distance,
          weight: weight,
        })
      }

      var nextWeight =
        typeof data.nextWeight === 'number' && data.nextWeight >= 1 && data.nextWeight <= 10
          ? data.nextWeight
          : null

      return {
        items: items,
        nextWeight: nextWeight,
      }
    } catch (e) {
      return null
    }
  }

  function save(state) {
    if (!state) return
    try {
      var payload = {
        items: state.items || [],
        nextWeight: state.nextWeight,
      }
      window.localStorage.setItem(KEY, JSON.stringify(payload))
    } catch (e) {}
  }

  function clear() {
    try {
      window.localStorage.removeItem(KEY)
    } catch (e) {}
  }

  window.storage = {
    load: load,
    save: save,
    clear: clear,
  }
})()

