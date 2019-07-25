import passport                  from "passport"
import { UnAuthorizedException } from "../exceptions"

class Auth {
    handle(req, res, next) {
        passport.authenticate("jwt", {
            session: false,
        }, (err, user, info) => {
            if (!user) {
                return next(new UnAuthorizedException(info.message))
            }

            req.user = user
            next()
        })(req, res, next)
    }
}

export default (new Auth()).handle
