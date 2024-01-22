const conn = require("../db/conn");

const addSerialno = async (req, res) => {
  const values = [req.body.serialno, req.body.modelId, req.body.makeId];

  const q =
    "INSERT INTO c_serialno (serial_no, model_id, make_id) VALUES ( ? )";
  conn.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(`Serial No Added Successfully !`);
    }
  });
};

const getSerialno = async (req, res) => {
  const q = "SELECT * FROM c_serialno order by id desc";
  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const trashSerialno = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM c_serialno WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the serialno." });
    } else {
      res.send(data);
      console.log("Serial No Deleted Successfully");
    }
  });
};

const getPerSerialno = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM c_serialno WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const selectedModels = async (req, res) => {
  const { makeId } = req.params;
  console.log(makeId);

  // Fetch selected departments from the database based on the institute ID
  conn.query(
    "SELECT * FROM c_model WHERE make_id = ?",
    [makeId],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.json(results);
      }
    }
  );
};

const checkSerialno = async (req, res) => {
  const { serialno, id } = req.body;

  const query = `SELECT COUNT(*) AS count FROM c_serialno WHERE serial_no = ?`;
  conn.query(query, [serialno, id], (error, results) => {
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

const checkEditSerialno = async (req, res) => {
  const { serialno, id } = req.body;

  const query = `SELECT COUNT(*) AS count FROM c_serialno WHERE serial_no = ? AND id != ?`;
  conn.query(query, [serialno, id], (error, results) => {
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

const editSerialno = async (req, res) => {
  const { serialno, modelId, makeId } = req.body;
  const id = req.params.id;

  const q =
    "UPDATE c_serialno SET serial_no = ?, model_id = ?, make_id = ? WHERE id = ?";

  conn.query(q, [serialno, modelId, makeId, id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log("Serialno Updated Successfully");
    }
  });
};

module.exports = {
  addSerialno,
  getSerialno,
  trashSerialno,
  getPerSerialno,
  checkSerialno,
  selectedModels,
  editSerialno,
  checkEditSerialno,
};
