const path = require('path'); //path는 node.js의 전용 모듈이므로 별도의 설치 X
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  //parcel index.html과 비슷함
  //파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',

  //결과물(번들)을 반환하는 설정
  output: {
    //resolve인수는 첫번째 __dirname, 두번째 'dist'를 합쳐주는 역할을 함
    //__dirname : 현재 파일이 있는 경로를 의미함
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    //clean : 기존에 사용하지 않는 파일 제거한 후, 다시 결과물을 만들 수 있음
    clean: true
  },

  module : {
    rules: [
      {
        //.scss or .css 파일을 테스트할 것
        test: /\.s?css$/,
        //순서가 중요함
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        text: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  //번들링 후, 결과물의 처리방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from : 'static' }
      ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}