let buttonEl = document.getElementById("start")
let scoreboardEl = document.querySelector(".scoreboard")
let scoreRedEl = document.querySelector(".scoreboard_score-one")
let scoreBlueEl = document.querySelector(".scoreboard_score-two")
let celebrationEl = document.getElementById("celebration")
let gameOverEl = document.getElementById("game-over")
let canvasEl = document.getElementById("canvas1")
let playAgainbtn = document.getElementById("play-again")
let resultEl = document.getElementById("result")

playAgainbtn.style.display = "none"
scoreboardEl.style.display = "none"

const startingMinutes = 2
let time = startingMinutes / 60

const countdownEl = document.getElementById("countdown")

buttonEl.addEventListener('click', function startgame() {
    buttonEl.style.display = "none"
    scoreboardEl.style.display = "grid"

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1300;
    canvas.height = 500;

    const startingMinutes = 0.1
    let time = startingMinutes * 60

    setInterval(updateCountdown, 1000)

    function updateCountdown() {
        const minutes = Math.floor(time / 60)
        let seconds = time % 60

        seconds = seconds < 10 ? '0' + seconds : seconds

        countdownEl.innerHTML = `${minutes}:${seconds}`
        time--

        if (time < 0) {
            time = 0
            ball.vx = 0
        }

        if (time === 0) {
            setTimeout(gameOver, 1000)
        }
    }

    function gameOver() {
        canvasEl.style.display = "none"
        gameOverEl.innerHTML = "Game over"

        countdownEl.style.display = "none"

        playAgainbtn.style.display = "block"

        resultEl.style.display = "block"

        if (scoreBlueEl.textContent > scoreRedEl.textContent) {
            resultEl.innerHTML = "Blue wins"
        }
        else if (scoreBlueEl.textContent === scoreRedEl.textContent) {
            resultEl.innerHTML = "Draw"
        }
        else {
            resultEl.innerHTML = "Red wins"
        }

        playAgainbtn.addEventListener('click', function reloadGame() {
            window.location.reload()
        })
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }

        update() {
            player1.update()
            player2.update()
            ball.update()
            collision()
        }

        draw(context) {
            player1.draw(context)
            player2.draw(context)
            ball.draw(context)
            goal1.draw(context)
            goal2.draw(context)
            cloud1.draw(context)
            cloud2.draw(context)
            cloud3.draw(context)
            cloud4.draw(context)
        }
    }

    let game = new Game(canvas.width, canvas.height);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', e => {
                console.log(e.key, this.keys);
                if ((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 'd' ||
                    e.key === 's' ||
                    e.key === 'e' ||
                    e.key === 'Shift'
                ) && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', e => {
                if (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 'd' ||
                    e.key === 's' ||
                    e.key === 'e' ||
                    e.key === 'Shift') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    let input = new InputHandler()

    class Player1 {
        constructor() {
            this.width = 100;
            this.height = 140;
            this.x = 100;
            this.y = game.height - this.height;
            this.vy = 0;
            this.weight = 1
            this.image = document.getElementById("player1")
            this.speed = 0;
            this.maxSpeed = 10;
        }

        update() {
            // horizontal movement
            this.x += this.speed;
            if (input.keys.includes('d')) this.speed = this.maxSpeed;
            else if (input.keys.includes('a')) this.speed = -this.maxSpeed;
            else this.speed = 0;
            if (this.x < 0) this.x = 0;
            if (this.x > game.width - this.width) this.x = game.width - this.width;

            //vertical movement
            if (input.keys.includes('w') && this.onGround()) this.vy = -20;
            this.y += this.vy;
            if (!this.onGround()) this.vy += this.weight;
            else this.vy = 0;
        }

        draw(context) {
            context.fillStyle = "rgba(255, 255, 255, 0)"
            context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)
        }

        onGround() {
            return this.y >= game.height - this.height;
        }
    }

    let player1 = new Player1()

    class Player2 {
        constructor() {
            this.width = 100;
            this.height = 112;
            this.x = 1115;
            this.y = game.height - this.height;
            this.vy = 0;
            this.weight = 1
            this.image = document.getElementById("player2")
            this.speed = 0;
            this.maxSpeed = 10;
        }

        update() {
            // horizontal movement
            this.x += this.speed;
            if (input.keys.includes('ArrowRight')) this.speed = this.maxSpeed;
            else if (input.keys.includes('ArrowLeft')) this.speed = -this.maxSpeed;
            else this.speed = 0;
            if (this.x < 0) this.x = 0;
            if (this.x > game.width - this.width) this.x = game.width - this.width;

            //vertical movement
            if (input.keys.includes('ArrowUp') && this.onGround()) this.vy = -20;
            this.y += this.vy;
            if (!this.onGround()) this.vy += this.weight;
            else this.vy = 0;
        }

        draw(context) {
            context.fillStyle = "rgba(255,255,255, 0)"
            context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)
        }

        onGround() {
            return this.y >= game.height - this.height;
        }
    }

    let player2 = new Player2()

    class Ball {
        constructor() {
            this.height = 40
            this.width = 40
            this.weight = 0.1
            this.x = (game.width / 2) - 20
            this.y = game.height - this.height * 10
            this.vx = 0
            this.vy = -2
            this.maxVy = -8
            this.gravity = 0.3
            this.xFriction = 0.2
            this.maxVx = 10
            this.bounce = 0.85
            this.image = document.getElementById("ball")
        }

        update() {
            this.x += this.vx
            this.y += this.vy
            this.vy += this.gravity

            // hvis ballen treffer vegg skal retning endres 
            if (this.x + this.width > game.width || this.x - this.width < 0) {
                this.vx *= -1
            }

            // ballens bevegelser når ingenting hindrer den
            if (this.y + this.height > game.height) { 
                this.vy *= -this.bounce;

                if (Math.abs(this.vx) < 1.1)
                    this.vx = 0;

                if (this.vx > 0) {
                    this.vx = this.vx - this.xFriction
                }
                if (this.vx < 0) {
                    this.vx = this.vx + this.xFriction
                }
            }

            if (this.vy < 0 && this.vy > -2) {
                this.vy = 0;
            }

            // sjekk kollisjon med player1
            if (this.x < player1.x + player1.width &&
                this.x + this.width > player1.x &&
                this.y < player1.y + player1.height &&
                this.y + this.height > player1.y) {
                // Behandle kollisjon med player1
                this.vx = this.maxVx
            }

            // Sjekk kollisjon med player2
            if (this.x < player2.x + player2.width &&
                this.y < player2.y + player2.height &&
                this.x + this.width > player2.x &&
                this.y + this.height > player2.y) {
                // Behandle kollisjon med player2
                this.vx = -this.maxVx
            }

            // sparke knapp
            if (input.keys.includes('e')) {
                if (this.x < player1.x + player1.width &&
                    this.x + player1.width > player1.x &&
                    this.y < player1.y + player1.height &&
                    this.y + player1.height > player1.y) {
                    this.vx = this.maxVx * 2
                    this.vy = this.maxVy * 1.4
                }
            }

            if (input.keys.includes('Shift')) {
                if (this.x < player2.x + player2.width &&
                    this.x + player2.width > player2.x &&
                    this.y < player2.y + player2.height &&
                    this.y + player2.height > player2.y) {
                    this.vx = -this.maxVx * 2
                    this.vy = this.maxVy * 1.4
                }
            }

            // sjekke kollisjon med mål
            if (this.x < 50 && this.y > 240) {
                celebrationEl.play()
                scoreBlueEl.textContent = Number(scoreBlueEl.textContent) + 1;
                scoreboardEl.querySelector(".scoreboard_score-one").textContent = scoreRedEl.textContent;
                scoreboardEl.querySelector(".scoreboard_score-two").textContent = scoreBlueEl.textContent;
                player1.x = 100;
                player2.x = 1115;
                this.x = (game.width / 2) - 20
                this.y = game.height - this.height * 10
                this.vx = 0;
            }


            if (this.x > 1220 && this.y > 240) {
                celebrationEl.play()
                scoreRedEl.textContent = Number(scoreRedEl.textContent) + 1;
                scoreboardEl.querySelector(".scoreboard_score-one").textContent = scoreRedEl.textContent;
                scoreboardEl.querySelector(".scoreboard_score-two").textContent = scoreBlueEl.textContent;
                player1.x = 100;
                player2.x = 1115;
                this.x = (game.width / 2) - 20
                this.y = game.height - this.height * 10
                this.vx = 0;
            }
        }

        draw(context) {
            context.fillStyle = "rgba(255, 255, 255, 0)"
            context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }

        onGround() {
            return this.y >= game.height - this.height;
        }

    }
    let ball = new Ball()

    class Goal1 {
        constructor() {
            this.height = 625;
            this.width = 250;
            this.x = -145;
            this.y = 52;
            this.image = document.getElementById('goal1');
        }

        draw(context) {
            context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }

    let goal1 = new Goal1()

    class Goal2 {
        constructor() {
            this.height = 625;
            this.width = 250;
            this.x = 1195;
            this.y = 52;
            this.image = document.getElementById("goal2");
        }

        draw(context) {
            context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }

    let goal2 = new Goal2()

    class Cloud1 {
        constructor() {
            this.height = 100;
            this.width = 200;
            this.x = 50;
            this.y = 70;
            this.image = document.querySelector(".cloud");
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }

    let cloud1 = new Cloud1()

    class Cloud2 {
        constructor() {
            this.height = 100;
            this.width = 200;
            this.x = 350;
            this.y = 30;
            this.image = document.querySelector(".cloud");
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }

    let cloud2 = new Cloud2()

    class Cloud3 {
        constructor() {
            this.height = 100;
            this.width = 200;
            this.x = 700;
            this.y = 80;
            this.image = document.querySelector(".cloud");
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }

    let cloud3 = new Cloud3()

    class Cloud4 {
        constructor() {
            this.height = 100;
            this.width = 200;
            this.x = 1000;
            this.y = 40;
            this.image = document.querySelector(".cloud");
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }

    let cloud4 = new Cloud4()

    function collision() {
        if (player1.x < player2.x + player2.width &&
            player1.x + player1.width > player2.x &&
            player1.y < player2.y + player2.height &&
            player1.y + player1.height > player2.y) {

            if (player1.speed > 0) {
                player1.x -= 2 * player1.maxSpeed;
            } else if (player1.speed < 0) {
                player1.x += 2 * player1.maxSpeed;
            }

            if (player2.speed > 0) {
                player2.x -= 2 * player2.maxSpeed;
            } else if (player2.speed < 0) {
                player2.x += 2 * player2.maxSpeed;
            }


        }
    }

    animate();
})
