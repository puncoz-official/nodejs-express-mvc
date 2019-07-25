import passport                  from "passport"
import Controller                from "../../../libraries/controller"
import { UnAuthorizedException } from "../../exceptions"
import { UserTransformer }       from "../../transformers"

export default class AuthController extends Controller {

    async login(req, res, next) {
        passport.authenticate("local", {
            session: false,
        }, (err, user, message) => {
            if (!user) {
                return next(new UnAuthorizedException(message))
            }

            const token = user.generateToken()
            user = UserTransformer.transform(user)
            user.token = token

            this.sendResponse(res, user, message)
        })(req, res)
    }

}
