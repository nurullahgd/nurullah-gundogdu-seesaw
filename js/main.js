;(function () {
  function init() {
    const plank = document.getElementById('plank')
    const logs = document.getElementById('logs')
    if (!plank || !logs) return
    if (!window.physics || !window.ui) return

    let nextWeight = window.physics.randomWeight()

    function handleClick(event) {
      const rect = plank.getBoundingClientRect()
      const drop = window.physics.computeDrop(rect, event.clientX)
      const weight = nextWeight
      nextWeight = window.physics.randomWeight()

      window.ui.appendLog(logs, {
        weight,
        side: drop.side,
        distance: drop.distanceFromCenter,
      })
    }

    plank.addEventListener('click', handleClick)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

