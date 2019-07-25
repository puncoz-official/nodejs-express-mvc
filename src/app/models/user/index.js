import { USERS_TABLE } from "../../../constants/DBTables"
import BaseModel       from "../../../libraries/Repository/model"
import Authenticatable from "../../../libraries/Repository/model/plugins/Authenticatable"
import Password        from "../../../libraries/Repository/model/plugins/Password"
import UserAccessors   from "./Accessors"

@UserAccessors
@Password
@Authenticatable
export default class User extends BaseModel {
    static get tableName() {
        return USERS_TABLE
    }

    static get idColumn() {
        return "id"
    }
}
