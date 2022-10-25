// 문제 객체(생성자 함수)
function Question(img, choice, answer) {
  this.img = img; // 질문할 사진
  this.choice = choice; // 선택할 답들(배열)
  this.answer = answer; // 정답 정보
}

// 퀴즈 정보 객체
function Quiz(questions) {
  this.score = 0; // 점수
  this.questions = questions; // 문제
  this.questionIndex = 0; // 문제 번호
}

// 정답 확인 메서드
Quiz.prototype.correctAnswer = function (answer) {
  return answer == this.questions[this.questionIndex].answer;
};

let questions = [
  new Question(
    "static/quiz_img/quiz01.png",
    ["귀여워", "사람을 찢어", "무섭잖아", "겨울잠을 자"],
    "사람을 찢어"
  ),
  new Question(
    "static/quiz_img/quiz02.png",
    ["뭐 돼?", "뭐야?", "외계인?", "바보?"],
    "뭐 돼?"
  ),
  new Question(
    "static/quiz_img/quiz03.png",
    ["당당하게", "소신있게", "멋지게", "줏대있게"],
    "줏대있게"
  ),
  new Question(
    "static/quiz_img/quiz04.png",
    ["시끄러워", "아따", "하남자특", "너는 왜 이렇게"],
    "하남자특"
  ),
  new Question(
    "static/quiz_img/quiz05.png",
    [
      "대통령을 바꿔야",
      "한강을 메워야",
      "비트코인을 해야",
      "부동산을 폭파시켜야",
    ],
    "한강을 메워야"
  ),
];

// 퀴즈 객체 생성
let quiz = new Quiz(questions);

// 문제 출력 함수
function updateQuiz() {
  let question = document.getElementById("question");
  let choice = document.querySelectorAll(".btn");

  // 문제 출력
  question.src = quiz.questions[quiz.questionIndex].img;

  // 선택 출력
  for (let i = 0; i < 4; i++) {
    choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
  }

  progress();
}

function progress() {
  let progress = document.getElementById("progress");
  progress.innerHTML =
    "문제 " + (quiz.questionIndex + 1) + " / " + quiz.questions.length;
}

let btn = document.querySelectorAll(".btn");

// 입력 및 정답 확인 함수
function checkAnswer(i) {
  btn[i].addEventListener("click", function () {
    let answer = btn[i].innerText;

    if (quiz.correctAnswer(answer)) {
      alert("정답입니다!");
      quiz.score++;
    } else {
      alert("틀렸습니다ㅜㅜ");
    }
  });
}

function moveNextQuiz(i) {
  btn[i].addEventListener("click", function () {
    if (quiz.questionIndex < quiz.questions.length - 1) {
      quiz.questionIndex++;
      updateQuiz();
    } else {
      result();
    }
    timerBar.classList.remove("timer2");
    void timerBar.offsetWidth;
    timerBar.classList.add("timer2");
  });
}

function result() {
  let quizDiv = document.getElementById("quiz");
  let quizText = document.getElementById("quiz_text");
  let delTimer = document.querySelector(".timer-box");
  console.log(delTimer);
  let per = parseInt((quiz.score * 100) / quiz.questions.length);
  let txt =
    "<h1>결과</h1>" + '<h2 id="score">당신의 점수: ' + per + "점" + "</h2>";
  quizDiv.innerHTML = txt;
  quizDiv.style.color = "white";
  quizText.innerText = "두근두근!";
  quizText.style.color = "white";
  delTimer.remove();

  if (per < 60) {
    txt += `<img src="https://cdn.banggooso.com/assets/images/game1021/result/level2.jpg" style="width: 40vw"; <br>
    <button onclick="location.href='/index'" style="padding: 1vw; margin: 3vw;">요.밈.알로<br> 진정한 밈잘알이 됩시다!</button>`;
    quizDiv.innerHTML = txt;
  } else if (per >= 60 && per < 80) {
    txt += `<img src="https://cdn.banggooso.com/assets/images/game1021/result/level1.jpg" style="width: 40vw"; <br>
    <button onclick="location.href='/index'" style="padding: 1vw; margin: 3vw;">요.밈.알을 통해<br> 진정한 밈잘알로 성장!</button>`;
    quizDiv.innerHTML = txt;
  } else if (per >= 80) {
    txt += `<img src="https://djpms9a1go7nf.cloudfront.net/prod/uploads/10035305/images/164008155888957.jpg" style="width: 40vw"; <br>
    <button onclick="location.href='/index'" style="padding: 1vw; margin: 3vw;">밈알못을 위해 알고 있는 밈을 <br>요.밈.알에 추가해 주세요!</button>`;
    quizDiv.innerHTML = txt;
  }
}
let timerBar = document.querySelector(".timer1");
for (let i = 0; i < btn.length; i++) {
  checkAnswer(i);
  moveNextQuiz(i);
}

updateQuiz();
