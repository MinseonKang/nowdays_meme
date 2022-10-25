// =========================shortcut==================
const d = document;
const create = function (tagStr) {
  return d.createElement(tagStr);
};
const selector = function (selector, target = document) {
  return target.querySelector(selector);
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
const hasClass = function (element, className) {
  return element.classList.contains(className);
};
const clearClass = function(element) {
  while (element.classList.length > 0) {
    removeClass(element, element.classList.item(0));
  }
}
const print = function (content, dir = false) {
  dir ? console.dir(content) : console.log(content);
};

// =========Object keys to String ====================
const name = "name";
const imgSrc = "imgSrc";
const content = "content";
const link = "link";

// ============sleep 함수(코드 실행 지연) ============================
function sleep(sec) {
  let start = Date.now();
  now = start;
  while (now - start < sec * 1000) {
    now = Date.now();
  }
  print("now" + now);
  print("start" + start);
}
// ===========================채팅박스================
const makeChatBox = function (data, isMine, memeIndex = 0) {
  //data: memeObjectf -> {'name':, 'imgSrc':, 'content':,'link':}
  //  -> 이미지가 없다면?
  //isMine: true, false
  // return을 <div class="chat"></div>에 추가
  let imageWrap = create("div");
  addClass(imageWrap, isMine ? "mine" : "yours");
  addClass(imageWrap, "messages");
  let image = create("img");
  image.src = data.imgSrc;
  addClass(image, "chat_img");
  imageWrap.append(image);
  let messagesWrap = create("div");
  messagesWrap.append(imageWrap);

  addClass(messagesWrap, isMine ? "mine" : "yours");
  addClass(messagesWrap, "messages");

  let messageText = create("div");
  messageText.innerText = data.name;
  addClass(messageText, "message");
  addClass(messageText, "last");
  // messagesWrap.append(messageText);

  let heartIcon = create("span");
  addClass(heartIcon, "material-symbols-outlined");
  addClass(heartIcon, "heart");
  Boolean(data.like) ? addClass(heartIcon, "like") : null;
  heartIcon.innerText = "favorite";
  heartIcon.addEventListener("click", function () {
    heartToggle(this);
  });

  let heartContainer = create("div");
  addClass(heartContainer, "heart_container");
  heartContainer.append(messageText);
  isMine ? heartContainer.prepend(heartIcon) : heartContainer.append(heartIcon);
  messagesWrap.append(heartContainer);

  let memeIdNum = create("span");
  addClass(memeIdNum, "hide");
  memeIdNum.innerText = memeIndex;
  messagesWrap.append(memeIdNum);

  let isLikeSpan = create("span");
  addClass(isLikeSpan, "is_like");
  addClass(isLikeSpan, "hide");
  isLikeSpan.innerText = data.like;
  messagesWrap.append(isLikeSpan);

  //animation을위해 추가됨
  addClass(messagesWrap, "chat_animation");

  return messagesWrap;
};
// =====================heart switch ==================
const heartToggle = function (heart) {
  // heart : .chat>.messages>.heart_container>.heart
  let isLike = Number(
    selector(".is_like", heart.parentNode.parentNode).innerText
  );
  Boolean(isLike) ? removeClass(heart, "like") : addClass(heart, "like");
  selector(".is_like", heart.parentNode.parentNode).innerText = ++isLike % 2;
  let memeIndex = Number(
    selector("span.hide", heart.parentNode.parentNode).innerText
  );
  memeObjects[memeIndex].like = isLike % 2;
};

//=======================카드 =========================
const makeCard = function (data, memeIndex = -1) {
  //data: memeObjectf -> {'name':, 'imgSrc':, 'content':,'link':}
  let card = create("div");
  addClass(card, "memeCard");
  // bootstrap 과 충돌로 class를 조정
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
  if (memeIndex > -1) {
    let memeIdNum = create("span");
    addClass(memeIdNum, "hide");
    memeIdNum.innerText = memeIndex;
    card.append(memeIdNum);
  }
  return card;
};

// =====================메세지 -> 카드 =======================

const msg2card = function (msg) {
  isMine = hasClass(msg, "mine");
  let memeIndex = Number(selector("span.hide", msg).innerText);
  let replaceCard = makeCard(memeObjects[memeIndex], memeIndex);
  selector(".message", msg).innerHTML = "";
  selector(".message", msg).append(replaceCard);
  selector(".messages .messages", msg).innerHTML = "";
  addClass(selector(".message", msg), "card_message");
  removeClass(msg, "chat_animation");
  let readyToggle = true;
  // readyToggle -> 무한루프 방지
  let unListener = msg.cloneNode(true);
  msg.parentNode.replaceChild(unListener, msg);
  let inContent = selector(".memeCard", unListener);
  inContent.addEventListener("click", function () {
    if (readyToggle) {
      readyToggle = false;
      card2msg(unListener);
    }
  });
  selector(".heart", unListener).addEventListener("click", function () {
    heartToggle(this);
  });
};

// =====================카드 -> 메세지 ======================

const card2msg = function (card) {
  // 처음에 메세지를 어떻게 만들었는지 생각 하자
  // card2msg()는 msg2card()의 msg태그를 입력받는다.
  let isMine = hasClass(card, "mine");
  let memeIndex = Number(selector("span.hide", card).innerText);
  let chat = selector(".chat");
  let chatTag = makeChatBox(memeObjects[memeIndex], isMine, memeIndex);
  let chatTagTemp = chatTag.classList;
  card.innerHTML = chatTag.innerHTML;
  card.classList = chatTagTemp;
  // 여기서부터 card는 그전과 같은 채팅
  addClass(card, "chat_animation");
  let readyToggle = true;
  // readyToggle -> 무한루프 방지코드
  let unListener = card.cloneNode(true);
  card.parentNode.replaceChild(unListener, card);
  let inContent = selector("img", unListener);
  inContent.addEventListener("click", function () {
    if (readyToggle) {
      readyToggle = false;
      msg2card(unListener);
    }
  });
  selector(".heart", unListener).addEventListener("click", function () {
    heartToggle(this);
  });
};
// ================= element sort =========================

const tag2value = function(element) {
  //일부tag 값의 예외를 다루기위한 함수
  let answer;
  if(element.tagName == "INPUT") {
      if(element.type == "checkbox") {
          answer = Number(element.checked);
      } else {
          answer = element.value;
      }
  } else {
      answer = element.innerText;
  }    
  // return answer;
  // 문자열 판별을 위해 수정됨
  if(Number(answer) == answer) {
      return Number(answer);
  } else {
      return answer;
  }
}
const arrayInsert = function(array, index, value) {
  // 배열의 특정index에 샵입
  let answer = [];
  for(let i=0; i<array.length; i++) {
      if(i == index) {
          answer.push(value);            
      }
      answer.push(array[i]);
  }
  return answer;
}
const sortElementBySelector = function(selector, oprandSelector) {
  // selector : 정렬대상의 공통 querySelector
  // oprandSelector : 정렬할 기준의 공통 querySelector
  let targetTags = document.querySelectorAll(selector);
  let oprandTags = document.querySelectorAll(oprandSelector); 
  let size = targetTags.length;
  let map = [0];
  for(let index=1; index<size; index++) {
      for(let mapIndex=0; mapIndex<=map.length; mapIndex++) {
          if(mapIndex == map.length) {
              map.push(index);
              break;
          }
          if(tag2value(oprandTags[index]) < tag2value(oprandTags[map[mapIndex]])) {
              map = arrayInsert(map, mapIndex, index);
              break;
          }
      }
  }
  let targetTagsHTML = [];
  let targetTagsClassList =[];
  for (let i=0; i<map.length; i++) {
      targetTagsHTML.push(targetTags[i].innerHTML);
      targetTagsClassList.push(Array.from(targetTags[i].classList));
  }
  for (let i=0; i<map.length; i++) {
      targetTags[i].innerHTML = targetTagsHTML[map[i]];
      clearClass(targetTags[i]);
      print(targetTags[i].classList);
      for(let c of targetTagsClassList[map[i]]) {
        addClass(targetTags[i], c);
      }
  }
  print(map);
}
const elementsReverseBySelector = function (selector) {
  let targetTags = document.querySelectorAll(selector);
  let reversedTagsHTML = [];
  let reversedTagsClassList =[];
  for (let i = targetTags.length - 1; i >= 0; i--) {
    reversedTagsHTML.push(targetTags[i].innerHTML);
    reversedTagsClassList.push(Array.from(targetTags[i].classList));
  }
  for (let i = 0; i < targetTags.length; i++) {
    targetTags[i].innerHTML = reversedTagsHTML[i];
    clearClass(targetTags[i]);
    for(let c of reversedTagsClassList[i]) {
      addClass(targetTags[i], c);
    }
  }
};
// ================= 메인 코드:채팅========================
// let tags = makeChatBox(
//   {
//     name: "채팅함수 테스트로 index.js에서 만들어진 채팅으로 카드기능이 없어요",
//     imgSrc: "data:image/jpeg;base64,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",
//     // kakao서버 문제로 로드되지 않음
//     // 'imgSrc': 'https://blog.kakaocdn.net/dn/cndgTT/btrpJSi0TEo/9SDMGVMGqXVJBEKQkFx97K/img.jpg',
//     content:
//       "아이돌 그룹 NCT 천러가 팬들과 소통하는 앱 '버블'에서 한 말에서 시작됐어요. 천러가 버블로 팬들에게 우리 이제 화날 때 구워버릴까를 사용하자'라고 말했어요. 구워버린다는 화가 나는 상황에서 귀엽게 쓸 수 있어요.",
//     link: "https://theqoo.net/nctdream/2301141145",
//   },
//   false
// );
let chat = selector(".chat");
// chat.append(tags);

let memeObjects = [
  {
    name: "구워버린다",
    imgSrc:
      "https://s3.ap-northeast-2.amazonaws.com/univ-careet/FileData/Article/797/57bfa70c-6b13-4a8b-9f41-4a08453878cc.jpg",
    content:
      "아이돌 그룹 NCT 천러가 팬들과 소통하는 앱 '버블'에서 한 말에서 시작됐어요. 천러가 버블로 팬들에게 우리 이제 화날 때 구워버릴까를 사용하자'라고 말했어요. 구워버린다는 화가 나는 상황에서 귀엽게 쓸 수 있어요.",
    link: "https://theqoo.net/nctdream/2301141145",
  },
  {
    name: "너 뭐돼?",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbYptnS%2Fbtrtxmt42hS%2FtFDqRAdKDv7A8ZWBfAnFk1%2Fimg.jpg",
    content:
      "뷰티 유튜버 레오제이가 짜증나는 친구를 놀리려고 한 말에서 시작했어요. 짜증나는 게시물이나 친구 대처법으로 유행하는 밈이에요",
    link: "https://www.youtube.com/watch?v=I7I1LScjNsw",
  },
  {
    name: "재즈가 뭐라고 생각하세요?",
    imgSrc: "https://i.ytimg.com/vi/B8dERi6h5AU/maxresdefault.jpg",
    content:
      "웹툰작가 주호민이 침착맨 유튜브 채널에서 이를 언급하며 엘라의 스캣을 따라한 데에서 유래했다.",
    link: "https://youtu.be/18OYMT2qUSY",
  },
  {
    name: "갸루피스",
    imgSrc:
      "https://dispatch.cdnser.be/cms-content/uploads/2022/04/08/2db022d7-ce6f-45dc-8bda-6e41c7803534.jpg",
    content:
      "일본 갸루 문화에서 비롯된 것으로  K-POP에서 활동 중인 재한 일본인 멤버들[1]에 의해 국내에서 유행이 되었어요.",
    link: "https://namu.wiki/w/%EA%B0%B8%EB%A3%A8%ED%94%BC%EC%8A%A4",
  },
  {
    name: "그 잡채",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmzQSG%2FbtrM65zTud0%2FQaOtP7WVWLKqirjwxPpkf1%2Fimg.jpg",
    content: '"그 자체"라는 뜻으로 잡채의 발음이 유사함을 이용한 말장난이에요.',
    link: "https://m.cafe.daum.net/subdued20club/ReHf/3795292?listURI=%2Fsubdued20club%2FReHf",
  },
  {
    name: "신기방기 뿡뿡방기",
    imgSrc:
      "https://post-phinf.pstatic.net/MjAyMjAyMjVfMjU4/MDAxNjQ1NzIzNTYxODQx.B6KzGtl7a97op8YADphJ_m7S2zlj0mf65jY_GP53SBog.DXKjutBd5sEhJ1woycn9mpLBslXMFdWCIj7xeDNytnog.JPEG/%EC%8B%A0%EA%B8%B0%EB%B0%A9%EA%B8%B0%EB%BF%A1%EB%BF%A1%EB%B0%A9%EA%B8%B0.jpg?type=w1200",
    content:
      "세븐틴 정한이 만든 유행어로 이를 유행시켜 달라는 정한의 말에 팬들에게 유행처럼 번지게 되었어요.",
    link: "https://www.youtube.com/watch?v=_pf-RHEGrsc",
  },
  {
    name: "가족이 돼주라",
    imgSrc:
      "https://s3.ap-northeast-2.amazonaws.com/univ-careet/FileData/Article/573/bdf0d953-3ddf-4412-a80b-1eb8be7d61c7.jpg",
    content:
      '가수 디핵의 "OHAYO MY NIGHT"이란 노래의 가사인데요. Z세대들이 최근 이 가사를 최애 아이돌이나 좋아하는 사람들에게 주접 멘트로 활용해요.',
    link: "https://www.youtube.com/watch?v=w-nD4fapL8w",
  },
  {
    name: "아 진짜요?",
    imgSrc: "https://img.koreapas.com/i/f1a06a2/resize",
    content:
      "한 아이돌 팬이 엄청난 거금을 들여 최애 팬 사인회에 갔다가 탈덕하게 된 계기에 대해 쓴 글이 화제가 되었어요. 이에 무엇인가에 관심이 없다는 것을 표현할 때 사용해요.",
    link: "https://www.youtube.com/watch?v=byHbe9g1tLE&feature=youtu.be",
  },
  {
    name: "북극곰은 사람을 찢어",
    imgSrc:
      "https://blog.kakaocdn.net/dn/b9Ah09/btrl5vGjghY/emwBIAHmPT4qdPEA9HfdBk/img.png",
    content:
      "무한도전 해외극한알바 특집에서 정준하가 자신을 북극으로 보내려고 하자 한 말이 유행이 되었어요.",
    link: "https://www.youtube.com/watch?v=cV8srEt0-ms&feature=youtu.be",
  },
  {
    name: "쫑받네",
    imgSrc:
      "https://blog.kakaocdn.net/dn/cndgTT/btrpJSi0TEo/9SDMGVMGqXVJBEKQkFx97K/img.jpg",
    content:
      "화가 나는 순간을 넘어서 참기 어려울 정도로 화가 나거나 화가나면서도 웃긴 순간에 접어들었을 때 이와 같이 표현한다고 합니다. 이는 아이돌 그룹인 엔하이픈의 웃수저 멤버 중 한 명인 박종성의 별명 쫑생에서 만들어진 단어로 종성과 킹받네를 합쳐 '쫑받네'로 발전했다고 하는데요. 어감이 귀엽고 쉽게 사용할 수 있어 여러 사람들이 서서히 사용하고 있는 만큼 널리 쓰이는 유행어로 자리 잡아가고 있습니다.",
    link: "https://www.tiktok.com/@niklang3/video/7053301016762273026",
  },
  {
    name: "한강을 메워야",
    imgSrc: "https://pbs.twimg.com/media/FQjcd0sakAcn0k1?format=png&name=small",
    content:
      "어느 부동산 관련 익명 커뮤니티 사이트에서 시작된 밈이에요. ㅇㅇ를 메워야라는 밈의 시초가 되었어요",
    link: "https://twitter.com/Not_mememy/status/1515703681681080320?s=20&t=SPGWyfU0Ug_KWH7Z7Hu7EQ",
  },
  {
    name: "나 아는사람 강다니엘 닮은 이모가 다시보게되는게 다시 그때처럼 안닮게 엄마보면 느껴지는걸수도 있는거임? 엄마도?",
    imgSrc:
      "https://pbs.twimg.com/media/FKApo_waQAYylu9?format=jpg&name=900x900",
    content:
      '어떤 익명 커뮤니티 게시판의 글 제목이 밈이 된 케이스예요. 저 말이 도대체 무슨 뜻인지 이해가 되시나요? 알아들을 수 없는 엉망진창 문법으로 써놓고선 마지막으로 "ㅇㅇ도?"를 쓰면 되겠네요!',
    link: "https://twitter.com/Not_mememy/status/1515703681681080320?s=20&t=SPGWyfU0Ug_KWH7Z7Hu7EQ",
  },
  {
    name: "ㅇㅇ죽어줄게",
    imgSrc: "https://gogumafarm.kr/article/99/article_1.png",
    content:
      '식물을 키우다가 화가 난 한 트위터 유저가 글을 작성했고, 많은 사람들이 공감하면서 화제가 됐어요. 심지어 작성한 글 중 "응ㅇㅇ죽어줄게"라는 짧은 한 줄이 소셜 미디어 뿐만 아니라 최근에 TVCF까지 등장했어요. 어떻게 사용할지 고민이라면 굽네치킨이 활용한 것처럼 기존 트윗에서 콘텐츠에 맞는 짧은 한줄로 바꿔 사용하면 좋겠죠?',
    link: "#",
  },
  {
    name: "어머니...",
    imgSrc:
      "data:image/jpeg;base64,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",
    content:
      "박지훈의 오역으로 캡틴 마블이 닉 퓨리의 어머니라는 드립이 생겨버리고 동시에 닉 퓨리는 죽기 전에 어머니를 찾는 효자마마보이 캐릭터가 되어버렸다.",
    link: "https://www.youtube.com/watch?v=Ys8Svp0wJPw",
  },
  {
    name: "당연이 줄 수 있지, 문자 한번 다시 다오~^^",
    imgSrc: "https://gogumafarm.kr/article/99/article_5.png",
    content:
      "커뮤니티에 게시된지는 오래되었지만 최근에 밈으로 많이 사용하고 있어요. 알바생에게 화끈하게 대답해주는 사장님의 쾌남 같은 말투에 ‘당연히 할 수 있다’를 특히나 강조할 때 많이 쓰는 밈이에요. 얼마 전 모트모트의 페이스북 게시물에 이 밈을 사용하여 글을 작성했는데요. 많은 유저들이 알아보며 재밌다는 반응을 보였어요. '당연이'라고 맞춤법을 틀린 것이 하나의 포인트기 때문에 큰 이슈가 없다면 틀린 맞춤법으로 만들어 보는 것도 추천 드릴게요.",
    link: "https://theqoo.net/square/1551333655",
  },
  {
    name: "(여기서부터 잔인함)",
    imgSrc: "https://gogumafarm.kr/article/99/article_7.png",
    content:
      "이건 특이하게 틱톡에서 시작된 밈인데요. 틱톡의 유저가 한 콘텐츠에 남긴 댓글이 트위터로 퍼지면서 밈이 된 경우예요. 이야기를 쓰다가 중요한 부분이나 반전, 충격적인 이야기를 할 때 이 문장을 사용하여 집중도를 높이는 거죠!",
    link: "#",
  },
  {
    name: "상남자특) 하남자특)",
    imgSrc: "https://cdn.maily.so/7vkl5p5lhgdglmabbmbqr89576uv",
    content:
      "유튜브 침착맨 영상 중 ‘상남자특) 순댓국 특 먹음’ 콘텐츠에서 상남자 특징과 그와 반대되는 하남자 특징을 이야기 하는 클립이 트위터로 퍼져나가면서 유행하게 되었어요. ‘상남자특’에서 남자 부분은 마음대로 바꿔서 쓰면 돼요. 어떤 명사를 집어 넣어도 되니 활용도 편하고, 특히 어떤 행동을 유도할 때 사용하면 좋겠죠? 실제로 트위터를 운영 중인 채널에서는 트렌드를 빠르게 캐치하여 이렇게 사용하기도 했어요.",
    link: "https://www.youtube.com/watch?v=31FwmCAEJww",
  },
  {
    name: "스껄",
    imgSrc: "https://pbs.twimg.com/media/FN3-eQkaAAczl6P.jpg",
    content:
      "‘skrr’은 의성어기 때문에 별 의미 없이 기분이 좋거나 감탄을 표현할 때 쓰이는데 이것을 아무 문장 뒤에 붙여주면 돼요! 하지만 이 밈은 아직 쓰는 사람이 적기 때문에 약간 고민해보고 써도 좋을 것 같아요. 밈을 썼는데 아무도 모르면 민망하잖아요?",
    link: "https://twitter.com/mssssnnn/status/1503370577893277700?s=20&t=UzkUxTKBTBukKWrlW14ymw",
  },
  {
    name: "내가 감히 또 잘못을",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cqWN/image/dDbZbVSq3BURpfhnaMtz33uuln0.jpg",
    content:
      "배우로 성공한 연기돌로 윤아와 임시완, 디오를 언급하며 그 외 다른 아이돌을 언급하지 않은 것은 자신이 모르거나 떠올리지 못해서 그런것이라며 나쁜 의도가 없음을 필사적으로 어필하고 있는데요. 자신의 의견은 한줄로 작성한 것에 비해 나쁜 의도가 없다는 것을 어필하기 위한 주석이 더 긴 것이 웃기다는 이유로 여러 커뮤니티에서 밈이 되었는데요. 요즘에는 소신 발언을 할 때, 명확하지 않은 것에 대해 언급할 때 등의 상황에서 주로 쓴다고 합니다.",
    link: "#",
  },
  {
    name: "어쩔 티비",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cqWN/image/f7Id7cDR3Q8Z4WIdjMV4jtmOJIQ",
    content:
      "어쩔티비는 어쩌라고 가서 티비나 봐의 줄임말로 요즘엔 티비 대신 온갖 가전 제품을 붙여서 활용하기도 한다네요. 특히 요즘 초등학생들 사이에서는 어쩔티비에 저쩔티비라고 받아치는게 국룰이라고 하니 참고하세요!",
    link: "#",
  },
  {
    name: "나는 네가 줏대 있게 살았으면 좋겠어",
    imgSrc: "https://i.ytimg.com/vi/MySJDBbQMy0/maxresdefault.jpg",
    content:
      "네가 먹고 판단해. 남의 말에 휘둘리지 말고. 난 너가 줏대있게 인생 살았으면 좋겠어. 남이 맛있다 해도, 네가 직접 먹어보고 판단해. 스트레이키즈 창빈이 먹고 있던 샌드위치가 맛있냐는 승민에게 한 대답에서 유래했어요. 후에도 이 발언은 각종 SNS로 퍼지며 인스타그램의 필터로까지 만들어져 현재에도 다양한 상황에서 쓰이고 있다네요!",
    link: "https://www.youtube.com/watch?v=MySJDBbQMy0",
  },
  {
    name: "내봬누",
    imgSrc:
      "data:image/jpeg;base64,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",
    content:
      "'내일 봬요 누나'의 줄임말로 티빙 오리지날 시리즈 <환승연애2>에 등장해 유행하기 시작했어요. '현규'가 '해은'에게 데이트를 신청하면서 던진 직진 멘트에서 유래했어요.",
    link: "https://youtu.be/v-U5Sr0pQ-g",
  },
  {
    name: "힝구리퐁퐁",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbTk8S7%2FbtrBbdw7nSl%2FEBzEkPT4SepgnLSU2KbZNk%2Fimg.png",
    content:
      "'ㅠㅠ'를 쓰는 시대는 갔다. 요즘 요즘 SNS에서 웃픈 상황일 때에  '힝구리퐁퐁'이라는 단어를 많이 사용한다고 합니다.'힝구리퐁퐁'은 BTS 정국의 인스타 스토리 무물에 등장하며 밈이 되었습니다.",
    link: "https://www.youtube.com/shorts/gHxey6Rr1Sw",
  },
  {
    name: "감동이 심해",
    imgSrc:
      "https://img.insight.co.kr/static/2022/04/12/700/img_20220412095454_e2pna5xp.webp",
    content:
      "일상생활에서 감동을 받는 상황에서 요즘은 '감동 심해~'라고 표현합니다. '감동 심해'란? '감동이 심하다 심해'의 줄임말인데요, 상대방에게 감동받은 이 순간 고마움을 표현함과 동시에 귀염귀염 한 이미지를 보여줄 수 있어요.",
    link: "https://www.youtube.com/watch?v=P6jTpkw1bu0",
  },
  {
    name: "OO 아티스트",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbziXEw%2FbtrLu9DoZfG%2FvSAaeONuAtFaAzAxRQS45K%2Fimg.png",
    content:
      "'아티스트'란 자신이 잘하는 일을 표현하는 말 뒤에 사용하는 단어입니다. 잘하는 일이라면 뭐든지 OK👌 최근 그룹 드리핀의 멤버 '차준호'가 버블을 통해 '아티스트'를 재미있는 방법으로 사용하며 한 번 더 크게 인기를 끌었답니다.",
    link: "",
  },
  {
    name: "O떤",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlqoDy%2FbtrLuBOhI74%2FlXtT0KPuzMQR8mMAR8jTCK%2Fimg.png",
    content:
      "O떤 이라는 표현을 아시나요? 관심 대상의 성이나 애칭 등을 O 자리에 넣어 사용하며 관심 대상을 강조하는 표현이에요.",
    link: "",
  },
  {
    name: "ㄴ겠냐?",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrCaQ1%2FbtrLqXZcFH3%2FVWvtOKmXYGHwnEkU0wQC70%2Fimg.png",
    content:
      "ㄴ겠냐? 는 자문자답형 밈이에요. 'ㄴ'은 '↳'처럼 댓글을 달 때 쓰는 기호처럼 사용되고, '~겠냐'는 '되겠냐', '하겠냐' 등을 의미합니다!",
    link: "",
  },
  {
    name: "갓생",
    imgSrc:
      "https://cdn.poomang.com/img/test_asset/collaboration/peripera/og/04.png",
    content:
      "GOD(신)를 뜻하는 '갓'과 인생을 합친말로 부지런하고 남의 모범이 되는 삶을 사는 것을 말해요. 어려운 것부터 쉬운 것까지 매일매일 규칙적으로 무언가를 하는 것이 중요하죠? 예를들어 매일 새벽 5시에 일어나 스트레칭을 하고 책을 한시간 읽고 출근을 한다. 퇴근 후에는 영어 공부를 하루에 1시간씩 한다. 이런 식으로 성취감을 느낄 수 있는 스케쥴을 짜고 그것을 지켜가는 생활을 말합니다. 나 오늘부터 갓생 산다!",
    link: "",
  },
  {
    name: "쿠쿠루삥뽕",
    imgSrc:
      "https://ogq-sticker-global-cdn-z01.afreecatv.com/sticker/17fd154122d13b4/main.png",
    content:
      "웃긴상황에서 쓰는 표현이라고 합니다. 온라인에서 웃기거나 상대를 비꼴때, 약올릴때 쓴다고 합니다. 쿠쿠루삥뽕!",
    link: "",
  },
  {
    name: "왜요?제가 OO한사람처럼 생겼나요?",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGkltO%2FbtrqMcgdi6H%2Fi0yxauDJnREqG2ryZ7rGuK%2Fimg.jpg",
    content:
      "김옥정님(연예인 하하의 어머니)이 유행시킨 문장이라고 합니다. 왜요? 제가 밈 모르는 사람처럼 생겼나요?",
    link: "",
  },
  {
    name: "가보자고",
    imgSrc:
      "https://pbs.twimg.com/profile_images/1442619537220792326/ibAEc6bH_400x400.jpg",
    content:
      "트위터에서 시작된 밈이에요. 해보자, 가자, 이런 식으로 의욕적인 느낌으로 하는 말이라고 해요!",
    link: "",
  },
  {
    name: "비상이다",
    imgSrc:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTbTAm%2FbtrqMvGGTeX%2FGlYwr1LgtJTRuPORJu2zk0%2Fimg.jpg",
    content:
      "감동적인 글, 사진 등을 보고 눈물이 날 것 같을 때 (눈물이날것 같아)비상이다 라는 식으로 쓴다고 해요. 비상이다...ㅠㅠ",
    link: "",
  },
  {
    name: "킹받네",
    imgSrc:
      "https://s3.ap-northeast-2.amazonaws.com/univ-careet/FileData/Article/526/b1d87ce8-1116-4ccd-adb3-2937ee25183b.JPG",
    content:
      "이제 ‘킹받네’라는 단어는 도저히 ‘열 받네’ ‘빡치네’ 정도의 단어로 대체할 수 없는 고유어(?)가 되었어요. 그도 그럴 것이 Z세대는 정말 다양한 상황에서 여러 용도로 ‘킹받네’라는 말을 사용하고 있거든요. 신기한 점은 이 신조어가 어떤 상황에선 부정적인 의미로도 쓰이지만, 어떤 상황에선 긍정적인 의미로도 쓰여요.",
    link: "",
  },
];
// =====================================================
// 하나씩 파란색, 회색 번갈아가며 메세지를 .chat에서 출력
// for, while, 단순 반복 복붙, 이벤트리스너 실패
// 이곳에서 객체에 like정보 추가-> 함수를 수정하기엔 일이 너무 크다
let isMineBool = true;
let memeIndex = 0;
let intervalID;
let chatContainer = selector(".chat_container");
const printChat = function () {
  if (memeIndex >= memeObjects.length) {
    clearInterval(intervalID);
    return 1;
  }
  memeObjects[memeIndex].like = 0;
  let tag = makeChatBox(memeObjects[memeIndex], isMineBool, memeIndex);
  let inContent = tag.querySelector("img");
  inContent.addEventListener("click", function () {
    msg2card(tag);
  });
  chat.prepend(tag);
  // chat.scrollTo(0, chatContainer.scrollHeight);
  memeIndex++;
  isMineBool = !isMineBool;
};

intervalID = setInterval(printChat, 2000);

chat.addEventListener("dblclick", function() {
  clearInterval(intervalID);
  intervalID = setInterval(printChat, 200);
});

// ================검색 기능================
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
  // result [undefined, {name: }, undefined] 이런식으로 리턴
  // 따라서 undefined 값을 제거해줘야하기 때문에 filter 메소드 적용
  let result = searchFilter(
    memeObjects,
    "name",
    "imgSrc",
    "content",
    "link",
    keyword
  ).filter((d) => d !== undefined);

  // 결과 값 화면 출력
  document.getElementById("result_name").innerHTML = result.map((d) => d.name);
  document.getElementById("result_img").src = result.map((d) => {
    return d.imgSrc;
  });
  document.getElementById("result_content").innerHTML = result.map(
    (d) => d.content
  );
  document.getElementById("result_link").href = result.map((d) => d.link);
}

