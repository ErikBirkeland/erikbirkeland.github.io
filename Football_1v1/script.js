const burgerEl = document.querySelector('.fa-bars')


const navEl = document.querySelector('nav')

burgerEl.addEventListener('click', showNav)

function showNav () {
    navEl.classList.toggle('show')
}






