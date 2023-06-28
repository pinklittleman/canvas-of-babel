const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 429
canvas.height = 241

let pixels = []

class Pixel{
    constructor(x,y,h,w){
        this.x = x
        this.y = y
        this.h = h
        this.w = w
        this.r = 1
        this.g = 1
        this.b = 1
        pixels.push(this)
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`
        ctx.fillRect(this.x,this.y,this.h,this.w)
        ctx.closePath()
    }

}

let divid = 1
let DomElements = []
for (let i = 0; i < canvas.height; i+=3) {
    for (let j = 0; j < canvas.width; j+=3) {
        new Pixel(j,i,3,3)
        // const div = document.createElement("div");
        // divid++
        // div.id = `div_id${divid}` ;
        // div.style = "background-color: red;";
        // div.style.position = "absolute"
        // div.style.top = i+"px"
        // div.style.left = j+"px"
        // div.style.width = "2px";
        // div.style.height = "2px";
        // document.body.appendChild(div);
        // DomElements.push(div)
    
    }
}

function mainloop(){

    ctx.clearRect(0,0,canvas.width,canvas.height)

    pixels.forEach(pixel => {
        pixel.draw()
        
        pixel.r = Math.floor(Math.random(1) * 255)
        pixel.g = Math.floor(Math.random(1) * 255)
        pixel.b = Math.floor(Math.random(1) * 255)
    
    });


    // DomElements.forEach(divs => {
    //     // divs.style.position = "absolute"
    //     let size = Math.floor(Math.random(1) * 10)
    //     divs.style.width = size+"px";
    //     divs.style.height = size+"px";
    //     divs.style.top = Math.floor(Math.random(1) * canvas.height)+"px"
    //     divs.style.left = Math.floor(Math.random(1) * canvas.width)+"px"
    //     divs.style.background = `rgb(${Math.floor(Math.random(1) * 255)},${Math.floor(Math.random(1) * 255)},${Math.floor(Math.random(1) * 255)})`
    // });    


    setTimeout(() => {
        requestAnimationFrame(mainloop)
        
    }, 50);

}

requestAnimationFrame(mainloop)