// 클릭 시 searchMeme 함수 호출
document.querySelector(".search_box").addEventListener("submit", searchMeme);

// slide jQuery
$(document).ready(function () {
  $(".search_btn").click(function () {
    $(".panel").slideToggle("slow");
  });
});
// ===========heart로 정렬 ====================
let heartSort = selector(".heart_sort");
heartSort.addEventListener('click', function() {
  sortElementBySelector(".chat>.messages", ".chat>.messages .is_like");
  elementsReverseBySelector(".chat>.messages");
  chat.scrollTo(0, 0);
  let chats = selectorAll(".chat .chat_animation");
  let cards = selectorAll(".chat>.messages:not(.chat_animation)");
  let hearts = selectorAll(".heart");
  for(let chat of chats) {
    selector("img", chat).addEventListener("click", function() {
      msg2card(chat);
    });
  }
  for(let card of cards) {
    card.addEventListener("click", function() {
      card2msg(card);
    });
  }
  for(let heart of hearts) {
    heart.addEventListener("click", function() {
      heartToggle(heart);
    });
  }
});

// ============배경화면 바꾸는 기능 ============
function bgChange() {
  let bgUrl = [
    "/static/image/indexbg1.jpg",
    "/static/image/indexbg2.jpg",
    "/static/image/indexbg3.jpg",
    "/static/image/indexbg4.jpg",
  ];

  var num = Math.floor(Math.random() * bgUrl.length);
  console.log(`'url("${bgUrl[num]}")'`);
  // document.body.style.backgroundImage = `url("${bgUrl[num]}")`
  document.body.style.background = `url("${bgUrl[num]}")`;
  document.body.style.backgroundSize = "cover";
}

