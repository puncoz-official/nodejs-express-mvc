import { UserModel } from "../app/models"
import { env }       from "../helpers/core.helper"

export default {
    passwordField: "password",

    hashRounds: 12,

    tokenExpiration: 60 * 60, // in seconds

    jwtSecret: env("JWT_SECRET"),

    request: {
        usernameField: "username",
        passwordField: "password",
    },

    authModel: UserModel,
}
