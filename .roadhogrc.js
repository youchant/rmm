const webpack = require('webpack');

export default {
  "entry": ["src/index.js", "src/fake.js"],
  "multipage": true,
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  },
  "theme": {
    "border-radius-base": "2px",
    "border-radius-sm": "1px"
  },
  "proxy": {

  }
}
;
