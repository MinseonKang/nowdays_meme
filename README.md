<h1 align="center">👾요.밈.알 : 요즘 밈 알려드립니다!👾</h1>

* [요.밈.알 바로가기](http://115.85.181.225:8000/)

* [요.밈.알 프로젝트 소개](https://drive.google.com/file/d/1eBD5S0ZDyI1NcIE1xzrV4smmx8mSKo1i/view?usp=sharing)

요즘 밈들을 한눈에 볼 수 있는 웹페이지
<br>밈을 좋아하고, 동시에 요즘 유행하는 밈이 무엇인지 알고 싶은 분들을 위해 개발했습니다!

<h2 align="center">⚒개발 기간 및 팀원 소개⚒</h2>
<p align="center">2022. 10. 11 ~ 2022. 10. 26</p>
<p> 
    <code>강민선</code> : 시작 페이지, 퀴즈 페이지, 검색 기능 <br />
    <code>천현승</code> : 메인 페이지, 채팅 기능, 좋아요 기능 <br />
    <code>조민희</code> : 밈 작성 기능, 다크모드 기능 <br />
    <code>최우리</code> : 오늘의 밈 페이지 <br />
</p>

<h2 align="center">🖤프로젝트 소개🖤</h2>
<p>1. 시작 페이지 : 킹받는 어쩔 티비 폭격!</p>
<img src="https://user-images.githubusercontent.com/102302705/198199482-648d8bc2-b3f2-4c9d-b385-7c322502bd3b.gif">
<p>2. 메인 페이지 : 밈들을 채팅 형식으로 한눈에 볼 수 있어요!</p>
<img src="https://user-images.githubusercontent.com/102302705/198203846-a5f055eb-764d-4fa6-9fec-7ba9979d1743.gif">
<p>3. 오늘의 밈 : 오늘의 밈 랜덤 이미지를 뽑고 나서 SNS에 공유해 볼까요?</p>
<img src="https://user-images.githubusercontent.com/102302705/198199476-a0a6c76f-df25-40a9-856c-b5b4f6526686.gif">
<p>4. 2022 밈 퀴즈 : 당신의 밈력을 시험해 보세요!</p>
<img src="https://user-images.githubusercontent.com/102302705/198200368-27c56571-1cd3-4caf-8063-5b7f02ff95e6.gif">

<h2 align="center">🎁설치 방법🎁</h2>

```bash
git clone https://github.com/nowdays-meme/nowdays_meme.git    
npm install        
node app.js    
```
- localhost:8000 접속

<h2 align="center">🔍기술 스택🔍</h2>
<h4>- Language</h4>
@@ -50,9 +40,15 @@ node app.js
<img src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white">
</p>

<h4>- Server<h4>
<img src="https://img.shields.io/badge/NAVER-03C75A?style=for-the-badge&logo=NAVER&logoColor=FFFFFF">

<h4>- Editor</h4>
<img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
@@ -65,37 +61,3 @@ node app.js
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
</p>

<h2 align="center">📌트러블 슈팅📌</h2>
<ol><strong>Git merge 관련 이슈</strong></ol>
<li>local과 remote를 혼동해 프로젝트 파일이 뒤섞였던 이슈. 작업 파일만 따로 옮겨서 문제 해결!</li>
<li>코드 수정 도중 문제가 발생해 github에서 예전 버전 브랜치를 가져와 문제 해결!</li>
<li>Github의 pull request를 사용해 충돌 문제 해결!</li>
<br>
<details>
<summary>프로젝트 회고</summary>
👍 <strong>잘한 점</strong>
<br>
<li> header, 검색, 채팅 기능, footer 등 기능을 컴포넌트로 나누어 만들어 유지 보수 용이 </li>
<br>
<li> 기본적이고 자주 사용되는 기능은 함수로 지정해 javascript 간소화 </li>
<br>
<li> setInterval함수를 이용해 실시간 채팅과 같은 애니메이션 효과 구현 </li>
<br>
<li> 실제 채팅과 같은 애니메이션 효과가 추가 된 채팅 입력 박스 기능 구현 </li>
<br>
<li> map, fliter, includes 메서드를 사용한 배열 객체 검색 기능 구현 </li>
<br>
<li> 다크모드, 좋아요 하트 누르기 기능, 좋아요 누른 항목 보여주기 기능 구현 </li>
<br>
<li> setTimeout함수를 이용한 랜덤이미지 기능 게임 기능 구현 </li>
<br>
👎<strong>아쉬운 점</strong>
<br>
<li> DB 사용을 못하는 환경이라 추가 기능 구현에 한계 </li>
<br>
<li>bootstrap사용에 익숙하지 않아서 개발 중에 클래스가 겹쳐서 딜레이가 생겼던 문제 </li>
</details>

🥺최우수상!🥺
<br>
<img src="https://ifh.cc/g/LFy8nJ.jpg">
