import express from "express";
import {
  addPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getAllPost);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
