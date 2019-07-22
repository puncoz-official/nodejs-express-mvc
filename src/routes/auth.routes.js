import { Router } from "express"

const router = Router()

router.get("/login", (req, res, next) => {
    res.json({ name: "login" })
})

export default router
