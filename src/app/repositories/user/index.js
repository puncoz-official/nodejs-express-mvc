import { UserModel }  from "../../models"
import BaseRepository from "./../../../libraries/Repository"

class UserRepository extends BaseRepository {
    constructor(props) {
        super(props)
    }

    model() {
        return UserModel
    }
}

export default new UserRepository()
