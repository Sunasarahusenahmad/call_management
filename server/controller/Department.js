const conn = require("../db/conn");

const addDepartment = async (req, res) => {
  const values = [
    req.body.departmentName,
    req.body.departmentEmail,
    req.body.departmentContact,
    req.body.instituteId,
  ];

  const q =
    "INSERT INTO c_department (department_name, department_email, department_contact, institute_id) VALUES ( ? )";
  conn.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(`Deparment Added Successfully !`);
    }
  });
};

const getDepartment = async (req, res) => {
  const q = "SELECT * FROM c_department order by id desc";
  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const trashDepartment = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM c_department WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the Department." });
    } else {
      res.send(data);
      console.log("Department Deleted Successfully");
    }
  });
};

const getPerDepartment = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM c_department WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

const editDepartment = async (req, res) => {
  const { departmentName, departmentEmail, departmentContact, instituteId } =
    req.body;
  const id = req.params.id;

  const q =
    "UPDATE c_department SET department_name = ?, department_email = ?, department_contact = ?, institute_id = ? WHERE id = ?";

  conn.query(
    q,
    [departmentName, departmentEmail, departmentContact, instituteId, id],
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Department Updated Successfully");
      }
    }
  );
};

module.exports = {
  addDepartment,
  getDepartment,
  trashDepartment,
  getPerDepartment,
  editDepartment,
};
