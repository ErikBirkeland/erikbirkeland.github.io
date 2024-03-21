const burgerEl = document.querySelector('.fa-bars')


const navEl = document.querySelector('nav')

burgerEl.addEventListener('click', showNav)

function showNav () {
    navEl.classList.toggle('show')
}

let coins = 0


// Kode til quiz-siden
let newbtnEl = document.getElementById('newQuestion')
let questionEl = document.getElementById('query')
let feedbackEl = document.getElementById('feedback')
let answerEl = document.getElementById('answer')
let subbtnEl = document.getElementById('submit')
let cashEl = document.querySelector('.cash')
let data

newQuestion.style.display = 'block'
submit.style.display = 'none'

newbtnEl.addEventListener('click', getQuestion)

async function getQuestion(){
    let url = 'https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=1&difficulty=medium&tags=soccer'

    let response = await fetch(url, {
        headers: {
        'Content-Type': 'application/json'
        }
    })

    data = await response.json()

    //console.log(response)

    console.log(data)

    questionEl.innerHTML = data[0].question

    newQuestion.style.display = 'none'
    submit.style.display = 'block'
    }

subbtnEl.addEventListener('click', answer)

function answer (){
    if (answerEl.value == data[0].correctAnswer){
        feedbackEl.innerHTML ="correct +10 coins"
        coins = coins+10
        cashEl.innerHTML = `${coins}`
    }
    else{
        feedbackEl.innerHTML = "wrong"
    }
    newQuestion.style.display = 'block'
    submit.style.display = 'none'
    }

    