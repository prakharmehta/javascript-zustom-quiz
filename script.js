const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const quesContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;
const submitButton = document.getElementById("submit-btn");
const container = document.getElementById("container");
var oops = document.getElementById("oops");
var yes = document.getElementById("yes");
const begin = document.getElementById("begin");
const quizSong = document.getElementById("quizSong");

function playAudioOops() {
  oops.play();
}

function playAudioYes() {
  yes.play();
}

const startGame = () => {
  quizSong.play();
  begin.classList.add("hide");
  startButton.classList.add("hide");
  quesContainerElement.classList.remove("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
};

const showQuestion = (question) => {
  questionElement.innerText = question.question;
  question.answers.map((answer) => {
    const button = document.createElement("a");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.classList.add("waves-effect");
    button.classList.add("waves-light");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
};

const resetState = () => {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
};

const setNextQuestion = () => {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

const clearStatusClass = (element) => {
  element.classList.remove("correct");
  element.classList.remove("wrong");
};

const setStatusClass = (element, correct) => {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    element.classList.add("modal-trigger");
    element.setAttribute("href", "#modal2");
  } else {
    element.classList.add("wrong");
    element.classList.add("modal-trigger");
    element.setAttribute("href", "#modal1");
  }
};

const selectAnswer = (e) => {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  Array.from(answerButtonsElement.children).map((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (!correct) {
    playAudioOops();
  } else {
    playAudioYes();
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
    } else {
      // startButton.innerText = "Restart";
      // startButton.classList.remove("hide");
      submitButton.classList.remove("hide");
    }
  }
};

const showCarousel = () => {
  container.classList.add("hide");
  carouselElement.classList.remove("hide");
};

submitButton.addEventListener("click", showCarousel);

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, {
    dismissible: true,
  });
});

const questions = [
  {
    question: "What is Prakhar's name in Rishabh's Contact list?",
    answers: [
      { text: "Prakhar Mehra (OS) (VIT)", correct: true },
      { text: "Prakhar (OS) (VIT)", correct: false },
      { text: "Prakhar (Anukrati)", correct: false },
      { text: "Bestie", correct: false },
    ],
  },
  {
    question: "UK north America mein hai ya South America?",
    answers: [
      { text: "USA", correct: false },
      { text: "South America", correct: false },
      { text: "North america", correct: true },
      { text: "Europe", correct: false },
    ],
  },
  {
    question: "Anu ki mammi usko kya name se bulati hai?",
    answers: [
      { text: "Anukrati", correct: false },
      { text: "Area", correct: true },
      { text: "Anukarti Medam", correct: false },
      { text: "Ooo Chudail", correct: false },
    ],
  },
  {
    question: "Prakhar ko kya pasand?",
    answers: [
      { text: "Rishab", correct: false },
      { text: "Bandiyaan", correct: true },
      { text: "Rathi R", correct: false },
      { text: "Bandi", correct: false },
    ],
  },
  {
    question: "Australia konsi country ki capital hai?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Santorini", correct: false },
      { text: "Perth", correct: false },
      { text: "Canberra", correct: true },
    ],
  },
];
