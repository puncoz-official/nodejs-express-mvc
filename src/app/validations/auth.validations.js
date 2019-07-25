import { check } from "express-validator"

export default {
    login: [
        check("username").
            isString().withMessage("Username is required."),

        check("password").
            isString().withMessage("Password is required."),
    ],
}
