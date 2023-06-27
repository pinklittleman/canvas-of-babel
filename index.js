const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 640
canvas.height = 480

function mainloop(){

    ctx.clearRect(0,0,canvas.width,canvas.height)

    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fillRect(100,100,100,100)

    requestAnimationFrame(mainloop)
}

requestAnimationFrame(mainloop)