let inputName = selector(".input-name");
let inputContent = selector(".input-content");
let inputLink = selector(".input-link");
let inputImg = selector("#choose-file");
let postButton = selector(".post-button");
postButton.addEventListener("click", function () {

  // 만약 입력이 비었다면 작동하지 않음
  if (Boolean(!inputName.value.trim()) || !Boolean(inputContent.value.trim())) {
    return 1;
  }
  //
  let newMeme = {
    name : inputName.value,
    imgSrc : selector('#preview').src,
    content : inputContent.value,
    link : inputLink.value,
    memeIndex : memeObjects.length,
    'like': 0
  };
  memeObjects.push(newMeme);
  // 입력창 초기화
  removeClass(selector(".input-box2"), "slidein");
  addClass(selector(".input-box2"), "slideout");
  removeClass(selector(".input-box1"), "slideout");
  addClass(selector(".input-box1"), "slidein");
  // selector(".input-box2").style = "display: none";

  // 만약 x 버튼 추가하면 위 두줄만 추가하면 됨->더블클릭으로 구현됨
  inputName.value = "";
  inputContent.value = "";
  inputLink.value = "";
  inputImg.value = "";
  selector("#preview").src = "";
  selector(".input-origin").style = "display: auto";
  selector(".preview").style = "display: none";

  // 채팅창에 입력받은 내용 추가
  let inputChat = makeChatBox(newMeme, true, newMeme.memeIndex);
  // 파란메세지 인지 회색인지 결정?
  inputChat.addEventListener("click", function () {
    msg2card(inputChat);
  });
  chat.prepend(inputChat);
});
// 밈 입력, 업로드 후 사진을 다시 선택하면 새로고침이 표시되지 않는 문제를 위해 추가
inputImg.addEventListener("change", function () {
  selector(".preview").style = "display: auto";
});

