import Bcrypt              from "bcrypt"
import { AuthConfig }      from "../../../../config"
import { isBycryptedHash } from "../../../../helpers/core.helper"

export default base => class extends base {
    async $beforeInsert(context) {
        await super.$beforeInsert(context)

        const password = this[AuthConfig.passwordField]
        this[AuthConfig.passwordField] = await this.generateHash(password)
    }

    async $beforeUpdate(queryOptions, context) {
        await super.$beforeUpdate(queryOptions, context)

        const password = this[AuthConfig.passwordField]
        if (!password) {
            return
        }

        this[AuthConfig.passwordField] = await this.generateHash(password)
    }

    generateHash(password) {
        if (!password) {
            return password
        }

        if (isBycryptedHash(password)) {
            return password
        }

        return Bcrypt.hash(password, AuthConfig.hashRounds)
    }

    matchPassword(password) {
        return Bcrypt.compare(password, this[AuthConfig.passwordField])
    }
}
