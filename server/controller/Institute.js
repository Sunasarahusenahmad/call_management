const conn = require("../db/conn");

const addInstitute = async (req, res) => {
  const values = [
    req.body.instituteName,
    req.body.instituteLocation,
    req.body.instituteEmail,
  ];

  const q =
    "INSERT INTO c_institute (institute_name, institute_location, institute_email) VALUES ( ? )";
  conn.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(`Institute Added Successfully !`);
    }
  });
};

const getInstitute = async (req, res) => {
  const q = "SELECT * FROM c_institute order by id desc";
  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const trashInstitute = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM c_institute WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the institute." });
    } else {
      res.send(data);
      console.log("Institute Deleted Successfully");
    }
  });
};

const getPerRecordInstitute = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM c_institute WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const editInstitute = async (req, res) => {
  const { instituteName, instituteLocation, instituteEmail } = req.body;
  const id = req.params.id;

  const q =
    "UPDATE c_institute SET institute_name = ?, institute_location = ?, institute_email = ? WHERE id = ?";

  conn.query(
    q,
    [instituteName, instituteLocation, instituteEmail, id],
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Institute Updated Successfully");
      }
    }
  );
};

module.exports = {
  addInstitute,
  getInstitute,
  trashInstitute,
  getPerRecordInstitute,
  editInstitute,
};
