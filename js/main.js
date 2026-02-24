;(function () {
  function init() {
    const plank = document.getElementById('plank')
    const hit = document.getElementById('plankHit')
    const logs = document.getElementById('logs')
    const weightsLayer = document.getElementById('weights')
    if (!plank || !hit || !logs || !weightsLayer) return
    if (!window.physics || !window.ui) return

    let nextWeight = window.physics.randomWeight()

    function handleClick(event) {
      const rect = plank.getBoundingClientRect()
      const drop = window.physics.computeDrop(rect, event.clientX)
      const verticalGap = Math.max(0, rect.top - event.clientY)
      const weight = nextWeight
      nextWeight = window.physics.randomWeight()

      window.ui.addWeight(weightsLayer, rect, {
        weight,
        side: drop.side,
        distance: drop.distanceFromCenter,
        dropOffset: 40 + verticalGap,
      })

      window.ui.appendLog(logs, {
        weight,
        side: drop.side,
        distance: drop.distanceFromCenter,
      })
    }

    hit.addEventListener('click', handleClick)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

