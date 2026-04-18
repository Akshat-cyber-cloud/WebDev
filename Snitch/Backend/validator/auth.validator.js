import { body, validationResult } from "express-validator";


function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


export const registerValidation = [
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address"),
    body("contact")
        .isLength({ min: 10, max: 15 })
        .withMessage("Contact number must be between 10 and 15 characters long"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("fullname")
        .isLength({ min: 2, max: 100 })
        .notEmpty()
        .withMessage("Full name must be between 2 and 100 characters long"),
    body("isSeller")
        .isBoolean()
        .withMessage("isSeller must be a boolean"),
    validateRequest
]