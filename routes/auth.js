/** @format */

const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  auth,
  authReq,
} = require("../controllers/auth");

// validators

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/auth", auth, authReq);

// google login

module.exports = router;
