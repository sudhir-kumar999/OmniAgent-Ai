import express from "express"
import { dashboard, login, register } from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"



const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/dashboard",protect,dashboard)
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});


export default router