let buttonEl = document.getElementById("start")
let scoreEl = document.getElementById("score")

buttonEl.addEventListener('click', function startgame() {
    buttonEl.style.display = "none"
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1300;
    canvas.height = 500;

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
                    e.key === 'm'
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
                    e.key === 'm') {
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

            /*if (this.x < player2.x + player2.width &&
                this.x + this.width > player2.x &&
                this.y < player2.y + player2.height &&
                this.y + this.height > player2.y) {
                this.vx = 0
                player2.vx = 0
            }*/
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

            if (input.keys.includes('Space')) {
                if (ball.x < player2.x + player2.width &&
                    this.x + player2.width > player2.x &&
                    this.y < player2.y + player2.height &&
                    this.y + player2.height > player2.y) {
                    this.vx = this.maxVx
                    this.vy = this.maxVy
                }
            }

            /*if (player1.x < this.x + this.width &&
                player1.x + player1.width > this.x &&
                player1.y < this.y + this.height &&
                player1.y + player1.height > this.y) {
                console.log("kollisjon")
                player1.vx = 0
                this.vx = 0
            }*/
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
            this.xFriction = 0.3
            this.maxVx = 10
            this.bounce = 0.7
            this.image = document.getElementById("ball")
        }

        update() {
            this.x += this.vx
            this.y += this.vy
            this.vy += this.gravity

            if (!this.onGround()) this.vy += this.weight;
            else this.vy = -this.maxVy;

            // hvis ballen treffer vegg skal retning endres 
            if (this.x + this.width > game.width || this.x - this.width < 0) {
                this.vx *= -1
            }

            if (this.vy < 0 && this.vy > -6) {
                this.vy = 0;
            }

            if (this.y + this.width > game.height) { // ||
                this.y = game.height - this.height;
                this.vy *= -this.bounce;

                if (this.vy < 0 && this.vy > -17.809) {
                    this.vy = 0;
                }

                if (Math.abs(this.vx) < 1.1)
                    this.vx = 0;

                if (this.vx > 0) {
                    this.vx = this.vx - this.xFriction
                }
                if (this.vx < 0) {
                    this.vx = this.vx + this.xFriction
                }
            }

            if (this.x < player1.x + player1.width &&
                this.x + this.width > player1.x &&
                this.y < player1.y + player1.height &&
                this.y + this.height > player1.y) {
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

            if (input.keys.includes('e')) {
                if (this.x < player1.x + player1.width &&
                    this.x + player1.width > player1.x &&
                    this.y < player1.y + player1.height &&
                    this.y + player1.height > player1.y) {
                    this.vx = this.maxVx * 2
                    this.vy = this.maxVy * 2
                }
            }

            if (input.keys.includes('m')) {
                if (this.x < player2.x + player2.width &&
                    this.x + player2.width > player2.x &&
                    this.y < player2.y + player2.height &&
                    this.y + player2.height > player2.y) {
                    this.vx = -this.maxVx * 2
                    this.vy = this.maxVy * 2
                }
            }
            let red = 0
            let blue = 0

            if (this.x < 40 && this.y < 625) {
                console.log("goal")
                blue += 1
                score.innerHTML = `Red ${red.value} - ${blue.value} Blue`
            }


            if (this.x > 1250 && this.y < 625) {
                console.log("goal")
                red += 1
                score.innerHTML = `Red ${red.value} - ${blue.value} Blue`
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
            this.x = -110;
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
            this.x = 1160;
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
            context.fillRect(this.x, this.y, this.width, this.height)
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
            context.fillRect(this.x, this.y, this.width, this.height)
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
            context.fillRect(this.x, this.y, this.width, this.height)
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
            context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }

    let cloud4 = new Cloud4()

    function collision() {
        if (player1.x < player2.x + player2.width &&
            player1.x + player1.width > player2.x &&
            player1.y < player2.y + player2.height &&
            player1.y + player1.height > player2.y) {
            // Sett hastigheten til begge spillere til 0
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

            //player2.x += 2*player2.maxSpeed;
            //console.log("Kollisjon")
        }
    }

    animate();
})