console.log("Connected");

// let randomNumber = Math.floor(Math.random() * 4) + 1;
// document.querySelector(".img_box").classList.add("bg0" + randomNumber);

var imgArray = new Array();
imgArray[0] = "/static/image/bg01.png";
imgArray[1] = "/static/image/bg02.png";
imgArray[2] = "/static/image/bg03.png";
imgArray[3] = "/static/image/bg04.png";

function showImage() {
  var imgNum = Math.round(Math.random() * 3);
  var objImg = document.getElementById("introimg");
  objImg.src = imgArray[imgNum];
  setTimeout(showImage, 50);
}
