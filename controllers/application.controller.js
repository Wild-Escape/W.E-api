const ApplicationForm = require("../models/ApplicationForm.model");

module.exports.sendApplication = async (req, res, next) => {

    const application = {
        ...req.body,
        user: req.currentUserId,
    }

    console.log("chechdata before save-->", application);
  try {
    const applicationForm = await ApplicationForm.create(application);
    res.status(200).json({ applicationForm });
  } catch (error) {
    next(error);
  }
}