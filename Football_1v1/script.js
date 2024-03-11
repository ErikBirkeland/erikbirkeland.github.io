let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let spiller1 = {
    x: 50,
    y: canvas.height / 2,
    width: 40,
    height: 80,
    color: "red", 
    speed: 5
}

let spiller2 = {
    x: canvas.width - 70,
    y: canvas.height / 2,
    width: 40,
    height: 80,
    color: "blue", 
    speed: 5
}

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    color: "black",
    speed: 3,
    directionX: 1,
    directionY: 1,
}

let goal1 = {
    x: 0,
    y: canvas.height / 2 - 40,
    width: 10,
    height: 80,
    color: "pink"
}

let goal2 = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 40,
    width: 10,
    height: 80,
    color: "pink"
}

function tegnSpiller() {
    ctx.fillStyle = spiller.color
    ctx.fillRect(spiller.x, spiller.y, spiller. width, spiller.height)
}

function tegnBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fillStyle = ball.color
    ctx.fill()
    ctx.closePath()
}

function tegnGoal() {
    ctx.fillStyle = goal.color
    ctx.fillRect(goal.x, goal.y, goal,width, goal.height)
}



