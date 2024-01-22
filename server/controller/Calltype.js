const conn = require("../db/conn");

const addCalltype = async (req, res) => {
  const values = [req.body.callType];

  const q = "INSERT INTO c_calltype (call_type) VALUES ( ? )";
  conn.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(`Call Type Added Successfully !`);
    }
  });
};

const getCalltype = async (req, res) => {
  const q = "SELECT * FROM c_calltype order by id desc";
  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const trashCalltype = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM c_calltype WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the Call type." });
    } else {
      res.send(data);
      console.log("Call Type Deleted Successfully");
    }
  });
};

const getPerCalltype = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM c_calltype WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const editCalltype = async (req, res) => {
  const { callType } = req.body;
  const id = req.params.id;

  const q = "UPDATE c_calltype SET call_type = ? WHERE id = ?";

  conn.query(q, [callType, id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log("Calltype Updated Successfully");
    }
  });
};

module.exports = {
  addCalltype,
  getCalltype,
  trashCalltype,
  getPerCalltype,
  editCalltype,
};
