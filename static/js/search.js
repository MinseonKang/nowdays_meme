const memeList = [
  {
    name: "구워버린다",
    imgSrc: "./static/image/logo.png",
    // kakao서버 문제로 로드되지 않음
    // 'imgSrc': 'https://blog.kakaocdn.net/dn/cndgTT/btrpJSi0TEo/9SDMGVMGqXVJBEKQkFx97K/img.jpg',
    content:
      "아이돌 그룹 NCT 천러가 팬들과 소통하는 앱 '버블'에서 한 말에서 시작됐어요. 천러가 버블로 팬들에게 우리 이제 화날 때 구워버릴까를 사용하자'라고 말했어요. 구워버린다는 화가 나는 상황에서 귀엽게 쓸 수 있어요.",
    link: "https://theqoo.net/nctdream/2301141145",
  },
  {
    name: "북극곰은 사람을 찢어",
    imgSrc: "./static/image/logo.png",
    content:
      "무한도전 해외극한알바 특집에서 자신을 북극으로 보내려고 하자 한 말이 유행이 되었어요.",
    link: "https://www.youtube.com/watch?v=cV8srEt0-ms&feature=youtu.be",
  },
];

// 반복문으로 인덱스 값이 짝수일 때 mine messages, 홀수일 때 your message 속성을 갖도록
// const chat = document.getElementsByClassName("chat");
// for (let i = 0; i < memeList.length; i++) {
//   const name = document.createElement("div");
//   name.textContent = memeList[i];
//   name.classList.add("message last");
//   chat.append(name);
// }

function searchFilter(data, name, search) {
  // data 값을 하나하나 꺼내와서
  return data.map((d) => {
    // 만약 해당 데이터가 search 값을 가지고 있다면 리턴한다.
    if (d[name].includes(search)) {
      return d;
    }
  });
}
// search 버튼 클릭 시 호출되는 함수
function searchMeme(e) {
  e.preventDefault();
  // 폼에 입력된 값
  let keyword = document.getElementById("search_text").value;
  console.log(document.getElementById("search_text"));
  // result [undefined, {id:, name: favorites:}, undefined] 이런식으로 리턴
  // 따라서 undefined 값을 제거해줘야하기 때문에 filter 메소드 적용
  let result = searchFilter(memeList, "name", keyword).filter(
    (d) => d !== undefined
  );

  // 결과 값 화면 출력
  document.getElementById("result").innerText = result.map((d) => d.name);
}

// 클릭 시 search 함수 호출
document.querySelector(".search_box").addEventListener("submit", searchMeme);
