import jwt            from "jsonwebtoken"
import { AuthConfig } from "../../../../config"

export default base => class extends base {
    generateToken() {
        const today = new Date()
        const expirationDate = new Date(today)
        expirationDate.setTime(today.getTime() + AuthConfig.tokenExpiration * 1000)

        return jwt.sign({
            id: this.id,
            email: this.email,
            exp: parseInt((expirationDate.getTime() / 1000).toString(), 10),
        }, AuthConfig.jwtSecret)
    }

    async authenticate(username, password, done) {
        const user = await AuthConfig.authModel.query().findOne({ "username": username })

        if (!user || !user.matchPassword(password)) {
            return done(null, null, "Invalid login.")
        }

        return done(null, user, "Login success.")
    }

    async authenticateJwt(jwtPayload, done) {
        const user = await AuthConfig.authModel.query().findById(jwtPayload.id)

        if (!user) {
            return done("UnAuthenticated")
        }

        return done(null, user)
    }
}
