const path = require("path");
console.log(__dirname);

module.exports = {
  mode: "development",
  entry: {
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist/js"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
};
