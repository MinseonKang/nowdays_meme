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

// ================= 테스트 코드:채팅========================
let tags = makeChatBox(
  {
    name: "구워버린다",
    imgSrc: "data:image/jpeg;base64,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",
    // kakao서버 문제로 로드되지 않음
    // 'imgSrc': 'https://blog.kakaocdn.net/dn/cndgTT/btrpJSi0TEo/9SDMGVMGqXVJBEKQkFx97K/img.jpg',
    content:
      "아이돌 그룹 NCT 천러가 팬들과 소통하는 앱 '버블'에서 한 말에서 시작됐어요. 천러가 버블로 팬들에게 우리 이제 화날 때 구워버릴까를 사용하자'라고 말했어요. 구워버린다는 화가 나는 상황에서 귀엽게 쓸 수 있어요.",
    link: "https://theqoo.net/nctdream/2301141145",
  },
  false
);
let chat = selector(".chat");
chat.append(tags[0]);
chat.append(tags[1]);

let memeObjects = [{
  name: '구워버린다',
  imgSrc: 'https://s3.ap-northeast-2.amazonaws.com/univ-careet/FileData/Article/797/57bfa70c-6b13-4a8b-9f41-4a08453878cc.jpg',
  content: "아이돌 그룹 NCT 천러가 팬들과 소통하는 앱 '버블'에서 한 말에서 시작됐어요. 천러가 버블로 팬들에게 우리 이제 화날 때 구워버릴까를 사용하자'라고 말했어요. 구워버린다는 화가 나는 상황에서 귀엽게 쓸 수 있어요."  ,
  link:'https://theqoo.net/nctdream/2301141145'
  }, {
  name: '너 뭐돼?',
  imgSrc: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbYptnS%2Fbtrtxmt42hS%2FtFDqRAdKDv7A8ZWBfAnFk1%2Fimg.jpg',
  content: "뷰티 유튜버 레오제이가 짜증나는 친구를 놀리려고 한 말에서 시작했어요. 짜증나는 게시물이나 친구 대처법으로 유행하는 밈이에요"  ,
  link:'https://www.youtube.com/watch?v=I7I1LScjNsw'
  }, {
  name: '재즈가 뭐라고 생각하세요?',
  imgSrc: 'https://i.ytimg.com/vi/B8dERi6h5AU/maxresdefault.jpg',
  content: "웹툰작가 주호민이 침착맨 유튜브 채널에서 이를 언급하며 엘라의 스캣을 따라한 데에서 유래했다."  ,
  link:'https://youtu.be/18OYMT2qUSY'
  }, {
  name: '갸루피스',
  imgSrc: 'https://dispatch.cdnser.be/cms-content/uploads/2022/04/08/2db022d7-ce6f-45dc-8bda-6e41c7803534.jpg',
  content: "일본 갸루 문화에서 비롯된 것으로  K-POP에서 활동 중인 재한 일본인 멤버들[1]에 의해 국내에서 유행이 되었어요."  ,
  link:'https://namu.wiki/w/%EA%B0%B8%EB%A3%A8%ED%94%BC%EC%8A%A4'
  }, {
  name: '그 잡채',
  imgSrc: '"그 자체"라는 뜻으로 잡채의 발음이 유사함을 이용한 말장난이에요.',
  content: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmzQSG%2FbtrM65zTud0%2FQaOtP7WVWLKqirjwxPpkf1%2Fimg.jpg"  ,
  link:'https://m.cafe.daum.net/subdued20club/ReHf/3795292?listURI=%2Fsubdued20club%2FReHf'
  }, {
  name: '신기방기 뿡뿡방기',
  imgSrc: '세븐틴 정한이 만든 유행어로 이를 유행시켜 달라는 정한의 말에 팬들에게 유행처럼 번지게 되었어요.',
  content: 'https://post-phinf.pstatic.net/MjAyMjAyMjVfMjU4/MDAxNjQ1NzIzNTYxODQx.B6KzGtl7a97op8YADphJ_m7S2zlj0mf65jY_GP53SBog.DXKjutBd5sEhJ1woycn9mpLBslXMFdWCIj7xeDNytnog.JPEG/%EC%8B%A0%EA%B8%B0%EB%B0%A9%EA%B8%B0%EB%BF%A1%EB%BF%A1%EB%B0%A9%EA%B8%B0.jpg?type=w1200'  ,
  link:'https://www.youtube.com/watch?v=_pf-RHEGrsc'
  }, {
name: '가족이 돼주라',
imgSrc: 'https://s3.ap-northeast-2.amazonaws.com/univ-careet/FileData/Article/573/bdf0d953-3ddf-4412-a80b-1eb8be7d61c7.jpg',
content: '가수 디핵의 "OHAYO MY NIGHT"이란 노래의 가사인데요. Z세대들이 최근 이 가사를 최애 아이돌이나 좋아하는 사람들에게 주접 멘트로 활용해요.',
link:'https://www.youtube.com/watch?v=w-nD4fapL8w'
}, {
name: '아 진짜요?',
imgSrc: 'https://img.koreapas.com/i/f1a06a2/resize',
content: '한 아이돌 팬이 엄청난 거금을 들여 최애 팬 사인회에 갔다가 탈덕하게 된 계기에 대해 쓴 글이 화제가 되었어요. 이에 무엇인가에 관심이 없다는 것을 표현할 때 사용해요.',
link:'https://www.youtube.com/watch?v=byHbe9g1tLE&feature=youtu.be'
}, {
name: '북극곰은 사람을 찢어',
imgSrc: 'https://w.namu.la/s/599570317e87a5972365ce5000beac36dd4a4ce411c5bc423b16ea5b08d0ad7ca29201054c7b0ccbadecdb60f99fa2f4bdeee1e4e71ca92de1fb9d733077ed860417902ce580bb9d4ed3ec6cb5a922022ff943b8833aa022e191a35ce8abca7994a13af5702565d4f4ba1861f900b803',
content: '무한도전 해외극한알바 특집에서 자신을 북극으로 보내려고 하자 한 말이 유행이 되었어요.',
link:'https://www.youtube.com/watch?v=cV8srEt0-ms&feature=youtu.be'
}, { name: '쫑받네', imgSrc: 'https://blog.kakaocdn.net/dn/cndgTT/btrpJSi0TEo/9SDMGVMGqXVJBEKQkFx97K/img.jpg', content: "화가 나는 순간을 넘어서 참기 어려울 정도로 화가 나거나 화가나면서도 웃긴 순간에 접어들었을 때 이와 같이 표현한다고 합니다. 이는 아이돌 그룹인 엔하이픈의 웃수저 멤버 중 한 명인 박종성의 별명 쫑생에서 만들어진 단어로 종성과 킹받네를 합쳐 '쫑받네'로 발전했다고 하는데요. 어감이 귀엽고 쉽게 사용할 수 있어 여러 사람들이 서서히 사용하고 있는 만큼 널리 쓰이는 유행어로 자리 잡아가고 있습니다." , link:'https://www.tiktok.com/@niklang3/video/7053301016762273026' },

];
isMineBool = true;
for(let i=0; i<memeObjects.length; i++) {
  tag = makeChatBox(memeObjects[i], isMineBool);
  isMineBool = ! isMineBool;
  chat.append(tag[0]);
  chat.append(tag[1]);
}

// ================사용되지않는 부분 삭제================