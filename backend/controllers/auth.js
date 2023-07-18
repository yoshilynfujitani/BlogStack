import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  // Check existing user

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user already exists");

    //Hash the password when creating new user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const query = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(query, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json(200).json("User succesfully created!");
    });
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
