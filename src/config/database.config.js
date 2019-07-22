import {
    env,
    src_path,
}                           from "../helpers/core.helper"
import { MIGRATIONS_TABLE } from "./../constants/DBTables"

export default {
    client: "postgresql",
    connection: {
        host: env("DB_HOST"),
        port: env("DB_PORT"),
        database: env("DB_NAME"),
        user: env("DB_USER"),
        password: env("DB_PASS"),
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: MIGRATIONS_TABLE,
        directory: src_path("database/migrations"),
    },
    seeds: {
        directory: src_path("database/seeds"),
    },
}
