const conn = require("../db/conn");

const addModel = async (req, res) => {
  const values = [req.body.modelName, req.body.makeId];

  const q = "INSERT INTO c_model (model_name, make_id) VALUES ( ? )";
  conn.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(`Model Added Successfully !`);
    }
  });
};

const getModel = async (req, res) => {
  const q = "SELECT * FROM c_model order by id desc";
  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const trashModel = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM c_model WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the model." });
    } else {
      res.send(data);
      console.log("Model Deleted Successfully");
    }
  });
};

const getPerModel = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM c_model WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const editModel = async (req, res) => {
  const { modelName, makeId } = req.body;
  const id = req.params.id;

  const q = "UPDATE c_model SET model_name = ?, make_id = ? WHERE id = ?";

  conn.query(q, [modelName, makeId, id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log("Model Updated Successfully");
    }
  });
};

module.exports = { addModel, getModel, trashModel, getPerModel, editModel };
