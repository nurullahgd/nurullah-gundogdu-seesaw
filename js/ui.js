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

  function addWeight(layer, plankRect, payload) {
    if (!layer) return
    const centerX = plankRect.width / 2
    const offset = payload.side === 'left' ? -payload.distance : payload.distance
    const x = centerX + offset
    const node = document.createElement('div')
    node.className =
      'weight ' + (payload.side === 'left' ? 'weight-left' : 'weight-right')
    node.textContent = String(payload.weight)
    node.style.left = x + 'px'

    const base = typeof payload.dropOffset === 'number' ? payload.dropOffset : 40
    const start = -Math.max(40, base)
    node.style.transform = 'translateX(-50%) translateY(' + start + 'px)'

    layer.appendChild(node)

    requestAnimationFrame(function () {
      node.style.transform = 'translateX(-50%) translateY(0)'
    })
  }

  function setPlankAngle(plank, angle) {
    if (!plank) return
    plank.style.transform = 'translateX(-50%) rotate(' + angle + 'deg)'
  }

  function updateStats(displays, view) {
    if (!displays) return
    if (displays.left) {
      displays.left.textContent = view.left.toFixed(1) + ' kg'
    }
    if (displays.right) {
      displays.right.textContent = view.right.toFixed(1) + ' kg'
    }
    if (displays.next) {
      displays.next.textContent = view.next + ' kg'
    }
    if (displays.tilt) {
      displays.tilt.textContent = view.angle.toFixed(1) + '°'
    }
  }

  window.ui = {
    appendLog,
    addWeight,
    setPlankAngle,
    updateStats,
  }
})()

