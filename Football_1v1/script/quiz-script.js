let newbtnEl = document.getElementById('newQuestion')
let questionEl = document.getElementById('query')
let feedbackEl = document.getElementById('feedback')
let questionContainerEl = document.querySelector('.question-container')

let answerOneInput = document.getElementById('answer-one');
let answerTwoInput = document.getElementById('answer-two');
let answerThreeInput = document.getElementById('answer-three');
let answerFourInput = document.getElementById('answer-four');

let labelAnswerOne = document.getElementById('label-answer-one');
let labelAnswerTwo = document.getElementById('label-answer-two');
let labelAnswerThree = document.getElementById('label-answer-three');
let labelAnswerFour = document.getElementById('label-answer-four');

let subbtnEl = document.getElementById('submit')
let cashEl = document.querySelector('.cash')
let data

cashEl.innerHTML = Number(localStorage.teller)

newbtnEl.style.display = 'block'
subbtnEl.style.display = 'none'

questionContainerEl.style.display = 'none'

newbtnEl.addEventListener('click', getQuestion)

async function getQuestion(){
    let url = 'https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=1&difficulty=medium&tags=soccer'

    let response = await fetch(url, {
        headers: {
        'Content-Type': 'application/json'
        }
    })

    data = await response.json()

    questionEl.innerHTML = data[0].question

    choices = [data[0].correctAnswer, ...data[0].incorrectAnswers]

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    choices = shuffleArray(choices);

    answerOneInput.value = choices[0];
    answerTwoInput.value = choices[1];
    answerThreeInput.value = choices[2];
    answerFourInput.value = choices[3];

    labelAnswerOne.innerHTML = answerOneInput.value;
    labelAnswerTwo.innerHTML = answerTwoInput.value;
    labelAnswerThree.innerHTML = answerThreeInput.value;
    labelAnswerFour.innerHTML = answerFourInput.value;

    labelAnswerOne.classList.remove("correct", "wrong");
    labelAnswerTwo.classList.remove("correct", "wrong");
    labelAnswerThree.classList.remove("correct", "wrong");
    labelAnswerFour.classList.remove("correct", "wrong");

    const radioButtons = document.getElementsByName("q");
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = false;
    }

    questionContainerEl.style.display = 'grid'

    newbtnEl.style.display = 'none'
    subbtnEl.style.display = 'block'

    feedbackEl.innerHTML = '';
}

subbtnEl.addEventListener('click', answer)

function answer() {
    const radioButtons = document.getElementsByName("q");
    let selectedAnswer;

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedAnswer = radioButtons[i];
            break;
        }
    }

    const correctAnswer = document.querySelector(`input[value='${data[0].correctAnswer}']`);

    if (selectedAnswer && selectedAnswer.value === data[0].correctAnswer) {
        feedbackEl.innerHTML = "correct +10 coins";
        localStorage.teller = Number(localStorage.teller) + 10;
        cashEl.innerHTML = localStorage.teller;
        selectedAnswer.nextElementSibling.classList.add("correct");
    } else {
        feedbackEl.innerHTML = "wrong";
        if (selectedAnswer) {
            selectedAnswer.nextElementSibling.classList.add("wrong");
        }
        if (correctAnswer) {
            correctAnswer.nextElementSibling.classList.add("correct");
        }
    }

    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
        radioButtons[i].disabled = true;
    }

    newbtnEl.style.display = 'block';
    subbtnEl.style.display = 'none';
}

// function answer (){
//     const radioButtons = document.getElementsByName("q");

//     let selectedAnswer;

//     for (let i = 0; i < radioButtons.length; i++) {
//         if (radioButtons[i].checked) {
//             selectedAnswer = radioButtons[i].value;
//         }
//     }
        
//     if (selectedAnswer == data[0].correctAnswer){
//         feedbackEl.innerHTML = "correct +10 coins"
//         localStorage.teller = Number(localStorage.teller) + 10
//         cashEl.innerHTML = `${localStorage.teller}`
//         selectedAnswer.style.color = "green"
//     }else{
//         feedbackEl.innerHTML = "wrong"
//         selectedAnswer.style.color = "red"
//         data[0].correctAnswer.style.color = "green"
//     }

//     for (let i = 0; i < radioButtons.length; i++) {
//         radioButtons[i].checked = false;
//         radioButtons[i].disabled = true;
//     }

//     newbtnEl.style.display = 'block'
//     subbtnEl.style.display = 'none'
// }