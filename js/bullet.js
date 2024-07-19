class Bullet {
    constructor(playerPos, playerSize) {

        this.playerPos = playerPos

        this.playerSize = playerSize

        this.bulletPos = {
            left: playerPos.left + playerSize.w / 2,
            top: playerPos.top - 10
        }

        this.bulletVel = {
            left: 1,
            top: 10
        }

        this.bulletSize = {
            w: 30,
            h: 30
        }

        this.init()
    }

    init() {
        this.bulletElement = document.createElement('img')
        this.bulletElement.src = "./img/bullet.png"

        this.bulletElement.style.position = 'absolute'
        this.bulletElement.style.backgroundColor = `transparent`
        this.bulletElement.style.width = `${this.bulletSize.w}px`
        this.bulletElement.style.height = `${this.bulletSize.h}px`
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`

        document.querySelector('#game-screen').appendChild(this.bulletElement)
    }

    move() {
        this.bulletPos.left += this.bulletVel.left
        this.bulletPos.top -= this.bulletVel.top

        if (this.bulletPos.top >= this.playerPos.top + this.playerSize.h) {
            this.bulletVel.top *= -1
        }

        this.updatePosition()
    }

    updatePosition() {
        this.bulletElement.style.top = `${this.bulletPos.top}px`
    }
}