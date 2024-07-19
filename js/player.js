class Player {

    constructor(gameSize) {
        this.gameSize = gameSize;
        this.bullets = [];

        this.playerSize = {
            w: 100,
            h: 100
        }

        this.playerPos = {
            left: 50,
            top: this.gameSize.h - this.playerSize.h - 10,
            base: this.gameSize.h - this.playerSize.h - 10,
        }

        this.playerSpeed = {
            left: 20,
            top: 5
        }

        this.lives = 3

        this.init()
    }

    init() {
        this.playerElement = document.createElement('img')
        this.playerElement.src = "./img/mario-running.png"

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`

        document.querySelector('#game-screen').appendChild(this.playerElement)
    }

    moveLeft() {

        if (this.playerPos.left >= this.gameSize.w - this.gameSize.w + this.playerSize.w / 2) {
            this.playerPos.left -= this.playerSpeed.left
        }

        this.updatePosition()
    }

    moveRight() {
        if (this.playerPos.left <= this.gameSize.w - this.playerSize.w - this.playerSize.w / 2) {
            this.playerPos.left += this.playerSpeed.left
        }

        this.updatePosition()
    }

    updatePosition() {
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
    }

    shoot() {
        this.bullets.push(new Bullet(this.playerPos, this.playerSize));
    }

    clearBullets() {

        this.bullets.forEach((bullet, idx) => {
            if (bullet.bulletPos.top <= this.gameSize.h - this.gameSize.h) {
                bullet.bulletElement.remove()
                this.bullets.splice(idx, 1)
            }
        })
    }

}

