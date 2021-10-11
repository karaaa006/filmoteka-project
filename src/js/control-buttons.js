const controlButtons = document.querySelector('.dinamic-content')


export default function changeButtonsColor() {
    showWatchedFilms()
    controlButtons.addEventListener('click', (event) => {
        const watchedButton = document.querySelector('#watched')
        const queueButton = document.querySelector('#queue')
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

// Вместо этих двух функций должен быть вызов функций по отрисовке библиотеки пользователя

function showWatchedFilms() {
    console.log('показать просмотренные фильмы')
}
function showQueue(){
    console.log('показать очередь воспроизведения')
}