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

  window.physics = {
    randomWeight,
    computeDrop,
  }
})()

