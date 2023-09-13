import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  getPostsCategory,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/filter/", getPostsCategory);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
