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

// ============sleep 함수(코드 실행 지연) ============================
function sleep(sec) {
  let start = Date.now(),
    now = start;
  while (now - start < sec * 1000) {
    now = Date.now();
  }
}
// ===========================채팅박스================
const makeChatBox = function (data, isMine, memeIndex = -1) {
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
  // image.addEventListener('click', function() {
  //   image.classList.toggle('chat_big');
  // })
  imageWrap.append(image);
  // answer.push(imageWrap);
  let messagesWrap = create("div");
  messagesWrap.append(imageWrap);

  // image 사이즈 에 관해 rescale 필요하다
  // css 에서 @media로 설정하기

  addClass(messagesWrap, isMine ? "mine" : "yours");
  addClass(messagesWrap, "messages");

  let messageText = create("div");
  messageText.innerText = data.name;
  addClass(messageText, "message");
  addClass(messageText, "last");
  messagesWrap.append(messageText);
  messagesWrap.addEventListener("click", function () {
    toggleClass(messageText, "msg_big");
    toggleClass(image, "chat_big");
  });
  // answer.push(messagesWrap);
  if (memeIndex > -1) {
    let memeIdNum = create("span");
    addClass(memeIdNum, "hide");
    memeIdNum.innerText = memeIndex;
    messagesWrap.append(memeIdNum);
  }

  //animation을위해 추가됨
  addClass(messagesWrap, "chat_animation");

  return messagesWrap;
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
  // console.log(msg2card);
  // isMine = msg.classList.contains("mine");
  let memeIndex = msg.querySelector("span.hide");
  memeIndex = Number(memeIndex.innerText);
  let replaceCard = makeCard(memeObjects[memeIndex], memeIndex);
  msg.querySelector(".message").innerHTML = "";
  msg.querySelector(".message").append(replaceCard);
  msg.querySelector(".messages .messages").innerHTML = "";
  addClass(msg.querySelector(".message"), "card_message");
  removeClass(msg, "chat_animation");
  let readyToggle = true;
  //무한루프 방지코드
  msg.addEventListener("click", function () {
    if (readyToggle) {
      readyToggle = false;
      card2msg(msg);
    }
  });
};

// =====================카드 -> 메세지 ======================
const card2msg = function (card) {
  // let memeIndex = card.querySelector();
  // 처음에 메세지를 어떻게 만들었는지 생각 하자
  // card2msg()는 msg2card()의 msg태그를 입력받는다.
  let isMine = card.classList.contains("mine");
  let memeIndex = Number(card.querySelector("span.hide").innerText);
  let chat = selector(".chat");
  let chatTag = makeChatBox(memeObjects[memeIndex], isMine, memeIndex);
  let chatTagTemp = chatTag.classList;
  card.innerHTML = chatTag.innerHTML;
  card.classList = chatTagTemp;
  // 여기서부터 card는 그전과 같은 채팅
  addClass(card, "chat_animation");
  let readyToggle = true;
  // 무한루프 방지코드
  card.addEventListener("click", function () {
    if (readyToggle) {
      readyToggle = false;
      msg2card(card);
    }
  });
};

