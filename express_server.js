const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
}

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

/// Function to lookup for existing email

function lookupEmail(email, users) {
  for (let key in users) {
    if (users[key].email === email) {
      return users[key];
    }
  }
  return false;
}

app.get("/", (req, res) => {
  res.send(" Welcome to TinyApp Project!");
});

app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  const userID = req.cookies["user_id"];
  const user = users[userID]
  const templateVars = { urls: urlDatabase, user: user };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const userID = req.cookies["user_id"];
  const user = users[userID]
  let templateVars = { user: user }
  res.render("urls_new", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  const userID = req.cookies["user_id"];
  const user = users[userID]
  const templateVars = { shortURL, longURL, user: user};
  res.render("urls_show", templateVars);
});

// Create a Login page

app.get("/login", (req, res) => {
  const userID = req.cookies["user_id"];
  const user = users[userID]
  let templateVars = { user: user };
  res.render("urls_login", templateVars);
});

app.post("/urls", (req, res) => {
  let tempURL = generateRandomString(); 
  urlDatabase[tempURL] = req.body.longURL
  res.redirect('/urls') 
});

// Post - Update the URL

app.post("/urls/:id", (req, res) => {
  const shortURL = req.params.id; 
  const newLongURL = req.body.longURL;
  urlDatabase[shortURL] = newLongURL;
  res.redirect("/urls")
});

// Get Register

app.get("/register", (req,res) => {
  const userID = req.cookies["user_id"];
  const user = users[userID]
  let templateVars = {
    'urls' : urlDatabase,
    user: user,
  };
  res.render("urls_register", templateVars);
});

// POST - Create a Registration Handler

app.post("/register", (req,res) => {
  if (req.body.email === "" || req.body.password === "") {
    let templateVars = { status: 400, message: "Email or Password is Empty!!!"} 
    res.render("urls_error", templateVars);
  } else if (lookupEmail(req.body.email, users)) {
    let templateVars = { status: 400, message: "Email is already registered. Try another one!!!"}
    res.render("urls_error", templateVars);
  } else {
 
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
   users[id] = {
     id: id,
     email: email,
     password: password,
   };
   res.cookie('user_id', id);
   res.redirect("/urls");

  }
});


// Delete - handle the POST requests on the server

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect("/urls");
});

// POST - Handle a POST route

app.post("/login", (req, res) => {
  const email  = req.body.login;
  const password = req.body.password;
  if (email === 0 || password === 0) {
    let templateVars = { status: 403, message: "Email or Password is not valid, Please Register!!!", user: undefined } 
    return res.render("urls_error", templateVars);
  }
  const user = lookupEmail(email, users);
  if (!user || password !== user.password) {
    let templateVars = { status: 403, message: "User or Password is not match!!!" , user: undefined } 
    return res.render("urls_error", templateVars);
  }
  res.cookie('user_id', user.id);
  res.redirect("/urls");
});

// Post Logout
app.post("/logout", (req, res) => {
  res.clearCookie ('user_id');
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});