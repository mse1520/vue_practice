vue 셋팅방법

1. 터미널에서 vue를 실행할 위치폴더로 이동후 npm init을 터미널에서 실행해줍니다.
npm init은 npm을 쓰기위한 기본 명령어입니다.
author는 자신의 이름이나 id를 입력하고
license는 MIT나 SCI를 설정해줍니다.
name은 폴더이름과 같이주는게 좋을듯 합니다.

2.vue 설치하기 
npm install vue or 
npm i vue

3. webpack을 설치하기.
webpack은 여러파일을 하나의 파일로 합쳐주는 역활을 합니다.
터미널에서 npm i -D webpack webpack-cli를 실행해줍니다.
-D 개발용으로만 webpack을 사용한다는 의미입니다.
-D 대신 --save-dev를 사용해도 됩니다.
설치된것은 package.json에서 확인할 수 있습니다.

4. webpack 구조 만들기
webpack.config.js 파일을 자신의 폴더에 생성해줍니다.
main.jsx과 index.html 파일도 만들어줍니다.
main.jsx에 자신이 만든 component(.jsx 파일)를 연결하여줍니다.
만들어진 파일내부에 작성된 내용대로 작성하여 저장해줍니다.
자세한 내용은 파일내부에 주석으로 설명하였습니다.

5. webpack이 .vue파일 인식하게 하기
webpack.config.js > module > rules 에서
세세한 내용은 파일내부의 주석을 참고합니다.
vue-loader는 태그형 언어를 인식할수 있게 해줍니다.
관련 설치 목록
npm i -D vue-loader vue-template-compiler
터미널의 오류의 내용을 확인해서 plugins 합니다
설치후 npx webpack을 실행해줍니다.

6. webpack이 .vue 파일 속 css, style 인식하게 하기
npm i -D vue-style-loader css-loader
webpack.config.js > module > rules 에 추가하자

7. webpack 자동빌드 명령어 
package.json 에서 scripts 부분에 실행 명령어을 추가해주자
"webpack-watch": "webpack --watch"
npx webpack --watch

8. webpack-dev-server 설치하기
서버로서 webpack을 돌리기위한 것입니다.
npm i -D webpack-dev-server
실행명령어를 정의 해줍니다.
package.json > scrips > "dev": "webpack-dev-server"
webpack.config.js > output > publicPath 를 추가해줍니다.
자세한 내용은 해당폴더 주석을 봅시다.

9.vuex 설치하기
npm i vuex
사용법은 코드의 내용 참고

10. 번외
    1) package파일이 있는곳에서 npm i를 하면 필요한 모듈이 재다운 된다.
    2) package.json > scrips 가 실행 명령어를 정의하는 부분입니다.
    3) v-show 는 태그를 안보이게 하는 것 v-if는 태그의 존재 자체가 없는것
    4) 알아두면 좋은 자바스크립트 함수들 
    setTimeout, clearTimeout, setInterval, clearInterval

7. react router 설치하기
npm i react-router
npm i react-router-dom //웹에서 사용할때
※ 추가지식 입니다.
    npm i react-router-native //앱에서 사용할때

9. react-hot-loader 설치방법입니다. webpack-dev-server 설치방법도 섞여있습니다.
수정시 자동 빌드하기 위해 터미널에서 npm i -D react-hot-loader webpack-dev-server 명령어를 실행해줍니다.
package.json에서 dev를 "webpack-dev-server --hot"으로 변경해줍니다.
webpack-dev-server은 서버를 돌리기 위한것입니다.
--hot 설정을 위해 client.jsx 파일을 다음과 같이 수정합니다.
const { hot } = require('react-hot-loader/root');
const Hot = hot(WordRelay);
ReactDom.render(<Hot />, document.querySelector('root'));
client.jsx 파일 내부에 주석으로도 설명하였습니다.
webpack.config.js 파일도 다음과 같이 수정합니다.
webpack( module > options > plugins )부분에 'react-hot-loader/babel' 을 추가한다.
webpack.config.js 파일 내부에 주석으로도 설명하였습니다.
9번을 사용할 경우 webpack 설정에서 output의 경로가 먹지 않습니다.
경로 설정을 위해 publicPath: '/dist/' 를 설정해줍니다.
