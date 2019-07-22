import { createServer } from "http"
import app              from "./bootstrap/app"
import { AppConfig }    from "./config"
import {
    normalizePort,
    onServerError,
    onServerListening,
}                       from "./helpers/core.helper"

(async () => {
    const port = normalizePort(AppConfig.port)
    app.set("port", port)

    const server = createServer(app)
    server.listen(port)
    server.on("listening", onServerListening.bind(this, server))
    server.on("error", onServerError)

    process.on("unhandledRejection", (reason, p) => {
        console.error("Unhandled Rejection at:", p, "reason:", reason)
    })
})()
