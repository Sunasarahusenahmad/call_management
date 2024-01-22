const conn = require("../db/conn");

// user login
const userLogin = async (req, res) => {
  const { username, password } = req.body;

  // Check if the provided username and password match the records in the database
  const query = `SELECT * FROM c_user WHERE username = '${username}' AND password = '${password}'`;
  conn.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const user = results[0];

    if (user.status !== 1) {
      res
        .status(401)
        .json({ message: "User can Login when Admin can Allow Login" });
      return;
    }

    const { id: userId, ...userData } = user;
    res
      .status(200)
      .json({ message: "User login successful", userId, user: userData });
  });
};

// admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the provided email and password match the records in the database
  const query = `SELECT * FROM c_admin WHERE email = '${email}' AND password = '${password}'`;
  conn.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const admin = results[0];

    if (results.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    } else {
      res.status(200).json({ message: "Admin login successful", admin });
    }
  });
};

module.exports = { userLogin, adminLogin };
