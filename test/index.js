// const canvas = document.querySelector("canvas")
// const ctx  = canvas.getContext("2d")

// canvas.width = innerWidth
// canvas.height = innerHeight

// let balls = []
// const gravity = 9.8, friction = 0.01
// let ID = -1


// class Vector{
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//     }

//     add(v){
//         return new Vector(this.x+v.x, this.y+v.y);
//     }

//     subtr(v){
//         return new Vector(this.x-v.x, this.y-v.y);
//     }

//     mag(){
//         return Math.sqrt(this.x**2 + this.y**2);
//     }

//     mult(n){
//         return new Vector(this.x*n, this.y*n);
//     }

//     normal(){
//         return new Vector(-this.y, this.x).unit();
//     }

//     unit(){
//         if(this.mag() === 0){
//             return new Vector(0,0);
//         } else {
//             return new Vector(this.x/this.mag(), this.y/this.mag());
//         }
//     }
// }


// class Ball{
//     constructor(x,y,r){
//         ID++
//         this.pos = new Vector(x,y);
//         this.r = r;
//         this.vel = new Vector(0,0);
//         this.acc = new Vector(0,0);
//         this.acceleration = 1;
//         this.id = ID
//         this.col = "rgb(255,25,25)"
//         balls.push(this)
//     }

//     draw(){
//         ctx.fillStyle = this.col;
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
//         ctx.fill()
//     }
//     gravity(){
//         this.y += gravity
//     }
//     reposition(){
//         this.acc = this.acc.unit().mult(this.acceleration);
//         this.vel = this.vel.add(this.acc);
//         this.vel = this.vel.mult(1-friction);
//         this.pos = this.pos.add(this.vel);
//     }
// }


// function round(number, precision){
//     let factor = 10**precision;
//     return Math.round(number * factor) / factor;
// }

// function coll_det_bb(b1, b2){
//     if(b1.r + b2.r >= b2.pos.subtr(b1.pos).mag()){
//         return true;
//     } else {
//         return false;
//     }
// }

// function pen_res_bb(b1, b2){
//     let dist = b1.pos.subtr(b2.pos);
//     let pen_depth = b1.r + b2.r - dist.mag();
//     let pen_res = dist.unit().mult(pen_depth/2);
//     b1.pos = b1.pos.add(pen_res);
//     b2.pos = b2.pos.add(pen_res.mult(-1));
// }

// function coll_res_bb(b1, b2){
// 	//collision normal vector
//     let normal = b1.pos.subtr(b2.pos).unit();
//     //relative velocity vector
//     let relVel = b1.vel.subtr(b2.vel);
//     //separating velocity - relVel projected onto the collision normal vector
//     let sepVel = Vector.dot(relVel, normal);
//     //the projection value after the collision (multiplied by -1)
//     let new_sepVel = -sepVel;
//     //collision normal vector with the magnitude of the new_sepVel
//     let sepVelVec = normal.mult(new_sepVel);

//     //adding the separating velocity vector to the original vel. vector
//     b1.vel = b1.vel.add(sepVelVec);
//     //adding its opposite to the other balls original vel. vector
//     b2.vel = b2.vel.add(sepVelVec.mult(-1));
// }



// for (let i = 0; i < 20; i++) {
//     new Ball(Math.floor(Math.random(1)*canvas.width),Math.floor(Math.random(1)*canvas.height),Math.floor(Math.random(1)*50))    
// }


// function based(){
    
//     ctx.clearRect(0,0,canvas.width,canvas.height)

    
//     ctx.beginPath()
//     ctx.strokeStyle = "rgb(25,255,25)"
//     ctx.moveTo(0,canvas.height-10)
//     ctx.lineTo(canvas.width,canvas.height-10)
//     ctx.stroke()


//     balls.forEach((ball, index) => {
//         ball.draw()
//         for(let i = index+1; i<balls.length; i++){
//             if(coll_det_bb(balls[index], balls[i])){
//                 pen_res_bb(balls[index], balls[i]);
//                 coll_res_bb(balls[index], balls[i]);
//             }
//         }
//         ball.reposition();
//     });
//     setTimeout(() => {
        
//         requestAnimationFrame(based)
//     }, 0);
// }

// requestAnimationFrame(based)















const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight

const balls = []

