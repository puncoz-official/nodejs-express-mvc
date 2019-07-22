import AuthRoutes from "./auth.routes"
import UserRoutes from "./users.routes"

export default app => {
    app.use("/", AuthRoutes)
    app.use("/users", UserRoutes)
}
