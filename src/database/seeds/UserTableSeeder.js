import { USERS_TABLE } from "../../constants/DBTables"
import { SUPER_ADMIN } from "../../constants/UserRoles"
import { random }      from "../../helpers/core.helper"
import factory         from "../../libraries/FakerFactories"
import "./../factories/UserFactory"

export const seed = async knex => {
    const superAdmin = await knex(USERS_TABLE).where("email", "admin@admin.com")

    if (superAdmin.length === 0) {
        factory("users", 1).create({
            email: "admin@admin.com",
            username: "admin",
            full_name: {
                first_name: "Administrator",
                last_name: "",
            },
            role: SUPER_ADMIN,
        })
    }

    await factory("users", random(15, 25)).create()
}
