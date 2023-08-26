const path = require("path");

// entry: точка входа в приложение
// mode: режим компиляции
// output: что подается на выход
// libraryTarget: позволяет использовать импорты как requare так и обычный import 
// resolve: настройки импортов
// externals: для библиотек, указываем что исключить из сборки (подразумевая что он должен быть установлен у потребителя )
// module: указываем лоадеры
// rules: массив правил
// use: название лоадеров которые должны использоваться согласно рег.выражению
// exclude: исключения
module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    clean: true
  },
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  externals: {
    react: "react"
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ],

  }
}
