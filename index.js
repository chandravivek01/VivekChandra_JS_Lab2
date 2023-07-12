const progress = document.querySelector('#progress');

// DOM selctors for Span (the 4-options)
const question = document.querySelector('#question');
const option1 = document.querySelector('#choice0');
const option2 = document.querySelector('#choice1');
const option3 = document.querySelector('#choice2');
const option4 = document.querySelector('#choice3');

// DOM selctors for Buttons (the 4-options)
const btn0 = document.querySelector('#btn0');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');

// Question-Number-Sequence 
let questionIndex = 0;
// Scores upgraded each time to render the final-score
let scores = 0;
let answerChosen;

// Storing the Questionaire (Question, Multiple-Options, Correct-Answer)
const questionList = [
    {
        statement: "Which language is used for styling web pages?",
        opt1: "HTML",
        opt2: "CSS",
        opt3: "JSON",
        opt4: "XML",
        answer: "CSS"
    },
    {
        statement: "Which of the below is a NoSQL Database",
        opt1: "MongoDB",
        opt2: "MySQL",
        opt3: "PostgreSQL",
        opt4: "None",
        answer: "MongoDB"
    },
    {
        statement: "Capital of India",
        opt1: "Jamshedpur",
        opt2: "Lucknow",
        opt3: "New Delhi",
        opt4: "Bangalore",
        answer: "New Delhi"
    }
];

// Populate the HTML(Webpage) with the Expected Questionaire
function loadQuestion(event) {

    let currentSet = questionList[questionIndex];
    progress.textContent = 'Question ' + (questionIndex + 1) + ' of '
        + (questionList.length);

    question.textContent = currentSet.statement;
    option1.textContent = currentSet.opt1;
    option2.textContent = currentSet.opt2;
    option3.textContent = currentSet.opt3;
    option4.textContent = currentSet.opt4;
}

// Loading next-question
function nextQuestion(event) {

    let buttonChosen = event.target.id;

    computeScore(buttonChosen);
    questionIndex = (questionIndex + 1);

    // If candidate has attempted all the questions
    if (questionIndex === questionList.length)
        getFinalScore();
    else
        loadQuestion();
}

// Checking whether the selecter answer matches with the actual answer
function computeScore(buttonChosen) {

    let currentSet = questionList[questionIndex];

    question.textContent = currentSet.statement;
    option1.textContent = currentSet.opt1;
    option2.textContent = currentSet.opt2;
    option3.textContent = currentSet.opt3;
    option4.textContent = currentSet.opt4;

    switch (buttonChosen) {
        case 'btn0':
            answerChosen = currentSet.opt1;
            break;
        case 'btn1':
            answerChosen = currentSet.opt2;
            break;
        case 'btn2':
            answerChosen = currentSet.opt3;
            console.log(answerChosen)
            break;
        case 'btn3':
            answerChosen = currentSet.opt4;
            break;
    }
    console.log("answer chosen: ", answerChosen);
    console.log("actual answer: ", currentSet.answer);
    if (answerChosen === currentSet.answer) {
        scores = scores + 1;
        console.log(scores);
    }

}

// Displaying the final-score (Result)
function getFinalScore() {

    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: (" + scores + " /" + questionList.length + ")" + ". And mark percentage is: " + (scores / questionList.length * 100).toFixed(2) + "%" + "</h2>"; // Upto 2 decimal places.
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
}

// Loading the current-question-set
loadQuestion();

// Listening to Onlick-button-events (if any)
btn0.addEventListener('click', nextQuestion);
btn1.addEventListener('click', nextQuestion);
btn2.addEventListener('click', nextQuestion);
btn3.addEventListener('click', nextQuestion);