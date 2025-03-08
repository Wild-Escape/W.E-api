const { Router } = require("express");
const router = Router();

const miscControllers = require("../controllers/misc.controllers");
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

const experienceController = require("../controllers/experience.controller");
const reservationController = require("../controllers/reservation.controller");
const favoriteController = require("../controllers/favorite.controller");
const userController = require("../controllers/user.controller");
const stripeController = require("../controllers/stripe.controller");
const paymentController = require("../controllers/payment.controller");
const applicationControllers = require("../controllers/application.controller");
const chatController = require("../controllers/chat.controller");
const messageController = require("../controllers/message.controller");

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
router.post(
  "/experience/create",
  isAuthenticated,
  upload.array("gallery", 5),
  experienceController.create
);
router.get("/experiences",  isAuthenticated, experienceController.getAllExperiences);
router.get("/experience/:id",isAuthenticated, experienceController.getExperienceDetails);
router.get("/partner/all/experiences",isAuthenticated, experienceController.getPartnerExperiences )
router.get("/partner/experience/:id/details", isAuthenticated, experienceController.getPartnerExperienceDetails)
router.patch("/experience/:id/update", isAuthenticated,
  upload.array("gallery", 10),
  experienceController.update);
router.delete("/experience/:id/delete", isAuthenticated, experienceController.delete);

// RESERVATION CONTROLLER
router.post("/experience/:id/book", isAuthenticated, reservationController.bookTrip);

// FAVORITES CONTROLLERS
router.post("/experiences/:id/favorite", isAuthenticated, favoriteController.addToFavorite )
router.get("/favorites", isAuthenticated, favoriteController.getFavorites)

// STRIPE CONTROLLERS
router.post('/create-payment-intent', isAuthenticated, stripeController.createPaymentIntent);
router.get('/stripe/publishable-key', isAuthenticated, stripeController.getPublishableKey)

// PAYMENT && BOOKED EXPERIENCES CONTROLLERS  
router.post('/create-payment', isAuthenticated, paymentController.createPayment)
router.get("/booked/experiences", isAuthenticated, paymentController.getBookedExperiences)
router.get("/pending/experiences", isAuthenticated, paymentController.getPendingExperiences)
router.post("/confirm/experience/:id",isAuthenticated, paymentController.confirmExperience)
router.post("/decline/experience/:id",isAuthenticated, paymentController.declineExperience)
router.get("/application/:paymentId/review", isAuthenticated, paymentController.reviewApplication)
router.get('/confirmed/experiences', isAuthenticated, paymentController.getConfirmedExperiences )

// APPLICATION CONTROLLERS
router.post("/application/create", isAuthenticated, applicationControllers.sendApplication)

// CHAT CONTROLLER
router.get("/chats", isAuthenticated, chatController.list);
router.get("/chats/:chatId", isAuthenticated, chatController.detail);
router.post("/chats", isAuthenticated, chatController.create);
router.delete("/chats/:chatId", isAuthenticated, chatController.delete);

// MESSAGE CONTROLLER
router.post(
  "/chats/messages/create",
  isAuthenticated,
  messageController.create
);


module.exports = router;
