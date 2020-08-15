const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
//process.env.NODE_ENV = 'production';

module.exports = {
    //name: 'webpack-setting',
    mode: 'development', //실서비스는 production
    devtool: 'eval', //실서비스는 hidden-source-map
    resolve: {
        //import 할때 확장자도 알아서 붙여줌
        //entry 부분에서 합쳐질 파일의 확장자를 알아서 붙여준다.
        extensions: ['.vue', '.js']
    },
    //입력
    entry: {
        //main.jsx 안에 연결할 파일이 서로 연결된경우 알아서 찾아주기 때문에 main.jsx 파일만 입력해준다.
        //app은 나중에 하나로 합쳐질 파일의 이름 main은 참조할 파일의 이름
        app: ['./main']
        //app: path.join(__dirname, 'main')
    },
    //webpack 설정
    module: {
        rules: [{
            //test는 어떤 파일이 함쳐지는지에 대한 내용입니다.
            test: /\.vue?$/, //$는 붙여줘도 되고 안해도되는듯??
            loader: 'vue-loader' //.vue파일을 만났을때 vue-loader로 처리하란 뜻
            //use: 'vue-loader' 
        }, {
            test: /\.css?$/,
            //use 순서 중요
            use: ['vue-style-loader', 'css-loader']
        }]
    },
    //터미널  오류 내용을 보고 추가해준 플러그인
    plugins: [new VueLoaderPlugin()],
    //출력
    output: {
        //절대경로로 설정해야합니다.
        //절대경로를 설정하기위한 path.join()
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
        //entry 에서 지정한 이름을 그대로 사용할때 name을 사용할 수 있다.
        //filename: '[name].js'
        //webpack-dev-server 사용시 publicPath를 추가합시다
        //publicPath: '/dist/'
    }
};