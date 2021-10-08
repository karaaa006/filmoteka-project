const controlButtons = document.querySelector('.control-buttons')
const watchedButton = document.querySelector('#watched')
const queueButton = document.querySelector('#queue')

export default function changeButtonsColor() {
    showWatchedFilms()
    controlButtons.addEventListener('click', (event) => {
        if (event.target.classList.contains('active')) {
            return
        } else if (event.target === watchedButton) {
            queueButton.classList.remove('active')
            watchedButton.classList.add('active')
            showWatchedFilms()
        } else if (event.target === queueButton) {
            watchedButton.classList.remove('active')
            queueButton.classList.add('active')
            showQueue()
        }
    })
}

function showWatchedFilms() {
    console.log('показать просмотренные фильмы')
}
function showQueue(){
    console.log('показать очередь воспроизведения')
}