// Template/ Prototype for multiple-students (if any, NA here) 
function Quiz(questions) {

  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

// Fetching a question-set from the Question-Object
Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {

  if (this.getQuestionByIndex().isCorrectAnswer(answer))
    this.score++;

  this.questionIndex++;
}

// Checking if all the questions are attempted
Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
}

// Template/ Prototype for Questionaire (Question, 4-Options, Correct Answer)
function Question(text, choices, answer) {

  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

// Equating the chosen-answer with the actual-answer from the question-set
Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
}


function loadQuestions() {

  if (quiz.isEnded())
    showScores();

  else {

    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionByIndex().text;

    // show options
    var choices = quiz.getQuestionByIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      handleOptionButton("btn" + i, choices[i]);
    }

    showProgress();
  }
};

// Listening to Button-Click-event
function handleOptionButton(id, choice) {

  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
  }
};

// Tracking the Question-Number-Set
function showProgress() {

  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

// Displaying the final-score (Result)
function showScores() {

  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + " .And Mark's in percentage is: " + (quiz.score / questions.length * 100).toFixed(2) + "%" + "</h2>"; // upto 2 decimal places.
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// Creating the questions
var questions = [

  new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

// Creating the quiz
var quiz = new Quiz(questions);

// Loding the questions in the webpage
loadQuestions();