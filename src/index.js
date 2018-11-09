import 'babel-polyfill'
const jsQR = require('jsqr')
window.addEventListener('paste', async function (e) {
  e.preventDefault()
  e.stopPropagation()
  let file = e.clipboardData.items[0].getAsFile()
  let objectUrl = URL.createObjectURL(file)
  const img = document.createElement('img')
  img.src = objectUrl
  img.onload = function () {
    const width = img.naturalWidth
    const height = img.naturalHeight
    const canvas = document.getElementById('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height)
    const imageData = ctx.getImageData(0, 0, width, height)
    const code = jsQR(imageData.data, width, height)
    document.getElementById('qrcode').innerText = code.data
  }
})
