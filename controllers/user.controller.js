const User = require("../models/User.model");

module.exports.userDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports.editUser = async (req, res, next) => {
    const data = {
        ...req.body,
        profileImage: req.file.path
    }
    console.log("checking data in backend-->>", data)
    try{
        const updateUser =  await User.findByIdAndUpdate(req.params.id, data, {new:true});
        res.status(200).json({updateUser})
        
    } catch (error) {
        next(error);
      }
};
