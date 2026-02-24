;(function () {
  function randomWeight() {
    return Math.floor(Math.random() * 10) + 1
  }

  function computeDrop(plankRect, clientX) {
    const x = clientX - plankRect.left
    const centerX = plankRect.width / 2
    const delta = x - centerX
    const side = delta < 0 ? 'left' : 'right'
    const distanceFromCenter = Math.abs(delta)
    return { side, distanceFromCenter }
  }

  function computeState(items) {
    let leftWeight = 0
    let rightWeight = 0
    let leftTorque = 0
    let rightTorque = 0

    for (const item of items) {
      const torque = item.weight * item.distance
      if (item.side === 'left') {
        leftWeight += item.weight
        leftTorque += torque
      } else {
        rightWeight += item.weight
        rightTorque += torque
      }
    }

    const rawAngle = (rightTorque - leftTorque) / 10
    const angle = Math.max(-30, Math.min(30, rawAngle))

    return {
      leftWeight,
      rightWeight,
      leftTorque,
      rightTorque,
      angle,
    }
  }

  window.physics = {
    randomWeight,
    computeDrop,
    computeState,
  }
})()

