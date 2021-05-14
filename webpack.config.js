module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  // mode: "production",
  mode: "development",
  // entry: "./src/js/index.js",
  entry: {
    index: "./src/js/index.js",
    news: "./src/js/news.js",
    contact: "./src/js/contact.js",
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        // 対象となるファイルの拡張子(cssのみ)
        test: /\.css$/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // スタイルシートをJSからlinkタグに展開する機能
          "style-loader",
          // CSSをバンドルするための機能
          "css-loader",
        ],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
