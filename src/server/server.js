const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("../../webpack.dev.js");

const app = express();
app.use(express.static("public"));

if (process.env.NODE_ENV === '"development') {
  //webpack for dev
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  //Static serve the dist/ folder in production
  app.use(express.static("dist"));
}

const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port 3000!`));
