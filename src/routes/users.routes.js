import { FormValidations } from "../app/middlewares"
import UsersValidations    from "./../app/validations/users.validations"
import Router              from "./../libraries/controller/router"

Router.get("/", "UsersController@index")
Router.get("/:userId", "UsersController@show")
Router.post("/", [UsersValidations.create, FormValidations], "UsersController@create")
Router.patch("/:userId", [UsersValidations.update, FormValidations], "UsersController@update")
Router.delete("/:userId", "UsersController@delete")

export default Router.export()
