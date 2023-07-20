import { db } from "../db.js";

export const addPost = (req, res) => {
  res.json("post from controller");
};

export const getPost = (req, res) => {
  res.json("post from controller");
};
export const getAllPost = (req, res) => {
  const query = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * from posts";

  db.query(query, [req.query.cat], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const deletePost = (req, res) => {
  res.json("post from controller");
};
export const updatePost = (req, res) => {
  res.json("post from controller");
};
