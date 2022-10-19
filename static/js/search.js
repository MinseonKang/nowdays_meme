const memeList = [
  {
    name: "구워버린다",
    imgSrc: "https://pbs.twimg.com/media/FIfrzu8acAkKFys.jpg",
    content:
      "아이돌 그룹 NCT 천러가 팬들과 소통하는 앱 '버블'에서 한 말에서 시작됐어요. 천러가 버블로 팬들에게 우리 이제 화날 때 구워버릴까를 사용하자'라고 말했어요. 구워버린다는 화가 나는 상황에서 귀엽게 쓸 수 있어요.",
    link: "https://theqoo.net/nctdream/2301141145",
  },
  {
    name: "한강을 메워야",
    imgSrc: "https://pbs.twimg.com/media/FQjcd0sakAcn0k1?format=png&name=small",
    content:
      "어느 부동산 관련 익명 커뮤니티 사이트에서 시작된 밈이에요. ㅇㅇ를 메워야라는 밈의 시초가 되었어요!",
    link: "https://twitter.com/Not_mememy/status/1515703681681080320?s=20&t=SPGWyfU0Ug_KWH7Z7Hu7EQ",
  },
];

function searchFilter(data, name, imgSrc, content, link, search) {
  // data 값을 하나하나 꺼내와서
  return data.map((d) => {
    // 만약 해당 데이터가 search 값을 가지고 있다면 리턴한다.
    if (
      d[name].includes(search) ||
      d[imgSrc].includes(search) ||
      d[content].includes(search) ||
      d[link].includes(search)
    ) {
      return d;
    }
  });
}
// search 버튼 클릭 시 호출되는 함수
function searchMeme(e) {
  e.preventDefault();
  // 폼에 입력된 값
  let keyword = document.getElementById("search_text").value;
  // result [undefined, {id:, name: favorites:}, undefined] 이런식으로 리턴
  // 따라서 undefined 값을 제거해줘야하기 때문에 filter 메소드 적용
  let result = searchFilter(
    memeList,
    "name",
    "imgSrc",
    "content",
    "link",
    keyword
  ).filter((d) => d !== undefined);

  // 결과 값 화면 출력
  document.getElementById("result_name").innerHTML = result.map((d) => d.name);
  document.getElementById("result_img").innerHTML = result.map((d) => d.imgSrc);
  document.getElementById("result_content").innerHTML = result.map(
    (d) => d.content
  );
  document.getElementById("result_link").innerHTML = result.map((d) => d.link);
}

// // 클릭 시 search 함수 호출
document.querySelector(".search_box").addEventListener("submit", searchMeme);

$(document).ready(function () {
  $(".search_btn").click(function () {
    $(".panel").slideToggle("slow");
  });
});
