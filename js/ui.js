;(function () {
  function appendLog(container, payload) {
    if (!container) return
    const rounded = Math.round(payload.distance)
    const text =
      '📦 ' +
      payload.weight +
      'kg dropped on ' +
      payload.side +
      ' side at ' +
      rounded +
      'px from center'
    const entry = document.createElement('div')
    entry.classList.add('log-details-entry')
    entry.textContent = text
    container.prepend(entry)
  }

  window.ui = {
    appendLog,
  }
})()

