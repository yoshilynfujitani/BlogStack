import { db } from "../db.js";

export const addPost = (req, res) => {
  res.json("post from controller");
};

export const getPost = (req, res) => {
  const query = "SELECT `username`, `title`, `desc`, p.img, `category`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? "

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0])
  })
};
export const getAllPost = (req, res) => {
  console.log(req.query.cat)
  const query = req.query.cat
    ? "SELECT * FROM posts WHERE category=?"
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
