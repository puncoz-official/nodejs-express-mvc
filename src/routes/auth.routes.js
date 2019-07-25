import { FormValidations } from "../app/middlewares"
import AuthValidations     from "../app/validations/auth.validations"
import Router              from "../libraries/controller/router"

Router.post("/login", [
    AuthValidations.login, FormValidations,
], "AuthController@login")

export default Router.export()
