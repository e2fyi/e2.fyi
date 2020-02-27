const { appendWebpackPlugin } = require("@rescripts/utilities");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = appendWebpackPlugin(
  new MonacoWebpackPlugin({
    // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    languages: ["json"]
  })
);
