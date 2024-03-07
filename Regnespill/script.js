const burgerE1 = document.querySelector('.fa-bars')


const navE1 = document.querySelector('nav')

burgerE1.addEventListener('click', showNav)

function showNav () {
    navE1.classList.toggle('show')
}