const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
  const alphaN = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const amount = 6;
  let output = "";
  for (let i = 0; i < amount; i++) {
    let CharIndex = Math.floor(Math.random() * alphaN.length);
    output += alphaN[CharIndex];
  }
  return output;
}
generateRandomString();

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
    res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});


app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  const templateVars = { shortURL, longURL };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  let temp = generateRandomString(); // --> 'abcdef'
  urlDatabase[temp] = req.body.longURL
  // res.send("Ok");         // Respond with 'Ok' (we will replace this)
  res.redirect('/urls') // -> GET /urls
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});