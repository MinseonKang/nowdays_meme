const d = document;
const create = function(tagStr){return d.createElement(tagStr);}
const selector = function(selector){return d.querySelector(selector);}
const selectorAll = function(selector){return d.querySelectorAll(selector);}
const addClass = function(element, classStr){element.classList.add(classStr);}
const removeClass = function(element, classStr){element.classList.remove(classStr);}
const toggleClass = function(element, classStr){element.classList.toggle(classStr);}

const name = 'name';
const imgSrc = 'imgSrc';
const content = 'content';
const link = 'link';


// 밈 오브젝트 배열 추가 & 배열 반복문으로 변경
// 지금은 testMeme 사용
// 
// 
// 
// 
let testMeme1 = {
  name: '북극곰은 사람을 찢어',
  imgSrc: 'https://w.namu.la/s/599570317e87a5972365ce5000beac36dd4a4ce411c5bc423b16ea5b08d0ad7ca29201054c7b0ccbadecdb60f99fa2f4bdeee1e4e71ca92de1fb9d733077ed86522f18ca461ec91c8377dd8f2bbbc61d100783a9fa0c85274d9905e9cc194b8dee3926db70ccad8b564cb80fa404ef88',
  content: '무한도전 해외극한알바 특집에서 자신을 북극으로 보내려고 하자 한 말이 유행이 되었어요.',
  link:'https://www.youtube.com/watch?v=cV8srEt0-ms&feature=youtu.be'
};
let testMeme2 = {
  name: '아 진짜요?',
  imgSrc: 'https://w.namu.la/s/efde9efd15ac5e16b0839e1cd53abf16fe9cdb211f956d23d173e0292a1532a73f0a85b04d758cbf380b38fee0f1b1f56e77d99c591ceed7bc560c9a7806958163c8d79beaf65beb48b41f34bae1a15fa7d1aa8512224dd92b479b6effa74f9e',
  content: '한 아이돌 팬이 엄청난 거금을 들여 최애 팬 사인회에 갔다가 탈덕하게 된 계기에 대해 쓴 글이 화제가 되었어요. 이에 무엇인가에 관심이 없다는 것을 표현할 때 사용해요.',
  link:'https://www.youtube.com/watch?v=byHbe9g1tLE&feature=youtu.be'
}
let testMeme3 = {
  name: '가족이 돼주라',
  imgSrc: 'https://s3.ap-northeast-2.amazonaws.com/univ-careet/FileData/Article/573/bdf0d953-3ddf-4412-a80b-1eb8be7d61c7.jpg',
  content: '가수 디핵의 "OHAYO MY NIGHT"이란 노래의 가사인데요. Z세대들이 최근 이 가사를 최애 아이돌이나 좋아하는 사람들에게 주접 멘트로 활용해요.',
  link:'https://www.youtube.com/watch?v=w-nD4fapL8w'
}
let testMeme4 = {
  name: '그 잡채',
  content: '"그 자체"라는 뜻으로 잡채의 발음이 유사함을 이용한 말장난이에요.',
  imgSrc: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmzQSG%2FbtrM65zTud0%2FQaOtP7WVWLKqirjwxPpkf1%2Fimg.jpg"  ,
  link:'https://m.cafe.daum.net/subdued20club/ReHf/3795292?listURI=%2Fsubdued20club%2FReHf'
}

const makeCard = function(data) {
  //data: memeObjectf -> {'name':, 'imgSrc':, 'content':,'link':}
  let card = create('div');
  addClass(card, 'card');
  let cardImg = create('img');
  addClass(cardImg, 'card_img');
  cardImg.src = data.imgSrc;
  card.append(cardImg);
  let cardToString = create('div');
  addClass(cardToString, 'card_to_string');
  let cardLink = create('a');
  cardLink.href = data.link;
  cardLink.target = '_blank';
  let cardName = create('div');
  addClass(cardName, 'card_name');
  cardName.append(cardLink);
  cardLink.innerText = data.name;
  cardToString.append(cardName);
  let cardText = create('div');
  addClass(cardText, 'card_text');
  cardText.innerText = data.content;
  cardToString.append(cardText);
  card.append(cardToString);
  return card;
}
let card1 = makeCard(testMeme1);
let card2 = makeCard(testMeme2);
let card3 = makeCard(testMeme3);
let card4 = makeCard(testMeme4);
let cardContainer = selector('.card_container');
cardContainer.append(card1);
cardContainer.append(card2);
cardContainer.append(card3);
cardContainer.append(card4);







=======
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
const chat = document.getElementsByClassName("chat");

for (let i = 0; i < memeList.length; i++) {
  const name = document.createElement("div");
  name.textContent = memeList[i];
  name.classList.add("message last");
  chat.append(name);
}
>>>>>>> b1e3f9eb0bff579ebc82e6e75efbe0c1dfb738c8
