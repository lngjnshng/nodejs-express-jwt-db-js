const express = require("express");
const boom = require("boom");
const auth = require("./auth/middleware");
const AuthController = require("./controller/auth-controller");
const UserController = require("./controller/user-controller");

// Initialize a router instance
const router = express.Router();

// Define the root URL
router.get("/", (request, response) => {
    response.end("Welcome to nodejs backup server");
});

router.post("/auth/login", AuthController.login);
router.post("/register", AuthController.register);

router.post("/api/user", auth, UserController.create);
router.get("/api/user/paginate", auth, UserController.paginate);
router.get("/api/user/:id", auth, UserController.get);


// Define a NOT_FOUND error handler
router.use((request, response, next) => {
    next(boom.notFound("URL not found"));
});

// A error middleware handler
router.use((error, request, response, next) => {
    const message = (error && error.message) || 'System error';
    const statusCode = (error && error.output && error.output.statusCode) || 500;
    const errorMsg = (error && error.output && error.output.payload && error.output.payload.error) || (error && error.message);
    response.status(statusCode).json({msg: message, error: statusCode, errorMsg});
});

module.exports = router;