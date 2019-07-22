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
import {
    NotFoundException,
    ValidationException,
}                                 from "../app/exceptions"
import {
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
    HTTP_UNPROCESSABLE_ENTITY,
}                                 from "../constants/HTTPCode"
import { ModelNotFoundException } from "../libraries/Repository/exceptions"
import {
    AppConfig,
    DBConfig,
}                                 from "./../config"
import routes                     from "./../routes"

class App {
    constructor() {
        this.app = express()
        this.appDebug = AppConfig.debug === "true"

        this.setup()
        this.database()
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
                    message: this.appDebug ? error.message : "Not found!",
                })

                return
            }

            if (error instanceof ValidationException) {
                res.status(error.status || HTTP_UNPROCESSABLE_ENTITY).json({
                    errors: error.errors,
                    message: this.appDebug ? error.message : "Validation errors",
                })

                return
            }

            console.error(error)
            res.status(error.status || HTTP_INTERNAL_SERVER_ERROR).json({
                message: this.appDebug ? error.message : "Server error.",
            })
        })
    }
}

export default new App().app
