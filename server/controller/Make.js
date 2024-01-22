const conn = require("../db/conn");

const addMake = async (req, res) => {
  const values = [req.body.makeName];

  const q = "INSERT INTO c_make (make_name) VALUES ( ? )";
  conn.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(`Make Added Successfully !`);
    }
  });
};

const getMake = async (req, res) => {
  const q = "SELECT * FROM c_make order by id desc";
  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const trashMake = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM c_make WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the Make." });
    } else {
      res.send(data);
      console.log("Make Deleted Successfully");
    }
  });
};

const getPerMake = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM c_make WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const editMake = async (req, res) => {
  const { makeName } = req.body;
  const id = req.params.id;

  const q = "UPDATE c_make SET make_name = ? WHERE id = ?";

  conn.query(q, [makeName, id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log("Make Updated Successfully");
    }
  });
};

module.exports = { addMake, getMake, trashMake, getPerMake, editMake };
