const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/users");

exports.getHome = async (req, res, next) => {
  if(!req.session.userId){
    
    res.render('welcome',{
      isLoggedIn: req.session.isLoggedIn,
      user:{name: "", email: "", role:""}
    })
  }
  const user = await User.findById(req.session.userId)
  if(user.role === 'user'){
    res.render('welcome',{
         isLoggedIn: req.session.isLoggedIn,
         user
       })
  }
  else{
    const allUsers = await User.find()
     res.render('welcome',{
         isLoggedIn: req.session.isLoggedIn,
         user,
         allUsers
       })
  } 
}

exports.getLogin = (req, res, next) => {
  res.render("login",{
    errors: [],
    oldInput: {email: ''}
  });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy(err=>{
    if(err){
      console.log(`Couldn't delete the session`)
      return res.redirect('/welcome')
    }
    res.redirect('/login')
  })
};

exports.getSignup = (req, res, next) => {
  res.render("signup", {
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", gender: "" },
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({email})
  if(!user){
    return res.render('login', {
        errors: ['User not found'],
        oldInput: {email}
    })
  }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
         return res.render('login', {
        errors: ['Incorrect email or password'],
        oldInput: {email}
    })
    }
    else{
        req.session.userId = user._id.toString()
        req.session.isLoggedIn = true
        res.redirect("/")
    }

};

exports.postSignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage(`Then length of the first name should atleast be 2`)
    .matches(/^[A-Za-z\s]+$/)
    .withMessage(`The first name can only contain letters`),

  check("lastName")
    .trim()
    .matches(/^[A-Za-z\s]*$/),

  check("email")
    .isEmail()
    .withMessage(`Please enter a valid email`)
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("The password should contain atleast 8 chracters")
    .matches(/[A-Za-z]/)
    .withMessage(`The password should contain alphabets`)
    .matches(/[0-9]/)
    .withMessage("The password should contain numbers")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(`Passwords do not match`);
      }
      return true;
    }),

  check("gender")
    .notEmpty()
    .withMessage("Please choose a gender")
    .isIn(["male", "female"])
    .withMessage("Invalid gender"),
 async (req, res, next) => {
    const { firstName, lastName, email, password, gender } = req.body;
    const errors = validationResult(req);
     const emailExists = await User.findOne({email})
      if(emailExists){
             return res.render("signup", {
            errors: ['Email already exists'],
            oldInput: { firstName, lastName, gender},
        })
        }
    if (!errors.isEmpty()) {
        return res.render("signup", {
            errors: errors.array().map((err) => err.msg),
            oldInput: { firstName, lastName, email, gender },
        });
    }
    bcrypt.hash(password, 10).then(hashedPassword =>{
        const user = new User({ firstName, lastName, email, password: hashedPassword, gender });
        return user.save()
    })
    .then(()=> res.redirect('/login'))
    .catch(err =>{
        console.log(`Error: Couldnt save the user`, err)
         return res.render("signup", {
            errors: [`Couldn't save the user.`],
            oldInput: { firstName, lastName, email, gender },
        });
    })
  },
];
