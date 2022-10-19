const d = document;

console.log("Connected2");

// 랜덤이미지 추가
let imgArray = new Array();
imgArray[0] = "/static/image/bg01.png";
imgArray[1] = "/static/image/bg02.png";
imgArray[2] = "/static/image/bg03.png";
imgArray[3] = "/static/image/bg04.png";
//랜덤이미지 보여주기 함수
let timeOut; // setTimeout() 의 고유 ID 를 저장할 변수

function showImage() {
  let imgNum = Math.round(Math.random() * 3);
  let objImg = document.getElementById("introimg");
  objImg.src = imgArray[imgNum];
  // setTimeout(showImage, 100);
  timeOut = setTimeout(showImage, 100); // setTimeout 함수 실행해서 id 1 저장
}

//이미지 클릭 시 멈춤

let pauseImg = document.querySelector(".img_box");
console.log(pauseImg);

pauseImg.addEventListener("click", function (e) {
  clearTimeout(timeOut);
  stopImage();
  //이미지 멈춤 함수
  function stopImage() {
    let imgNum2 = Math.round(Math.random() * 3);
    let objImg2 = document.getElementById("introimg");
    objImg2.src = imgArray[imgNum2];
  }
});

// replay 아이콘 클릭이벤트

let replayClick = document.querySelector("i");
// console.log(replayClick);
// console.log(replayClick.classList.contains("bi-arrow-repeat"));

replayClick.addEventListener("click", function () {
  if (replayClick.classList.contains("bi-arrow-repeat") == true) {
    // console.log("true");
    replayClick.classList.remove("bi-arrow-repeat"); // replay 아이콘으로 변경
    replayClick.classList.add("bi-pause-circle"); // 멈춤 아이콘으로 변경
    // replayClick.innerText = "멈추기";
    location.reload();
  } else if (replayClick.classList.contains("bi-arrow-repeat") == false) {
    // console.log("false임");
    replayClick.classList.add("bi-arrow-repeat"); // 멈춤 아이콘으로 변경
    replayClick.classList.remove("bi-pause-circle"); // replay 아이콘으로 변경

    // replayClick.innerText = "다시하기";
    clearTimeout(timeOut);
  }
});

// 공유버튼

function shareTwitter() {
  let sendText = "오늘의 밈"; // 전달할 텍스트
  let sendUrl = "http://115.85.181.225:8000/today"; // 전달할 URL
  window.open(
    "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl
  );
}

function shareFacebook() {
  let sendUrl = "http://115.85.181.225:8000/today"; // 전달할 URL
  window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}
