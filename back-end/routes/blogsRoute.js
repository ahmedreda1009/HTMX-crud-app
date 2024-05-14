const express = require("express");
const {
  getAllPosts,
  postNewPost,
  editPost,
  updatePost,
  deletePost,
} = require("../controllers/blogsController");

const router = express.Router();

router.route("/").get(getAllPosts).post(postNewPost);
router.route("/edit/:postId").get(editPost);
router.route("/update/:postId").post(updatePost);
router.route("/delete/:postId").delete(deletePost);

module.exports = router;
