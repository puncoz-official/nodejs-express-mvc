import { env } from "./../helpers/core.helper"

export default {
    name: env("APP_NAME", "NodeJs App"),
    port: env("APP_PORT", 3000),
    debug: env("APP_DEBUG", false),
}
