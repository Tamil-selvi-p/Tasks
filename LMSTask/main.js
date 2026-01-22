// function getQuestionNumber() {}

// setInterval(showTime, 1000);

// function showTime() {
//   const date = new Date();
  
//   const hours = date.getHours() >12 ? date.getHours() - 12 : "0"+date.getHours();
//   const minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
//   const seconds = date.getSeconds() <10 ? "0"+date.getSeconds() : date.getSeconds();
//   const AmPm = date.getHours() < 12 ? "AM" : "PM";

//   // ensure element reference exists
//   const time = document.querySelector(".time");
//   if (time) {
//       time.innerHTML = "Time: "+ hours + ":" + minutes + ":" + seconds + " "+AmPm;
//   }
// };

const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');

startBtn.addEventListener('click', () => {
     popupInfo.classList.add('active');
     main.classList.add('active');
});

exitBtn.addEventListener('click', () => {
     popupInfo.classList.remove('active');
     main.classList.remove('active');
});

continueBtn.addEventListener('click', () => {
     quizSection.classList.add('active');
     popupInfo.classList.remove('active');
     main.classList.remove('active');
     quizBox.classList.add('active');

     showQuestions(0);
     questionCounter(1);
     headerScore();
});

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener('click', () => {
     if(questionCount < questions.length -1) {
          questionCount++;
          showQuestions(questionCount);

          questionNumber++;
          questionCounter(questionNumber);

          nextBtn.classList.remove('active');
     } else {
          console.log('Questions completed');
     }
});

const optionList = document.querySelector('.option-list');

//getting questions and answer from array

function showQuestions(index) {
     const questionText = document.querySelector('.question-text');
     questionText.textContent = `${questions[index].number}. ${questions[index].question}`;

     let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;

     optionList.innerHTML = optionTag;

     const option = document.querySelectorAll('.option');
     for(let i = 0; i < option.length; i++) {
          option[i].setAttribute('onclick', 'optionSelected(this)');
     }
}

function optionSelected(answer) {
     let userAnswer = answer.textContent;
     let correctAnswer = questions[questionCount].answer;
     let allOptions = optionList.children.length;
     
     if(userAnswer == correctAnswer){
          answer.classList.add('correct');

          userScore += 1;
          headerScore();
     } else {
          answer.classList.add('incorrect');

          //if answer is incorrect, auto selected the correct answer.
          for(let i = 0; i < allOptions; i++){
          if(optionList.children[i].textContent == correctAnswer) {
               optionList.children[i].setAttribute('class', 'option correct');
          }
     }
     }

     //if user selcted any option, disable other options
     for(let i = 0; i < allOptions; i++){
          optionList.children[i].classList.add('disabled');
     }

     nextBtn.classList.add('active');
}

function questionCounter(index) {
     const questionTotal = document.querySelector('.question-total');
     questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
     const headerScoreText = document.querySelector('.header-score');
     headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}