// ================= 메인 코드:채팅========================
let tags = makeChatBox(
  {
    name: "구워버린다",
    imgSrc:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFRUYGBIYGBgYGBgYGBgREhIRGBUZGRgUGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISGjQhGiExNDQ0MTQxNDQ0MTQ0NDQ0NDQ0MTExMTQ0NDE0ND80NDExMTc0MT8/NDQxNDQ0MTExNP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQACAwYBB//EADwQAAEDAwIEAwYFAwIGAwAAAAEAAhEDBCESMQUiQVFhcYETMkKRobEGwdHh8FJi8SOycoKSosLiBxQV/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAHxEBAQEBAAMBAAMBAAAAAAAAAAERAhIhMUFRYXEi/9oADAMBAAIRAxEAPwBC1wAWdR6x3Ue5edY5Uk+a0Y5YPfhVZVRf6GD2lVdVhDCoqOelOaJBLq6vTrpeSsateFpzyrxp6Lod1qL0Ll23RKIZVJWngfiem4BXpAjdKKVZGisIR4qnK1V0KjapQ9R8lXpFaTnGsjoOA3JDsldrQvgBuvl4uiwyFuzjbzyjdacm7ninFmtG+UhotfVdJ91Y2Fk95Dn5XT21qGhUNUtrQALZ4AWjnQsHlI9Z6JKOt6SzoU0bSYnE1s1quViXqpelTjV6FqlXc9ZPQoK9C1WHsmWgKvsggFHszKu1iamiFQ0gggAC2Y9auorMMIQaxK81L0ArxzEBX2ii89mopD5qx6s94CGY1Vc3K5Mjkxd+V4BCs0rN5KUhznVjUXhK8a1WexXOWk5eNeFjVbK90q0Fac84vA7KeUQ0KoatGBWeLsCJY1YsC1D0hjx4VQ+FWo9Y6lYXeSTAT3gfDJOooDh1vJC7WxptawkgQBPafBOehpjZ24aFpXqwkbb57DOkaP7eWB2jZb07xtQcpz18ETqX0d5v1rUu8qrbkSh6tAqW1k5x3Tukf2ZlMdOEHZ0S0IxxgKkh3hZkKz3ryVFXFVVwXpKo5+EjWao4oK4v2t3KRcQ/E7Ge7JPgqLY6wPWZeFxdD8Ys2dhPLDibKwLmHlHvOJhjfM/kpvo57N9YK8Sc8Up62sBcQXBuoABskwInJCP9oiXQJleFDtqq3tAgNIXiprUQNfKy+FXJRzKAKs1jQuWTHLMBhsLJ7SmFZgKo2mFfPP8ALTnkJSB6rR7wtH01VtJX8awPklasYtdC9AVBi9io1bv2QxcgLkrzWqucqbph650rSiyV6ykmVlaSVUIbw2jEJ+y4hjwR8PkMEdUNbWcBEspZjuCEhBIohzNhkdCf1XP1wab9TDjqMR65XSW90wNAJE9fNB39Bj9jB+QUZK0yyvOHcQa8DI7eR7FdHZW4Xzeox9N+pphw2wdLh4912X4c/ELKjIfy1G4d1B/uHgtOevyo65/h0+gBDV3ryrfMidQjzS6vxJgE6xHmqqIJK8eYCVP49Sbu7KHueNsc3kPRLFaOub5rNykd7x3o0pNf3D3yZx5pRVZU30lGFaYXnES7cpVXqSqstazzDWOnygLouG2NO3IL9NS43g5pUj4gZe76BLrqT/Rzzpfw38NlwFW4llHcNGKlXsAPhb4n07p46pqAYxrGUme6yBpb4x1d4lVaX1CXPfqnpzEDwiYV/ZgYgfIj/Kyu33WsyfAdxUaxzXSIadRIkxpz3RnDOPtfgnK5vjFTS14G7iGjtA5if9qSUapBkGCr5npHVyvqoqTkbKxqrmPw7xjWNLzkLoH1moyqljX26iH9o1RHs/TiG3BWdy890Ix6vVfIXPJnWOTmZ03p1id0XTKXUnI+icLazG8aEqKhK8c9M1yVm5y8NRULkGj3IZxWtR6wmU4T0lEUGLyjSTG2oJhpa20rpOGWMLLh1n1T2iwAIJBRgKjaQlaueirG2LjKuRNpFVhlQsmCcjlHXxRA2hzyfSPstON0HisIaAAwHV67LL2wjdkrP1LW8uyEvErYbgY84Si2raHlzevbMzjPdPLwOeYOG7SP5sgX2Qb7rgCNwcyVNpVa7qGYY/kdmD8HcFJL4vYZDpzAiQPNH1GdBBO0yZiIg9phc9e3T/axzQeh3jy7/oq5tT1ja5vCY7R6g9QqWl7kazDDgnwyhLl7tcOECDAGA0QY+e6HpZcG/DPXoTur1DoHvfIDWzT7jZ22fqPmmtq95e1o0gkRBMafErmOGcQexxYHcrsYknHWE7oVycu2B5ScEgQQ0EHqY+qnq1UkP+J3Qps0McHVHe8+YDQRnSPhH1KR21NsyCXHrmJM+S2ZYGrkktOXOcctI7jvPQKWtZoeWvIa0YEgAeGxUcyL0wbcCIaNJ8YbPqAh3XcYcTPlBB6bI2oKRGHNmPMEff7pJf1mtM7kSeXmkgY8VVEsJON3QdU0jZog9ec5d+nolZdlR7XSS4GSSc4n5qpKuTGduiKFdzDqBTNnGHnqkoK3t3YQRt/+y5RLNKiDE02LR7MKMKJY2Vz9WS+02yF7DCOtnoa5ZCpRqK5fKaqGD3od71498qkpmuHLxz1mXq9OmSmFSCVtRorRlJFUmpklKknfDLWUDQoEp9YMhPBppb0oCs96y9tAheNMokIRQYXGF1nDbSGhJeEW8uBXW27ICtP2uE/HzC0AtMSIK5DglJ73SXHQNxME+K7v/wCRrUeybUG4MEDrK4bhdFzGPe/lJHKJ2HSeiy6nu1rz1/zg+9qhgIafMk7evdI6ku5gdTt2mYGgjr3/AHW1QF7hjJ97cA98xlY1OoaIDSAT1Aho1d4iFIVZb64Mnc6icRpBOqesTHmlN5btbXkkNb7xdzHvjOZjHomfFappAFxBMgnTPMdpPmJ85Cn4ntnC3pv+EQe/WMnqIx6J/Cwi4pbgODgCXOZqOAI5yBHyI/JeUmNGvEAw0d8AOP8A4j1VuK3ALxG2gEH+qHE6j29FmXN9i+cEmRvzQMHPn9FX4AtnS/1Yy0+Jz5gplpLDtsHQdzO+3qiKdq1tGm8xqEmewJnP0WbKutrdySySS7lbkQ4k7bFK3R8E2d49h3MSOWeY9yT+SaNAeJLdMSTPM4x4Db1SmsGtHI6H9SOV0Ebgn3Phzk56ZCpbXmg8jWwIbuXEntG30Sw29biDBLfZgHpmSPEA4+iGfWc5jyCYAj+lC8WvA9wOho7kAtM+YVKt1pplo3d9AqLS1yqVWV4VSULlvanMIVxWtF8EFAPP/ouUT20qDQ3yXqXtXpzQRNJ6FpvwrByx658k2a8vXyh6BVq6pRCvmZMOCy5Uc9Vc9ZTKrDb08lNLanhAW9FMrdpQTQslGWlvKlC3lMaFKEARQtwiDjZUZUws31JVEu15lMbSnKBtqcldHwu1nKrmJtNuE0ICesMBB21OAtLl5DDHZOlK5b8TXAc6DzBuwO3muZuwC0NjlzJiQOyPvbrU50nv1XI8U4w9zxTpMJIlsEAtJ7rG7WsM20muEES4gZEwT0bPRB8TtjTA0loxsW6gd4nHiFSlwu7ax7zVa2GE8oJcIExPkheG2IqUhVrPe8ua4zrPI7pjsl8FrXjTPaWzHwTpc3U2MlvUgwMefgmfExTfbaAcFkdTADZH+f4Od4fcVCXta/XTa4tbPMC0AHB36robOi2pROjDmnSRvpdI5fLZF+4JZZriL612kkuaGjPTGWgev1VnWji1rThjiyNuh0kT5EfwBM722jBy5uJ32EDyAlvoPkNXdLWtH9RPiP5lP2DXiWj2DmgTynBOnlOeowYgyEpsKWijrifnA9dhg9iSEdfCGc7oBAkCS7c4+qV3vEHsaxophjXYYXCS5s7x8kcitNbnO1HAmRHMR891Z1GXyB0ABIjMyXEDb9kLWualOHuaxzXGNtMHyGFV9+4OkscAR54T+gTfWpjOR02B/dLLmiQAdwMT4I8X7Xtx7/1hVY8FpkYjPXPdGgn6qP2VnhZvOFSWJRDdljT3W70A8sro6G+S9WVpT5G+SiWq8QdB6IBQtEIhqQZ1Cqgq7wsiEE9cZRdtRWVCkmFFiA2o00xtqKxtqKd2lskatGnCILoRzLUQhLmjCZBi9b0WShmU8ppaUVUTR1jQmF1NhRgBK+G0F0FBsLSIohqyussI8FcFVqHCA+S8aqhrn6i4GYx0KWWA0y/Mbk+8V0n4j4K59ZxGxzkxnySw2pDdGqCN5Ejw9Fl1PxrzRHDOJNcXMeffBAMjYjqklFxtHOo1wfYEnRUALmQfhPzXtYAO0u5XbRA0n/hcmVpxEMbpeS+md2vAc0DuCSVFmzDpZb3dnbsJY8POdLG5cSc57eq2/Ad04vqCpj2p1tBxkYO/Tb5J/atsXSWUGNfuSWCdseAXJ2125t5y5YXOHSGtLgdQ6dAlJJowXxp4D3MAiTIEAzudQPUeX6pGKZL2+f3XW3lEPJe0fPE+J6Rt4rnLimWZI3OOkweny+ycvoZ7Bcau/wDXaCf9NuPDXET/ADxUurUv0OBkMPf4d8eo+qXsb7V+kkwScnzT2n+G2ganVyKY7HHqnZn6M0HdM1llJvM7VJ66fP7plxJzGgNgEgc0d+yGqVadFpFIQ6MvJOojwCW19RnPbBySfzQICuGBrpb/AIW08pPh915cUSQAN0K8EcpT+j4q4LGq5bBY1RlVEpSW1MSVixFWzZcAgH9nQ5G46KJxa240N8lFLTyjkKey0aVkwraiJKW6jV2U5RAtVsxgC3a/CYY0qSY29BY0WSUyt2JaeNrahkBP7WhAQNpR6pqzARCqOeAgbh0qXNSCsGulMNqFGU1taCDtgnVkyVpIimdjSgJkwIe3bhEhPU49WVZ+FdzkBcvTGOb/ABMHxrZu37LjL24fUEhhB6nx7r6JXbqnC5i/sAx2tpjw2BWXU/WnNcrRo1WiA6XT1zH6Im24Y97tT2iAckSJ+XRNKNRhdJADtvH0CZOY8simx5I7tLG5zhz4H+VHtfosqN0NhgBdGXGCJPUCP54JFXYaT2dS6S4xuSTA+WSU7rVqjHhrw1mRkgEOkbNcDA+qx4pauL2v0FzdWnUDILtIIE+O0qbqucMvaANBMSGg9s9TP5rluL1uXMeGIjKY16j9WWY/tII/yk3GXy0gscBEk4xie6XM9qs9EtoYdqExq+XjCa3DyW4nz32nGNuvohLWlDZIIb0799lpbvBwTynaRpx3haaywF7d0xq2xnp+pXtCo0OO580e6xiSABtnqszat6yClp4ydVDZPXolpqBxlw9RuP1RNyBsD5oQBVCqzmQJGR9vMdEK8yty4jI3VHCdsH6Hy7KkqMRdp7w8wsGU+6NsANYQHbW/ujyXq8o1xpHkopU4Jj0XRdCDptRdMEp4kwY+VvTYVW0od0zFIQlVKW1NPLG16lB2NFO6MBKAVTpwFHvhQVQgrqsmTyuZXtJqwpvlMbWkCnzCtb21NO7BqGtqSYW7FpEGFMrXUsWrx70wlWogaj56fPC0qvQxcgM3sJ6/kEp4lSb1BeegkxP3KdPHf5Df9kvv28pAxjIadJj+5/QfzCmnHNu1MJyxh/pYB7Qj+6JI/wCYhXp3uvle5wz05Yd0k9P5hZmmXEsBDWjmMcrGj+o9T5kkmY8FW1h7gBy02GG6ol9SJLnf8LQXR0AA6knNWvLlrtWnW9zd4e0OZA6at/WV0nDCwUNDmANgggGW53gpJdXbWwGzBzky4N+HVPXqex1Lx7qhbNNzT5o5mU7djmeMgWdR7Wue6m/S5nxNp8x1M7zstuF8KNUmrWLtDvcYTADemoDcmJyhuNWdy94lox6jf6bJvY+0a0amxjMFO887p+XWYUcaotL9LXho2gDmnoEJbWdP+h4LSSXbCR67J3dBjjzDUQCfQZ3QFy0S3SSGOBgTJ17OYD32gbGQOqjD0Fclz8NdqHYiHAfn6JfWuA0Fo36+C9ur1zYZhzCJHSRO7Tu0+HfcLB4kT77RvOKjB49x45HknOStYeKyK29niRkfIjzH5qgEplWSrK0heFUSzZPn90Vw+mXPACEDk/8Aw3bS7UUrciuZtw7p2pgKJmostro8OXz6hQlMaNvC8pMARbCFo5hdtTTG3oyc7JdbPzCdUhDZRYeiWMa1DXN1pWD7okwqPEpYTw8RVm3BchHW/ZE0LYqpCG25Tq0CSW1uZXQWdud1cIytcppTCW2xhMWOVJbys6lRQuQldyArVfKwbU7fP9FhWqfL6kof25/ZSoc5/b90NcM1NIH88Ssw4nCI9mdMfPx/ZTaI4/iQfqDGYbqkk41Ebvf2aBJjoJ6krVgaWlzctDIjqaZOqCO7yJPYOZ2R17bAag74hzdCKY3Hm7A/ykL7p1ENDhPtHue7s1gdAA8OXb+0KTeVQ7XJM5g+J6u9TJ9Vuy5Ldjnp+ZQlC7a4aui0cJyl7UMq8TIbkAnCBvuIOO2OuEPUaTucIO4xkpbRJAj74tMgbSY7wCQPoF4ypq10XHlPMx20QSGunoNJHoXHcBD18nHj9cfqtHODSxxyYAPjHLH/AEwFUosVfTBDte4POI5mvmPbAeOA4d4PUQscHMdvBGQQcEHZwPZFXld0te3JB0OnIcNMtcR1D2H10u7rxlEER8BksJyabviYT1G30PUhBKF2rblqdhhr/LsfDY/Q5Fs+fUfmrmmZg9FqDJn4h/3Dx8fv9wA3gyvAEbc0tiNih2tynox4ynnAXU8KpFjUq4Xb6nhdfQptwIU9Vpxz+sPaOUTZtBvYKKWmuJY1F0KaoyjlM7Ogrc6lvZndNWUzphasaAFR70AufTgqys85XtISQnIVb21GU5trKRshbQQndEmNlchMKdjBTGmyAvablodk5C1ixxlHW7kG0IugEybuQVd6LeUDXQAlQSqNYFcrWjTlTTi1JkCev5LQ4C3FNC3M7KVEfGD3O/2HT6j5JfeWofynoA3yIbB+spvf2+uJ8Pqf3XPsv+dwI+I/UpU4S3PDX0gQ3LULTvHxpiCuve7UD1CT3Nq0BxjKQJal0YwUFc3IAy7KY2tpq3Xlzwxk5QZHUuwNt1k6u57cdH/Rzf8A0Th/D2dsKjabBMN6fY/pKNGMbK3Ja0O+IFn/ADAgsP2b5Srgj3fhO/gejh4j7EjqvTJaR5H5Y/P6L2pkz35vU7/WR6IDF7D7h94bHuP6Z7dkPUEbdES4yNPVvXu3qPTf59kLduxPXr59/VAomdTJ69fPv/PFCrSxOD22PkqPbBQDrguMp2LgJDwszhNHUylYqdYYtvx3UQQpqIxXkrbMkpnQZBUUVRkLe3CDqVeiiiQDyiKDVFFcSbWlKYC6GhSACiiYaQF7GFFFSVAiKLlFEKWe5B1XKKJUMAMoqmFFFNEENKxrtUUSMJVaPsuQ4rRaHGMFRRFAO1uC0wrcQrSBG6iik4EEgBZVD4KKIUzfHVCOIBk/wdVFEgxL8wMbj8kHUeSoomTP2kHHRY1RzeB/2np/OyiiojCzpw0hY1mfzwKiin9P8NOBsBcukfQEKKIpsNCiiiA//9k=",
    // kakao서버 문제로 로드되지 않음
    // 'imgSrc': 'https://blog.kakaocdn.net/dn/cndgTT/btrpJSi0TEo/9SDMGVMGqXVJBEKQkFx97K/img.jpg',
    content:
      "아이돌 그룹 NCT 천러가 팬들과 소통하는 앱 '버블'에서 한 말에서 시작됐어요. 천러가 버블로 팬들에게 우리 이제 화날 때 구워버릴까를 사용하자'라고 말했어요. 구워버린다는 화가 나는 상황에서 귀엽게 쓸 수 있어요.",
    link: "https://theqoo.net/nctdream/2301141145",
  },
  false
);
let chat = selector(".chat");
chat.append(tags);

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
    imgSrc: '"그 자체"라는 뜻으로 잡채의 발음이 유사함을 이용한 말장난이에요.',
    content:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmzQSG%2FbtrM65zTud0%2FQaOtP7WVWLKqirjwxPpkf1%2Fimg.jpg",
    link: "https://m.cafe.daum.net/subdued20club/ReHf/3795292?listURI=%2Fsubdued20club%2FReHf",
  },
  {
    name: "신기방기 뿡뿡방기",
    imgSrc:
      "세븐틴 정한이 만든 유행어로 이를 유행시켜 달라는 정한의 말에 팬들에게 유행처럼 번지게 되었어요.",
    content:
      "https://post-phinf.pstatic.net/MjAyMjAyMjVfMjU4/MDAxNjQ1NzIzNTYxODQx.B6KzGtl7a97op8YADphJ_m7S2zlj0mf65jY_GP53SBog.DXKjutBd5sEhJ1woycn9mpLBslXMFdWCIj7xeDNytnog.JPEG/%EC%8B%A0%EA%B8%B0%EB%B0%A9%EA%B8%B0%EB%BF%A1%EB%BF%A1%EB%B0%A9%EA%B8%B0.jpg?type=w1200",
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
      "https://w.namu.la/s/599570317e87a5972365ce5000beac36dd4a4ce411c5bc423b16ea5b08d0ad7ca29201054c7b0ccbadecdb60f99fa2f4bdeee1e4e71ca92de1fb9d733077ed860417902ce580bb9d4ed3ec6cb5a922022ff943b8833aa022e191a35ce8abca7994a13af5702565d4f4ba1861f900b803",
    content:
      "무한도전 해외극한알바 특집에서 자신을 북극으로 보내려고 하자 한 말이 유행이 되었어요.",
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
    name: "박대기 기자",
    imgSrc:
      "data:image/jpeg;base64,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",
    content:
      "어깨 위에 눈 쌓인 모습이 상당히 인상적이다. 영상을 보면 그 처절함에 몸서리를 칠 정도였다. 시간대가 넘어갈수록 머리와 어깨에 눈이 쌓이는 양이 늘어나는 모습이 보이고 목소리가 떨린다. 뉴스광장 이후 편성된 7시 50분 기상특보 중 8시에 현장을 연결했을 때는 카메라가 넘어온 줄 모르고 자기가 할 멘션을 작게 중얼거리면서 연습하는 장면이 방송에 그대로 나가 버린 것이다.",
    link: "https://mn.kbs.co.kr/mobile/news/view.do?ncd=2021544",
  },
];
let isMineBool = true;
for (let i = 0; i < memeObjects.length; i++) {
  let tag = makeChatBox(memeObjects[i], isMineBool, (memeIndex = i));
  chat.append(tag);
  tag.addEventListener("click", function () {
    msg2card(tag);
    // console.log('eventlistner');
  });
  isMineBool = !isMineBool;
}

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
  // result [undefined, {id:, name: favorites:}, undefined] 이런식으로 리턴
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
