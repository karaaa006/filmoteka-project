const navList = document.querySelector('.navigation-list')
const homeButton = document.querySelector('#home')
const myLybraryButton = document.querySelector('#my_lybrary')



export default function navButtons() {
    navList.addEventListener('click', (event) => {
        console.log(event.target)
        console.log(homeButton)
        console.log(myLybraryButton)
    })
   
}