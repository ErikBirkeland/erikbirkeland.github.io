const burgerEl = document.querySelector('.fa-bars')


const navEl = document.querySelector('nav')

burgerEl.addEventListener('click', showNav)

function showNav () {
    navEl.classList.toggle('show')
}

if(!localStorage.teller){
    localStorage.teller = 0
}else{
    localStorage.teller = Number(localStorage.teller)
}

cashEl = document.querySelector('.cash')

cashEl.innerHTML = Number(localStorage.teller)



