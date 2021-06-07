/** @format */

const express = require("express");
const router = express.Router();
const {
  create,
  list,
  ApproveBloglist,
  read,
  remove,
  update,
  blogbyUsers,
  approveBlogs,
} = require("../controllers/blog");
const { userById } = require("../controllers/user");
const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
  canUpdateDeletedBlog,
} = require("../controllers/auth");

router.post("/blog", requireSignin, adminMiddleware, create);

router.get("/allblogs", requireSignin, adminMiddleware, list);
router.get("/blogs", ApproveBloglist);

router.put("/approveblog/:slug", requireSignin, adminMiddleware, approveBlogs);

router.get("/blog/:slug", read);
router.delete("/blog/:slug", requireSignin, adminMiddleware, remove);
router.put("/blog/:slug", requireSignin, adminMiddleware, update);

// auth user blog crud
router.post("/user/blog", requireSignin, authMiddleware, create);
router.get("/user/blogs/:userId", requireSignin, authMiddleware, blogbyUsers);

router.delete(
  "/user/blog",
  requireSignin,
  authMiddleware,
  canUpdateDeletedBlog,
  remove
);
router.put(
  "/user/blog/:slug",
  requireSignin,
  authMiddleware,
  canUpdateDeletedBlog,
  update
);
router.param("userId", userById);

module.exports = router;
