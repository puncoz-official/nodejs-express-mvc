import { USERS_TABLE } from "./../../constants/DBTables"

export const up = knex => knex.schema.createTable(USERS_TABLE, table => {
    table.increments()
    table.string("email").unique().notNullable()
    table.string("username").unique().notNullable()
    table.string("password").notNullable()
    table.jsonb("full_name").nullable()
    table.jsonb("metadata").nullable()
    table.string("profile_picture").nullable()
    table.string("role")

    table.integer("created_by").unsigned().nullable().index().references("id").inTable(USERS_TABLE)
    table.integer("updated_by").unsigned().nullable().index().references("id").inTable(USERS_TABLE)
    table.integer("deleted_by").unsigned().nullable().index().references("id").inTable(USERS_TABLE)

    table.timestamps(true, true)
    table.timestamp("deleted_at")
})

export const down = knex => knex.schema.dropTable(USERS_TABLE)
