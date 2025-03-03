const { Router } = require("express");
const router = Router();

const miscControllers = require("../controllers/misc.controllers");
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

const experienceController = require("../controllers/experience.controller");
const reservationController = require("../controllers/reservation.controller");
const favoriteController = require("../controllers/favorite.controller")
const userController = require("../controllers/user.controller")
const stripeController = require("../controllers/stripe.controller")
const paymentController = require("../controllers/payment.controller")
const applicationControllers = require("../controllers/application.controller")
const upload = require("../config/cloudinary.config");

router.get("/", miscControllers.test);

// AUTH CONTROLLERS
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", isAuthenticated, authController.getUser);

// USER CONTROLLERS
router.get("/user/:id", isAuthenticated, userController.userDetails )
router.patch("/user/:id/update", isAuthenticated, upload.single("profileImage"), userController.editUser)
// PARTNER CONTROLLERS
router.get("/partner/:id", isAuthenticated, userController.partnerDetails )
router.patch("/partner/:id/update", isAuthenticated, upload.single("profileImage"), userController.editPartner)

//EXPERIENCE CONTROLLERS
// 1. Create a experience
router.post(
  "/experience/create",
  isAuthenticated,
  upload.array("gallery", 5),
  experienceController.create
);
// 2. Get all experiences (for users to view available trips)
router.get("/experiences",  isAuthenticated, experienceController.getAllExperiences);
// 3. Get details of a specific trip
router.get("/experience/:id",isAuthenticated, experienceController.getExperienceDetails);
//4. Get the experiences created by a partner
router.get("/partner/all/experiences",isAuthenticated, experienceController.getPartnerExperiences )
router.get("/partner/experience/:id/details", isAuthenticated, experienceController.getPartnerExperienceDetails)
//5. Update the experience
router.patch("/experience/:id/update", isAuthenticated,
  upload.array("gallery", 10),
  experienceController.update);


// RESERVATION CONTROLLER
//1. Book a experience
router.post("/experience/:id/book", isAuthenticated, reservationController.bookTrip);
// 2. Get details of a specific experience I booked (This is missing)
//router.get("/experience/:id", reservationController.getReservationDetails);
// 3. Get all booked experiences by a user
//router.get("/user/experience", isAuthenticated, reservationController.getUserExperiences);

// FAVORITES CONTROLLERS
router.post("/experiences/:id/favorite", isAuthenticated, favoriteController.addToFavorite )
router.get("/favorites", isAuthenticated, favoriteController.getFavorites)

// STRIPE CONTROLLERS
router.post('/create-payment-intent', isAuthenticated, stripeController.createPaymentIntent);
router.get('/stripe/publishable-key', isAuthenticated, stripeController.getPublishableKey)

// PAYMENT CONTROLLERS
router.post('/create-payment', isAuthenticated, paymentController.createPayment)

// BOOKED EXPERIENCES CONTROLERS
router.get("/booked/experiences", isAuthenticated, paymentController.getBookedExperiences)
router.get("/pending/experiences", isAuthenticated, paymentController.getPendingExperiences)
router.post("/confirm/experience/:id",isAuthenticated, paymentController.confirmExperience)
router.post("/decline/experience/:id",isAuthenticated, paymentController.declineExperience)

// APPLICATION CONTROLLERS
router.post("/application/create", isAuthenticated, applicationControllers.sendApplication)




module.exports = router;
