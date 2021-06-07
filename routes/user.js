/** @format */

const express = require("express");
const router = express.Router();
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");
const {
  read,
  update,
  userById,
  approveforContentWriter,
  deleteUser,
} = require("../controllers/user");

router.get("/users", requireSignin, adminMiddleware, read);
router.put(
  "/user-role/:userId",
  requireSignin,
  adminMiddleware,
  approveforContentWriter
);
router.delete("/user/:userId", requireSignin, adminMiddleware, deleteUser);

router.param("userId", userById);
module.exports = router;
