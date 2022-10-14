const d = document;
  // d는 document

  // ===========================채팅박스================
const makeChatBox = function(data, isMine) {
  //data: Objectf = {'name':, 'imgSrc':, 'text':,'link':}
  //  -> 이미지가 없다면?
  //isMine: true, false
  // return을 <div class="chat"></div>에 추가
  let answer = [];

  let imageWrap = d.createElement('div');
  imageWrap.classList.add(isMine ? 'mine' : 'yours');
  imageWrap.classList.add('messages');

  let image = d.createElement('img');
  image.src = data.imgSrc;
  image.classList.add('chat_img');
  imageWrap.append(image);
  answer.push(imageWrap);

  // image 사이즈 에 관해 rescale 필요하다
  // css 에서 @media로 설정하기

  let messagesWrap = d.createElement('div');
  messagesWrap.classList.add(isMine ? 'mine' : 'yours');
  messagesWrap.classList.add('messages');

  let messageText = d.createElement('div');
  messageText.innerText = data.name;
  messageText.classList.add('message');
  messageText.classList.add('last');
  messagesWrap.append(messageText);
  answer.push(messagesWrap);

  return answer;
}

// ======================Popup===============================
const popupTag = function(element) {
  if(element == 'close') {
    d.getElementById('hide_back').classList.add('hide');
    d.getElementById('hide_container').classList.add('hide');
  }
  let popupContent = d.getElementById('popup');
  popupContent.innerHTML = element.innerHTML;
  d.getElementById('hide_back').classList.remove('hide');
  d.getElementById('hide_container').classList.remove('hide');
  
}

// ================= 테스트 코드:채팅========================
let tags = makeChatBox(
  {
    'name':'구워버린다',
    'imgSrc': 'https://blog.kakaocdn.net/dn/cndgTT/btrpJSi0TEo/9SDMGVMGqXVJBEKQkFx97K/img.jpg',
    'content': "아이돌 그룹 NCT 천러가 팬들과 소통하는 앱 '버블'에서 한 말에서 시작됐어요. 천러가 버블로 팬들에게 우리 이제 화날 때 구워버릴까를 사용하자'라고 말했어요. 구워버린다는 화가 나는 상황에서 귀엽게 쓸 수 있어요."  ,
    'link':'https://theqoo.net/nctdream/2301141145'
  },
  false
);
let chat = d.getElementsByClassName("chat")[0];
chat.append(tags[0]);
chat.append(tags[1]);

// ================= 테스트 코드:팝업========================
let popupContent = d.createElement('div');
popupContent.innerHTML = "<div>\
  <h3 class='popup_name'>Popup Test</h3>\
  <p>\
    대충 popupTag() 에 대한 설명\
    <ul>\
      <li>\
        파라미터<br>\
        <span>\
          makeCard() 로 만들어진 완성된 div 객체를 입력해서 popup 시킬예정\
        </span>  \
      </li>\
      <br>\
      <li>\
        컨텐츠 입력<br>\
        <span>\
          미리 페이지 아래 샵입된 #popup의 innerHTML을 수정\
        </span>\
      </li>\
      <br>\
      <li>\
        z-index<br>\
        <span>\
          popupTag()는 미리 준비된 tag들의 z-index를 조정해서 보이거나 사라짐\
        </span>\
      </li>\
    </ul> \
  </p>\
</div>";
popupTag(popupContent);
