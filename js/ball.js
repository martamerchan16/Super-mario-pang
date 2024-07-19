class Ball {

    constructor(gameSize, size, startingPosition, startingDirection, initiaslStage = 0) {

        this.gameSize = gameSize

        this.ballStage = initiaslStage

        this.shouldBeRemoved = false

        this.ballsSize = {
            w: size,
            h: size
        }

        this.ballsPos = {
            left: startingPosition.left,
            top: startingPosition.top
        }

        this.ballsPhysics = {
            speed: {
                left: startingDirection.left,
                top: startingDirection.top
            },

            gravity: .4
        }

        this.init()
    }

    init() {

        this.ballsElement = document.createElement('img')
        this.ballsElement.src = "./img/spiked-ball.png"

        this.ballsElement.style.position = 'absolute'
        this.ballsElement.style.width = `${this.ballsSize.w}px`
        this.ballsElement.style.height = `${this.ballsSize.h}px`
        this.ballsElement.style.left = `${this.ballsPos.left}px`
        this.ballsElement.style.top = `${this.ballsPos.top}px`

        document.querySelector('#game-screen').appendChild(this.ballsElement)
    }

    move() {

        this.ballsPhysics.speed.top += this.ballsPhysics.gravity
        this.ballsPos.top += this.ballsPhysics.speed.top
        this.ballsPos.left += this.ballsPhysics.speed.left

        this.checkBorderCollision()
        this.updatePosition()
    }

    updatePosition() {
        this.ballsElement.style.left = `${this.ballsPos.left}px`
        this.ballsElement.style.top = `${this.ballsPos.top}px`
    }

    checkBorderCollision() {
        if (this.ballsPos.top >= this.gameSize.h - this.ballsSize.h || this.ballsPos.top <= 0) {
            this.turnTop()
        }

        if (this.ballsPos.left >= this.gameSize.w - this.ballsSize.w || this.ballsPos.left <= 0) {
            this.turnLeft()
        }
    }

    turnTop() {
        this.ballsPhysics.speed.top *= -1
    }

    turnLeft() {
        this.ballsPhysics.speed.left *= -1
    }
}