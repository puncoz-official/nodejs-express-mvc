import {
    json,
    urlencoded,
}                                 from "body-parser"
import compression                from "compression"
import cors                       from "cors"
import express                    from "express"
import helmet                     from "helmet"
import Knex                       from "knex"
import methodOverride             from "method-override"
import logger                     from "morgan"
import { Model }                  from "objection"
import passport                   from "passport"
import {
    ExtractJwt,
    Strategy as JWTStrategy,
}                                 from "passport-jwt"
import LocalStrategy              from "passport-local"
import {
    NotFoundException,
    UnAuthorizedException,
    ValidationException,
}                                 from "../app/exceptions"
import {
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
    HTTP_UNAUTHORIZED,
    HTTP_UNPROCESSABLE_ENTITY,
}                                 from "../constants/HTTPCode"
import { ModelNotFoundException } from "../libraries/Repository/exceptions"
import {
    AppConfig,
    AuthConfig,
    DBConfig,
}                                 from "./../config"
import routes                     from "./../routes"

class App {
    constructor() {
        this.app = express()
        this.appDebug = AppConfig.debug === "true"

        this.setup()
        this.database()
        this.authentication()
        this.routers()
    }

    setup() {
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))
        this.app.use(logger("dev"))
        this.app.use(cors())
        this.app.use(methodOverride("_method"))
    }

    database() {
        const knex = Knex(DBConfig)
        Model.knex(knex)
    }

    routers() {
        routes(this.app)

        this.app.use((req, res, next) => {
            throw new NotFoundException()
        })

        this.app.use((error, req, res, next) => {
            if (error instanceof NotFoundException || error instanceof ModelNotFoundException) {
                res.status(error.status || HTTP_NOT_FOUND).json({
                    message: error.message,
                })

                return
            }

            if (error instanceof ValidationException) {
                res.status(error.status || HTTP_UNPROCESSABLE_ENTITY).json({
                    errors: error.errors,
                    message: error.message,
                })

                return
            }

            if (error instanceof UnAuthorizedException) {
                res.status(error.status || HTTP_UNAUTHORIZED).json({
                    message: error.message,
                })

                return
            }

            console.error(error)
            res.status(error.status || HTTP_INTERNAL_SERVER_ERROR).json({
                message: this.appDebug ? error.message : "Server error.",
                errors: this.appDebug ? error : null,
            })
        })
    }

    authentication() {
        this.app.use(passport.initialize({}))

        const authModel = new AuthConfig.authModel()

        passport.use("local", new LocalStrategy({
            usernameField: AuthConfig.request.usernameField,
            passwordField: AuthConfig.request.passwordField,
        }, authModel.authenticate))

        passport.use("jwt", new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: AuthConfig.jwtSecret,
        }, authModel.authenticateJwt))
    }
}

export default new App().app
