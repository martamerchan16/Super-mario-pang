const Game = {

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    keys: {
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight',
        SHOOT: 'Space'
    },

    receivesDamage: true,
    canExplode: true,
    leftKeyPressed: false,
    rightKeyPressed: false,

    hasWon: false,
    hasLost: false,

    player: undefined,
    ballsArr: [],
    currentBallCollided: undefined,


    init() {
        this.setDimensions()
        this.start()
    },

    setDimensions() {
        document.querySelector("#game-screen").style.width = `${this.gameSize.w}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.h}px`
    },

    start() {

        this.createElements()
        this.setEventListeners()
        this.startGameLoop()

    },

    createElements() {
        this.player = new Player(this.gameSize)
        this.ballsArr.push(new Ball(this.gameSize, 150, { left: 0, top: 0 }, { left: 10, top: 5 }))
        this.ballsArr.push(new Ball(this.gameSize, 150, { left: 100, top: 100 }, { left: 10, top: 5 }))
    },

    setEventListeners() {
        document.onkeydown = event => {

            if (event.code === this.keys.LEFT) {
                this.leftKeyPressed = true;
            } else if (event.code === this.keys.RIGHT) {
                this.rightKeyPressed = true;
            } else if (event.code === this.keys.SHOOT) {
                this.player.shoot()
            }
        }

        document.onkeyup = event => {

            if (event.code === this.keys.LEFT) {
                this.leftKeyPressed = false;
            } else if (event.code === this.keys.RIGHT) {
                this.rightKeyPressed = false;
            }
        }
    },

    startGameLoop() {

        setInterval(() => {
            this.checkCollisions()
            this.moveAll()
            this.clearAll()
            this.reloadPages()
        }, 60)
    },

    checkCollisions() {
        if (this.isCollisionBallsWithPlayer()) this.deleteLives()
        if (this.isCollisionBallsWithBullets()) this.handleBallCreation()
        if (this.ballsArr.length === 0 && !this.hasWon) this.winGame()
    },

    moveAll() {

        if (this.leftKeyPressed) {
            this.player.moveLeft()
        }
        if (this.rightKeyPressed) {
            this.player.moveRight()
        }

        this.ballsArr.forEach((eachBall) => {
            eachBall.move()
        })

        this.player.bullets.forEach(elm => {
            elm.move()
        })

    },

    handleBallCreation() {

        if (this.canExplode && this.currentBallCollided.ballStage === 0) {

            this.currentBallCollided.shouldBeRemoved = true
            this.clearBall()

            this.currentBallCollided.ballStage++

            this.ballsArr.push(new Ball(this.gameSize, 100, this.currentBallCollided.ballsPos, { left: -15, top: -5 }, 1))
            this.ballsArr.push(new Ball(this.gameSize, 100, this.currentBallCollided.ballsPos, { left: 15, top: -5 }, 1))
            this.canExplode = false

            setTimeout(() => this.canExplode = true, 1000)

        } else if (this.canExplode && this.currentBallCollided.ballStage === 1) {

            this.currentBallCollided.shouldBeRemoved = true
            this.clearBall()

            this.currentBallCollided.ballStage++

            this.ballsArr.push(new Ball(this.gameSize, 50, this.currentBallCollided.ballsPos, { left: -15, top: -5 }, 2))
            this.ballsArr.push(new Ball(this.gameSize, 50, this.currentBallCollided.ballsPos, { left: 15, top: -5 }, 2))
            this.canExplode = false

            setTimeout(() => this.canExplode = true, 1000)

        } else if (this.canExplode && this.currentBallCollided.ballStage === 2) {

            this.currentBallCollided.shouldBeRemoved = true
            this.clearBall()
            this.canExplode = false
            setTimeout(() => this.canExplode = true, 1000)
        }
    },

    clearAll() {
        this.player.clearBullets()
    },

    isCollisionBallsWithBullets() {

        for (let i = 0; i < this.ballsArr.length; i++) {

            for (let j = 0; j < this.player.bullets.length; j++) {

                if (
                    this.player.bullets[j].bulletPos.left + this.player.bullets[j].bulletSize.w >= this.ballsArr[i].ballsPos.left &&
                    this.player.bullets[j].bulletPos.top + this.player.bullets[j].bulletSize.h >= this.ballsArr[i].ballsPos.top &&
                    this.player.bullets[j].bulletPos.left <= this.ballsArr[i].ballsPos.left + this.ballsArr[i].ballsSize.w &&
                    this.player.bullets[j].bulletPos.top <= this.ballsArr[i].ballsPos.top + this.ballsArr[i].ballsSize.h) {

                    this.currentBallCollided = this.ballsArr[i]

                    return true
                }
            }
        }
    },

    clearBall() {
        this.ballsArr.forEach((ball, idx) => {

            if (ball.shouldBeRemoved) {

                ball.ballsElement.remove()

                this.ballsArr.splice(idx, 1)
            }
        })
    },

    isCollisionBallsWithPlayer() {

        for (let i = 0; i < this.ballsArr.length; i++) {
            if (
                this.player.playerPos.left + this.player.playerSize.w >= this.ballsArr[i].ballsPos.left &&
                this.player.playerPos.top + this.player.playerSize.h >= this.ballsArr[i].ballsPos.top &&
                this.player.playerPos.left <= this.ballsArr[i].ballsPos.left + this.ballsArr[i].ballsSize.w &&
                this.player.playerPos.top <= this.ballsArr[i].ballsPos.top + this.ballsArr[i].ballsSize.h
            ) {
                return true
            }
        }
    },

    deleteLives() {

        if (this.isCollisionBallsWithPlayer() && this.player.lives > 0 && this.receivesDamage === true) {
            this.player.lives -= 1
            this.receivesDamage = false

            setTimeout(() => this.receivesDamage = true, 1000)
        }
        if (this.player.lives === 2) {
            document.querySelector('.live3').style.display = "none"
        }
        if (this.player.lives === 1) {
            document.querySelector('.live2').style.display = "none"
        }

        if (this.player.lives === 0 && !this.hasLost) {
            document.querySelector('.live1').style.display = "none"
            this.gameOver()
        }
    },

    gameOver() {
        this.hasLost = true

        document.querySelector('#game-screen').style.display = "none"
        document.querySelector('#gameOver').style.display = "flex"

        const audioPlayer = document.querySelector('.musicGame')
        audioPlayer.pause()

        const audioGameOver = document.querySelector('.musicGameOver')
        audioGameOver.play()
    },

    winGame() {
        this.hasWon = true

        document.querySelector('#game-screen').style.display = "none"
        document.querySelector('#win').style.display = "flex"

        const audioPlayer = document.querySelector('.musicGame');
        audioPlayer.pause();

        const audioWin = document.querySelector('.musicWin')
        audioWin.play()
    },

    reloadPages() {
        document.querySelector('.buttonReload1').onclick = () => {
            location.reload()
        }

        document.querySelector('.buttonReload').onclick = () => {
            location.reload()
        }
    }

}