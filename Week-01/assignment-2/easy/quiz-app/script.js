// Quiz data is loaded from data.js
let questions = quizData || [];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const submitBtn = document.getElementById('submitBtn');
const questionCount = document.getElementById('questionCount');
const progressFill = document.getElementById('progressFill');
const quizSection = document.getElementById('quizSection');
const resultSection = document.getElementById('resultSection');
const scoreText = document.getElementById('scoreText');
const scoreMessage = document.getElementById('scoreMessage');
const restartBtn = document.getElementById('restartBtn');

function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    
    questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    
    optionsContainer.innerHTML = '';
    const options = ['a', 'b', 'c', 'd'];
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = `${option.toUpperCase()}) ${question[option]}`;
        button.dataset.answer = option;
        
        button.addEventListener('click', () => selectAnswer(option, button));
        
        optionsContainer.appendChild(button);
    });
    
    selectedAnswer = null;
    submitBtn.disabled = true;
    submitBtn.textContent = currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Submit Answer';
}

function selectAnswer(answer, button) {
    if (submitBtn.classList.contains('answered')) return;
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    selectedAnswer = answer;
    submitBtn.disabled = false;
}

function checkAnswer() {
    const question = questions[currentQuestion];
    const correctAnswer = question.correct;
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.add('disabled');
        
        if (btn.dataset.answer === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.dataset.answer === selectedAnswer && selectedAnswer !== correctAnswer) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    
    submitBtn.classList.add('answered');
    submitBtn.textContent = currentQuestion === questions.length - 1 ? 'View Results' : 'Next Question';
}

function nextQuestion() {
    submitBtn.classList.remove('answered');
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    const percentage = Math.round((score / questions.length) * 100);
    scoreText.textContent = `${score}/${questions.length}`;
    
    if (percentage >= 80) {
        scoreMessage.textContent = 'Excellent! You did a great job!';
    } else if (percentage >= 60) {
        scoreMessage.textContent = 'Good job! Keep practicing!';
    } else if (percentage >= 40) {
        scoreMessage.textContent = 'Not bad, but there is room for improvement.';
    } else {
        scoreMessage.textContent = 'Keep learning and try again!';
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    quizSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
    
    loadQuestion();
}

submitBtn.addEventListener('click', () => {
    if (submitBtn.classList.contains('answered')) {
        nextQuestion();
    } else {
        checkAnswer();
    }
});

restartBtn.addEventListener('click', restartQuiz);

// Initialize quiz
loadQuestion();