// 자동스크롤기능->페이지 로드후 채팅이 하나하나 .chat에서 출력되는 걸로 사용

// 위로가기 기능
selector(".scroll_text").addEventListener("click", function (event) {
  chat.scrollTo(0, 0);
});

// 다크모드 기능
let Mode = document.querySelector('body')
let ModeChat = document.querySelector('.chat')
let mg = document.querySelector('.message.last')

let darkSp = document.querySelector('.dark')
let lightSp = document.querySelector('.light')

darkSp.addEventListener('click', function () {
  Mode.classList.toggle('dark-mode-body');
  ModeChat.classList.toggle('dark-mode-chat');

  document.querySelector('.dark').classList.remove('small-around');
  document.querySelector('.dark').classList.toggle('big-around');

  document.querySelector('.light').classList.remove('big-around');
  document.querySelector('.light').classList.toggle('small-around');
})

lightSp.addEventListener('click', function () {
  Mode.classList.toggle('dark-mode-body');
  ModeChat.classList.toggle('dark-mode-chat');

  document.querySelector('.dark').classList.toggle('big-around');
  document.querySelector('.dark').classList.add('small-around');

  document.querySelector('.light').classList.toggle('small-around');
  document.querySelector('.light').classList.add('big-around');
})

// 마우스 클릭 이벤트
let removeTimeOut;

function clickPosition(e) {
  const target = document.getElementById("clickEffect"),
    a = 40; // #clickEffect의 너비 & 높이 값 / 2

  e.button === 0 &&
    ((target.style.transform = `translate(${e.clientX - a}px, ${
      e.clientY - a
    }px)`),
    target.classList.contains("effect")
      ? (clearTimeout(removeTimeOut),
        target.classList.remove("effect"),
        void target.offsetWidth,
        target.classList.add("effect"),
        removeEffect())
      : (target.classList.add("effect"), removeEffect()));
}

function removeEffect() {
  removeTimeOut = setTimeout(function () {
    document.getElementById("clickEffect").classList.remove("effect");
  }, 500); // #clickEffect.effect::after의 시간 (.5s) * 1000
}

document.addEventListener("mousedown", clickPosition);
