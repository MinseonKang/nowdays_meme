/* 출처 : https://madinthe90.tistory.com/m/39 */
function readURL(input) {
  if (input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);

    // .input-origin 숨기기
    let inputOrigin = document.querySelector(".input-origin");
    inputOrigin.style.display = "none";

    // .preview에 .display-flex 클래스 추가
    let preview = document.querySelector(".preview");
    preview.classList.remove("privew");
    preview.classList.add("display-flex");
  } else {
    document.getElementById("preview").src = "";
  }
}

let inputDiv1 = document.querySelector(".input-div1");
inputDiv1.addEventListener("click", function () {
  let inputBox1 = document.querySelector(".input-box1");
  let inputBox2 = document.querySelector(".input-box2");

  inputBox2.style.display = "flex";
  inputBox1.style.display = "none";
});
