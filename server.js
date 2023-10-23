const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const session = require("express-session");
const { log } = require("console");
const PORT = process.env.PORT || 3000;


const ogemail = "a@a";
const ogpassword = "111";

let message;

var temp='' ;



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.set("view-engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("views"));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);



// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    console.log("Middleware");
    
  console.log(req.session.user);
  console.log('Middleware log session up')
  if (req.session.isAuthenticated) {
    next();
  } else {
    //Destroy session here after checking 'isAuthenticated' property
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      next("route");
    });
  }
};

app.get("/", isAuthenticated, (req, res) => {
  res.render("home.ejs");

  console.log("___________ get profile ____________ ");
});


app.get("/", (req, res) => {


    console.log("___________ get login ___________");

    message="";

    console.log(req.session);
    console.log("logedin");

  
  res.render("login.ejs",{message:message});
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("____________________ post login ___________________________");

  console.log(req.body);


  if (email === ogemail && password === ogpassword) {
    req.session.isAuthenticated = true;
     
    console.log("ok validated");

    console.log(req.session.user);

    res.redirect("/");
  } else if(email ===temp.email && password === temp.password  ){

    req.session.isAuthenticated = true;
     
    console.log("ok validated");

    console.log(req.session.user);

    res.redirect("/");

  } else {
    message = "Incorrect username or password";
    res.render("login.ejs" , {message: message });
  }

 
});



app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const tempId = Date.now();

  try {
    const newUser = {
      id: tempId.toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    req.session.user = newUser;

    console.log(req.session.user);

     temp = req.session.user;

    console.log("register log session up");
    res.redirect("/");
  } catch {
    res.redirect("/register");
  }
});

app.get("/logout", (req, res) => {
  req.session.isAuthenticated = false;
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
});
