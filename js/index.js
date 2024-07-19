window.onload = () => {

    document.querySelector('.buttonStart').onclick = () => {
        Game.init()
        document.querySelector('#startPage').style.display = "none"
        document.querySelector('.counterLives').style.display = "flex"

        const audioPlayer = document.querySelector('.musicGame')
        audioPlayer.play()
    }

}


