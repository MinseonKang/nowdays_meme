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
console.log(replayClick);
let replayIcon = document.querySelector("i");
console.log(replayClick);

replayClick.addEventListener("click", function () {
  if (replayClick.hasAttribute("class", "bi-pause-circle") == true) {
    console.log(replayClick.hasAttribute("class", "bi-pause-circle"));
    replayClick.classList.remove("bi-pause-circle"); // 멈춤 아이콘으로 변경
    clearTimeout(timeOut);
  } else if (replayClick.hasAttribute("class", "bi-pause-circle") == false) {
    console.log(replayClick.hasAttribute("class", "bi-pause-circle"));
    replayClick.classList.add("bi-pause-circle"); // 멈춤 아이콘으로 변경
    let replaystop = document.querySelector(".i");
    replaystop.innerText = "STOP";
    location.reload();
  }
  // if (replayClick.hasAttribute("class", "bi-pause-circle") == true) {
  //   showImage();
  // } else {
  //   stopImage();
  // }
});
