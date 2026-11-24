import express from "express";
import passport from "passport";
import session from "express-session";
import "./middleware/auth.middleware.js"

const app = express();


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  return res.send("Welcome to the website");
});


app.get(
  "/login/google",
  passport.authenticate("google")
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    //successRedirect: 
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.send(`Welcome ${req.user.name}`);
  }
);

export default app;
