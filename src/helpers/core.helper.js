import { config as dotEnvConfig } from "dotenv"
import path                       from "path"

export const root_path = (directory = undefined) => path.resolve(__dirname, "../../..", directory || "")
export const client_path = (directory) => path.resolve(root_path(), "client", directory || "")
export const server_path = (directory) => path.resolve(root_path(), "server", directory || "")
export const src_path = (directory) => path.resolve(server_path(), "src", directory || "")
export const app_path = (directory) => path.resolve(server_path(), "src/app", directory || "")
dotEnvConfig({ path: root_path(".env") })

export const env = (key, defaultValue) => {
    const value = process.env[key] || defaultValue
    if (typeof value === "undefined") {
        throw new Error(`Environment variable ${key} not set.`)
    }

    return value
}

export const normalizePort = (port) => {
    port = parseInt(port, 10)

    if (isNaN(port)) {
        throw new Error("Invalid port.")
    }

    if (port <= 0) {
        throw new Error("Invalid port.")
    }

    return port
}

export const onServerListening = (server) => {
    const addr = server.address()
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`
    console.info(`Server listening on ${bind}`)
}

export const onServerError = (error) => {
    if (error.syscall !== "listen") {
        throw error
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}

export function * range(begin, end, interval = 1) {
    for (let i = begin; i < end; i += interval) {
        yield i
    }
}

export const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export const isArray = data => Array.isArray(data)
export const isObject = data => typeof data === "object" && !isArray(data)
export const isBycryptedHash = (string) => /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/.test(string)
