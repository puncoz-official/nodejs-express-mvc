import { USERS_TABLE } from "../../../constants/DBTables"
import BaseModel       from "../../../libraries/Repository/model"
import UserAccessors   from "./Accessors"

@UserAccessors
export default class User extends BaseModel {
    static get tableName() {
        return USERS_TABLE
    }

    static get idColumn() {
        return 'id';
    }


}
