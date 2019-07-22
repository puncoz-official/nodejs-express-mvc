import { check }          from "express-validator"
import { UserRepository } from "../repositories"

export default {
    create: [
        check("email").
            isString().withMessage("Email is required.").
            normalizeEmail().isEmail().withMessage("Invalid email format").
            custom(async email => {
                try {
                    await UserRepository.findByColumn("email", email)
                } catch (e) {
                    return true
                }

                throw new Error("Email already exists.")
            }),

        check("username").
            isString().withMessage("Username is required").
            custom(async username => {
                try {
                    await UserRepository.findByColumn("username", username)
                } catch (e) {
                    return true
                }

                throw new Error("Username already exists.")
            }),

        check("password").
            isString().withMessage("Password is required").
            isLength({ min: 6 }).withMessage("Password should be greater than 6 characters long."),
    ],

    update: [
        check("email").
            isString().withMessage("Email is required.").
            normalizeEmail().isEmail().withMessage("Invalid email format").
            custom(async (email, { req }) => {
                const userId = req.params.userId

                try {
                    await UserRepository.findByColumn("email", email).where("id", "<>", userId)
                } catch (e) {
                    return true
                }

                throw new Error("Email already exists.")
            }),

        check("username").
            isString().withMessage("Username is required").
            custom(async (username, { req }) => {
                const userId = req.params.userId

                try {
                    await UserRepository.findByColumn("username", username).where("id", "<>", userId)
                } catch (e) {
                    return true
                }

                throw new Error("Username already exists.")
            }),
    ],
}
