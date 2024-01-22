const conn = require("../db/conn");

const addUser = async (req, res) => {
  const values = [
    req.body.username,
    req.body.password,
    req.body.name,
    req.body.userEmail,
    req.body.mobile,
    req.body.instituteId,
    req.body.departmentId,
  ];

  const q =
    "INSERT INTO c_user (username, password, name, email, mobile, institute_id, department_id) VALUES ( ? )";
  conn.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(`User Added Successfully !`);
    }
  });
};



const getUser = async (req, res) => {
  const q = "SELECT * FROM c_user ORDER BY id DESC";
  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const trashUser = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM c_user WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the Make." });
    } else {
      res.send(data);
      console.log("User Deleted Successfully");
    }
  });
};

const getPerUser = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM c_user WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const editUser = async (req, res) => {
  const {
    username,
    password,
    name,
    userEmail,
    mobile,
    instituteId,
    departmentId,
  } = req.body;
  const id = req.params.id;

  const q =
    "UPDATE c_user SET username = ?, password = ?, name = ?, email = ?, mobile = ?, institute_id = ?, department_id = ? WHERE id = ?";

  conn.query(
    q,
    [
      username,
      password,
      name,
      userEmail,
      mobile,
      instituteId,
      departmentId,
      id,
    ],
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("User Updated Successfully");
      }
    }
  );
};

const checkUserLogin = async (req, res) => {
  const { username } = req.body;

  const query = `SELECT COUNT(*) AS count FROM c_user WHERE username = ?`;
  conn.query(query, [username], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const count = results[0].count;
      const exists = count > 0;
      if (exists) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    }
  });
};

// server code
const checkUserEditLogin = async (req, res) => {
  const { username } = req.body;
  const id = req.params.id;

  const query = `SELECT COUNT(*) AS count FROM c_user WHERE username = ? AND id != ?`;

  conn.query(query, [username, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const count = results[0].count;
      const exists = count > 0;
      if (exists) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    }
  });
};

// Handler function for updating the user status
const updateStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  const q = "UPDATE c_user SET status = ? WHERE id = ?";
  conn.query(q, [status, userId], (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ success: true });
    }
  });
};

module.exports = {
  addUser,
  getUser,
  trashUser,
  getPerUser,
  editUser,
  checkUserLogin,
  checkUserEditLogin,
  updateStatus,
};
