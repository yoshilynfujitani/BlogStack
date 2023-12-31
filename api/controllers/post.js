import { db } from "../db.js";
import jwt from "jsonwebtoken";

// export const getPostsCategory = (req, res) => {
//   const q = "SELECT * FROM posts WHERE category = ?";

//   db.query(q, [req.params.category], (err, data) => {
//     if (err) return res.status(500).send(err);

//     return res.status(200).json(data);
//   });
// };

export const getPosts = (req, res) => {
  const page = Number(req.query.page) || 1; // Get the requested page from the query parameters
  const itemsPerPage = 5; // Set the number of items to display per page
  // Calculate the offset based on the requested page and items per page
  const offset = (page - 1) * itemsPerPage;

  const category = req.query.category || null; // Get the category from the query parameters

  // Construct a count query to get the total number of rows
  const countQuery = category
    ? "SELECT COUNT(*) AS totalCount FROM posts WHERE category=?"
    : "SELECT COUNT(*) AS totalCount FROM posts";

  const queryParams = category ? [category] : [];

  db.query(countQuery, queryParams, (countErr, countData) => {
    if (countErr) {
      console.error("Error executing count query:", countErr);
      return res.status(500).json({ error: "Internal server error" });
    }

    const totalCount = countData[0].totalCount; // Extract the total row count

    // Construct the main query to retrieve the paginated data
    const mainQuery = category
      ? `SELECT * FROM posts WHERE category=? LIMIT ${itemsPerPage} OFFSET ${offset}`
      : `SELECT * FROM posts LIMIT ${itemsPerPage} OFFSET ${offset}`;

    db.query(mainQuery, queryParams, (mainErr, data) => {
      if (mainErr) {
        console.error("Error executing main query:", mainErr);
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.status(200).json({ data, totalCount }); // Return both data and totalCount
    });
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `category`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.category,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.category,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
