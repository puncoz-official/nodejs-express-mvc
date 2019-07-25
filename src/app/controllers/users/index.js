import { matchedData }     from "express-validator"
import { PAGINATE_MD }     from "../../../constants/Pagination"
import Controller          from "../../../libraries/controller"
import { UserRepository }  from "../../repositories"
import { UserTransformer } from "../../transformers"

export default class UserController extends Controller {

    async index(req, res) {
        const users = await UserRepository.setTransformer(UserTransformer).paginate(PAGINATE_MD, req.query.page)

        return this.sendResponse(res, users)
    }

    async show(req, res, next) {
        try {
            const user = await UserRepository.setTransformer(UserTransformer).find(req.params.userId)

            return this.sendResponse(res, user)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res) {
        const user = await UserRepository.setTransformer(UserTransformer).create(matchedData(req))

        this.sendResponse(res, user)
    }

    async update(req, res, next) {
        try {
            const user = await UserRepository.setTransformer(UserTransformer).update(matchedData(req), req.params.userId)

            return this.sendResponse(res, user)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            await UserRepository.delete(req.params.userId)

            return this.sendResponse(res, null, "User deleted successfully.")
        } catch (e) {
            next(e)
        }
    }

    async changePassword(req, res, next) {
        const { password } = matchedData(req)

        try {
            await UserRepository.update({ password }, req.params.userId)

            return this.sendResponse(res, null, "Password changed successfully.")
        } catch (e) {
            next(e)
        }
    }

}
