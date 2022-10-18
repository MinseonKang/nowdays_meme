// =========================shortcut==================
const d = document;
const create = function (tagStr) {
  return d.createElement(tagStr);
};
const selector = function (selector) {
  return d.querySelector(selector);
};
const selectorAll = function (selector) {
  return d.querySelectorAll(selector);
};
const addClass = function (element, classStr) {
  element.classList.add(classStr);
};
const removeClass = function (element, classStr) {
  element.classList.remove(classStr);
};
const toggleClass = function (element, classStr) {
  element.classList.toggle(classStr);
};

// =========Object keys to String ====================
const name = "name";
const imgSrc = "imgSrc";
const content = "content";
const link = "link";

// ===========================채팅박스================
const makeChatBox = function (data, isMine) {
  //data: memeObjectf -> {'name':, 'imgSrc':, 'content':,'link':}
  //  -> 이미지가 없다면?
  //isMine: true, false
  // return을 <div class="chat"></div>에 추가
  let answer = [];
  let imageWrap = create("div");
  addClass(imageWrap, isMine ? "mine" : "yours");
  addClass(imageWrap, "messages");
  let image = create("img");
  image.src = data.imgSrc;
  addClass(image, "chat_img");
  image.addEventListener("click", function () {
    image.classList.toggle("chat_big");
  });
  imageWrap.append(image);
  answer.push(imageWrap);

  // image 사이즈 에 관해 rescale 필요하다
  // css 에서 @media로 설정하기

  let messagesWrap = create("div");
  addClass(messagesWrap, isMine ? "mine" : "yours");
  addClass(messagesWrap, "messages");

  let messageText = create("div");
  messageText.innerText = data.name;
  addClass(messageText, "message");
  addClass(messageText, "last");
  messagesWrap.append(messageText);
  messagesWrap.addEventListener("click", function () {
    toggleClass(messageText, "msg_big");
  });
  answer.push(messagesWrap);

  return answer;
};

// ======================Popup===============================
const popupTag = function (element) {
  if (element == "close") {
    addClass(selector("#hide_back"), "hide");
    addClass(selector("#hide_container"), "hide");
    removeClass(selector("#hide_back"), "popup_animation");
    removeClass(selector("#hide_container"), "popup_animation");
    return 1;
  }
  let popupContent = selector("#hide_container");
  popupContent.innerHTML = "";
  // popupContent.innerHTML = '';
  // popupContent.append(element);
  let closeBtn = create("button");
  closeBtn.innerText = "close";
  closeBtn.addEventListener("click", function () {
    popupTag("close");
  });
  addClass(closeBtn, "close_btn");
  popupContent.append(element);
  popupContent.append(closeBtn);
  removeClass(selector("#hide_back"), "hide");
  removeClass(selector("#hide_container"), "hide");
  addClass(selector("#hide_back"), "popup_animation");
  addClass(selector("#hide_container"), "popup_animation");
};
// ========================카드==================================
const makeCard = function (data) {
  //data: memeObjectf -> {'name':, 'imgSrc':, 'content':,'link':}
  let card = create("div");
  addClass(card, "card");
  let cardImg = create("img");
  addClass(cardImg, "card_img");
  cardImg.src = data.imgSrc;
  card.append(cardImg);
  let cardToString = create("div");
  addClass(cardToString, "card_to_string");
  let cardLink = create("a");
  cardLink.href = data.link;
  cardLink.target = "_blank";
  let cardName = create("div");
  addClass(cardName, "card_name");
  cardName.append(cardLink);
  cardLink.innerText = data.name;
  cardToString.append(cardName);
  let cardText = create("div");
  addClass(cardText, "card_text");
  cardText.innerText = data.content;
  cardToString.append(cardText);
  card.append(cardToString);
  return card;
};

// ================= 테스트 코드:채팅========================
let tags = makeChatBox(
  {
    name: "구워버린다",
    imgSrc: "./testimg.jpg",
    // kakao서버 문제로 로드되지 않음
    // 'imgSrc': 'https://blog.kakaocdn.net/dn/cndgTT/btrpJSi0TEo/9SDMGVMGqXVJBEKQkFx97K/img.jpg',
    content:
      "아이돌 그룹 NCT 천러가 팬들과 소통하는 앱 '버블'에서 한 말에서 시작됐어요. 천러가 버블로 팬들에게 우리 이제 화날 때 구워버릴까를 사용하자'라고 말했어요. 구워버린다는 화가 나는 상황에서 귀엽게 쓸 수 있어요.",
    link: "https://theqoo.net/nctdream/2301141145",
  },
  false
);
let chat = selectorAll(".chat")[0];
chat.append(tags[0]);
chat.append(tags[1]);

// ================================= 채팅 스크롤바 ========================
// let tags2 = makeChatBox(testMeme, true);
// // let chat2 = selectorAll(".chat")[0];
// chat.append(tags2[0]);
// chat.append(tags2[1]);