let LEFT, UP, RIGHT, DOWN;
let friction = 0.05;

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(v){
        return new Vector(this.x+v.x, this.y+v.y);
    }

    subtr(v){
        return new Vector(this.x-v.x, this.y-v.y);
    }

    mag(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    mult(n){
        return new Vector(this.x*n, this.y*n);
    }

    normal(){
        return new Vector(-this.y, this.x).unit();
    }

    unit(){
        if(this.mag() === 0){
            return new Vector(0,0);
        } else {
            return new Vector(this.x/this.mag(), this.y/this.mag());
        }
    }

    drawVec(start_x, start_y, n, color){
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }
    
    static dot(v1, v2){
        return v1.x*v2.x + v1.y*v2.y;
    }
}

class Ball{
    constructor(x, y, r){
        this.pos = new Vector(x,y);
        this.r = r;
        this.vel = new Vector(0,0);
        this.acc = new Vector(0,0);
        this.acceleration = 1;
        this.player = false;
        balls.push(this);
    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    display(){
        this.vel.drawVec(550, 400, 10, "green");
        this.acc.unit().drawVec(550, 400, 50, "blue");
        ctx.beginPath();
        ctx.arc(550, 400, 50, 0, 2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

    reposition(){
        this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1-friction);
        this.pos = this.pos.add(this.vel);
    }
}

function keyControl(b){
    document.addEventListener('keydown', function(e){
        if(e.key === "a"){
            LEFT = true;
        }
        if(e.key === "w"){
            UP = true;
        }
        if(e.key === "d"){
            RIGHT = true;
        }
        if(e.key === "s"){
            DOWN = true;
        }
    });
    
    document.addEventListener('keyup', function(e){
        if(e.key === "a"){
            LEFT = false;
        }
        if(e.key === "w"){
            UP = false;
        }
        if(e.key === "d"){
            RIGHT = false;
        }
        if(e.key === "s"){
            DOWN = false;
        }
    });
    
    if(LEFT){
        b.acc.x = -b.acceleration;
    }
    if(UP){
        b.acc.y = -b.acceleration;
    }
    if(RIGHT){
        b.acc.x = b.acceleration;
    }
    if(DOWN){
        b.acc.y = b.acceleration;
    }
    if(!LEFT && !RIGHT){
        b.acc.x = 0;
    }
    if(!UP && !DOWN){
        b.acc.y = 0;
    }
}

function round(number, precision){
    let factor = 10**precision;
    return Math.round(number * factor) / factor;
}

function coll_det_bb(b1, b2){
    if(b1.r + b2.r >= b2.pos.subtr(b1.pos).mag()){
        return true;
    } else {
        return false;
    }
}

function pen_res_bb(b1, b2){
    let dist = b1.pos.subtr(b2.pos);
    let pen_depth = b1.r + b2.r - dist.mag();
    let pen_res = dist.unit().mult(pen_depth/2);
    b1.pos = b1.pos.add(pen_res);
    b2.pos = b2.pos.add(pen_res.mult(-1));
}

//collision resolution
//calculates the balls new velocity vectors after the collision
function coll_res_bb(b1, b2){
	//collision normal vector
    let normal = b1.pos.subtr(b2.pos).unit();
    //relative velocity vector
    let relVel = b1.vel.subtr(b2.vel);
    //separating velocity - relVel projected onto the collision normal vector
    let sepVel = Vector.dot(relVel, normal);
    //the projection value after the collision (multiplied by -1)
    let new_sepVel = -sepVel;
    //collision normal vector with the magnitude of the new_sepVel
    let sepVelVec = normal.mult(new_sepVel);

    //adding the separating velocity vector to the original vel. vector
    b1.vel = b1.vel.add(sepVelVec);
    //adding its opposite to the other balls original vel. vector
    b2.vel = b2.vel.add(sepVelVec.mult(-1));
}

function momentum_display(){
    let momentum = Ball1.vel.add(Ball2.vel).mag();
    ctx.fillText("Momentum: "+round(momentum, 4), 500, 330);
}

for (let i = 0; i < 400; i++) {
    new Ball(Math.random()*canvas.width, Math.random()*canvas.height,40)
    
}


function mainLoop(timestamp) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    balls.forEach((b, index) => {
        b.drawBall();
        if (b.player){
            keyControl(b);
        }
        for(let i = index+1; i<balls.length; i++){
            if(coll_det_bb(balls[index], balls[i])){
                pen_res_bb(balls[index], balls[i]);
                coll_res_bb(balls[index], balls[i]);
            }
        }
        b.display();
        b.reposition();
    });
    momentum_display();

    requestAnimationFrame(mainLoop);
}

let Ball1 = new Ball(200, 200, 30);
let Ball2 = new Ball(300, 250, 40);
Ball1.player = true;

requestAnimationFrame(mainLoop);
