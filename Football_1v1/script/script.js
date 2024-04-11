const burgerEl = document.querySelector('.fa-bars')


const navEl = document.querySelector('nav')

burgerEl.addEventListener('click', showNav)

function showNav () {
    navEl.classList.toggle('show')
}

cashEl = document.querySelector('.cash')

cashEl.innerHTML = Number(localStorage.teller)

