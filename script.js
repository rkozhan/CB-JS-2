"use strict";

const questionsArray = [
    { question: "true && false", answer: "0" },
    { question: "false && false", answer: "0" },
    { question: "!false || true", answer: "1" },
    { question: "false ^ false", answer: "0" },
    { question: "!true || false", answer: "0" },
    { question: "true || (false && true)", answer: "0" },
    { question: "!(true && false)", answer: "0" },
    { question: "!true || (!false && !true)", answer: "0" },
    { question: "(!true || true) ^ (!false && false)", answer: "1" }
];

let NumOfQuestions = questionsArray.length;
let currentId;
let correct = 0;

const form = document.querySelector('form'),
    questions = document.querySelector('.questions'),
    questionOutput = document.getElementById('question'),
    resultOutput = document.getElementById('result'),
    bar = document.querySelector('.progress-bar__indicator');

// ==========================================================================================Start 
function startQuiz() {
    renderQuestions();
    showCurrentQuewstion(0);
    
    questions.addEventListener('click', e => {
        if (e.target.closest('p'))  showCurrentQuewstion(e.target.dataset.key);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        checkAnswer();
    })

    form.addEventListener('reset', e => {
        e.preventDefault();
        window.location.reload();
    })
}

//  ==================================================================================   Render all questions
const renderQuestions = () => {
    let questionsList = '';
    questionsArray.map(el => questionsList += `<p data-key="${questionsArray.indexOf(el)}"></p>`);
    questions.innerHTML += questionsList;
} 

// ===================================================================================   show chosen question
const showCurrentQuewstion = (id) => {
    currentId = id;
    questions.querySelectorAll('p').forEach(el => el.classList.remove('active'));
    
    getAndResetCheckboxes();
    
    const newCurrentEl = document.querySelector(`p[data-key="${id}"]`);
    newCurrentEl.classList.add('active');
    questionOutput.textContent = `Frage ${Number(id) +1}: ${questionsArray[currentId].question}`;
}

// ===================================================================================   check answer
const checkAnswer = () => {   
    const current = questions.querySelector('p.active');
    current.classList = "solved"; 
        
    if (questionsArray[currentId].answer === getAndResetCheckboxes()) {
        current.classList.add('ok');
        correct++;
    }

    NumOfQuestions--;
    updateProgressBar(NumOfQuestions);

    if (NumOfQuestions > 0) autoSwitchToNextQuestion(current);
    else endQuiz();
}

// ===================================================================================   auto switch to next question
const autoSwitchToNextQuestion = (current) => {
    let next = current.nextElementSibling;
    if (!next) next = questions.querySelector('p');

    if (next.classList.contains('solved')) autoSwitchToNextQuestion(next);
    else showCurrentQuewstion(next.dataset.key);
}

// ===================================================================================   end
const endQuiz = () => {
    const wrong = questionsArray.length - correct;
    document.querySelector('section').classList.add('finished');
    result.textContent = `✅${correct} (${Math.floor(correct / questionsArray.length *100)}%) / ❌${wrong} (${Math.floor(wrong / questionsArray.length *100)}%)`;
}

// ===================================================================================   progress bar
const updateProgressBar = (num) => {
    const percentage = Math.floor((questionsArray.length - num) / questionsArray.length *100);
    bar.style.width = `${percentage}%`;
}

// ===================================================================================   form checkboxes
const getAndResetCheckboxes = () => {
    const checked = form.querySelector('input:checked');
    if (checked) {
        checked.checked = false;
        return checked.value;
    }
}

window.onload = startQuiz;





