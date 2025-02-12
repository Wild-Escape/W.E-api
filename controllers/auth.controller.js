const createError = require("http-errors");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }


  // User.create(req.body)
  // .then((user) => {
  //     res.status(200).json({user});
  // })
  // .catch(next);
};

module.exports.login = (req, res, next) => {
  const {email, password} = req.body; 

  const loginError = createError(401, "Email or password incorrect");
   User
    .findOne({email})
    .then((user)=>{
      if(!user){
        return next(loginError)
      }

      return user
        .checkPassword(password)
        .then((match) => {
         if (!match){
            return next(loginError)
          }

          const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET || "change",
            {expiresIn : "1d"}
          )

          res.json({accesToken : token})
        })
    })
    .catch(next)
}

module.exports.getUser = (req, res, next) => {
  
  User.findById(req.currentUserId)
  .then((user) => {
    res.status(200).json({user});
  })
  .catch(next)
}