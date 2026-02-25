;(function () {
  function getElements() {
    const ids = {
      plank: 'plank',
      hit: 'plankHit',
      field: 'field',
      logs: 'logs',
      weightsLayer: 'weights',
      leftDisplay: 'left',
      rightDisplay: 'right',
      nextDisplay: 'next',
      tiltDisplay: 'tilt',
    }

    const elements = {}

    for (const key in ids) {
      const el = document.getElementById(ids[key])
      if (!el) {
        return null
      }
      elements[key] = el
    }

    return elements
  }

  function init() {
    const elements = getElements()
    if (!elements) return
    if (!window.physics || !window.ui) return

    const {
      plank,
      hit,
      field,
      logs,
      weightsLayer,
      leftDisplay,
      rightDisplay,
      nextDisplay,
      tiltDisplay,
    } = elements

    const items = []
    let nextWeight = window.physics.randomWeight()

    window.ui.updateStats(
      {
        left: leftDisplay,
        right: rightDisplay,
        next: nextDisplay,
        tilt: tiltDisplay,
      },
      {
        left: 0,
        right: 0,
        next: nextWeight,
        angle: 0,
      }
    )

    function handleClick(event) {
      const rect = plank.getBoundingClientRect()
      const fieldRect = field.getBoundingClientRect()
      const drop = window.physics.computeDrop(rect, event.clientX)
      const dropOffset = rect.top - fieldRect.top
      const weight = nextWeight
      nextWeight = window.physics.randomWeight()

      window.ui.addWeight(weightsLayer, rect, {
        weight,
        side: drop.side,
        distance: drop.distanceFromCenter,
        dropOffset,
      })

      window.ui.appendLog(logs, {
        weight,
        side: drop.side,
        distance: drop.distanceFromCenter,
      })

      items.push({
        side: drop.side,
        distance: drop.distanceFromCenter,
        weight,
      })

      const state = window.physics.computeState(items)

      window.ui.setPlankAngle(plank, state.angle)

      window.ui.updateStats(
        {
          left: leftDisplay,
          right: rightDisplay,
          next: nextDisplay,
          tilt: tiltDisplay,
        },
        {
          left: state.leftWeight,
          right: state.rightWeight,
          next: nextWeight,
          angle: state.angle,
        }
      )

      window.ui.hidePreview(weightsLayer)
    }

    function handleMove(event) {
      const rect = plank.getBoundingClientRect()
      const drop = window.physics.computeDrop(rect, event.clientX)

      window.ui.showPreview(weightsLayer, rect, {
        weight: nextWeight,
        side: drop.side,
        distance: drop.distanceFromCenter,
      })
    }

    function handleLeave() {
      window.ui.hidePreview(weightsLayer)
    }

    hit.addEventListener('click', handleClick)
    hit.addEventListener('mousemove', handleMove)
    hit.addEventListener('mouseleave', handleLeave)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

