const { Router} = require("express");
const router = Router(); 

const miscControllers = require("../controllers/misc.controllers")
const authController = require("../controllers/auth.controller")
const shelterController = require("../controllers/shelter.controller")
const {isAuthenticated }= require("../middleware/auth.middleware")


router.get("/", miscControllers.test)

// AUTH CONTROLLERS
router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/me",isAuthenticated, authController.getUser)

// USER CONTROLLERS


//SHELTER CONTROLLERS
router.post("/shelter/create", shelterController.create)


module.exports = router; 