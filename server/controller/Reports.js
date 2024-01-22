const conn = require("../db/conn");

const getReport = async (req, res) => {
  const {
    // callId,
    selectedInstitute,
    selectedDepartment,
    selectedCalltype,
    selectedMake,
    selectedModel,
    selectedSerialNo,
  } = req.body;

  console.log(
    // callId,
    selectedInstitute,
    selectedDepartment,
    selectedCalltype,
    selectedMake,
    selectedModel,
    selectedSerialNo
  );

  let conditions = [];

  // if (callId) {
  //   conditions.push(`id = ${callId}`);
  // }
  if (selectedInstitute) {
    conditions.push(`institute_id = ${selectedInstitute}`);
  }
  if (selectedDepartment) {
    conditions.push(`department_id = ${selectedDepartment}`);
  }
  if (selectedCalltype) {
    conditions.push(`calltype_id = ${selectedCalltype}`);
  }
  if (selectedMake) {
    conditions.push(`make_id = ${selectedMake}`);
  }
  if (selectedModel) {
    conditions.push(`model_id = ${selectedModel}`);
  }
  if (selectedSerialNo) {
    conditions.push(`serialno_id = ${selectedSerialNo}`);
  }

  const conditionString = conditions.join(" && ");

  const q = `
    SELECT *, DATE_FORMAT(DATE(call_date), '%Y-%m-%d') AS call_date, DATE_FORMAT(DATE(delivered_date), '%Y-%m-%d') AS delivered_date
    FROM c_callmaster
    WHERE ${conditionString}`;

  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });
};

// ************ Selected Department of Institute in Call Details **********************

const getSelectedDepartment = async (req, res) => {
  const { selectedInstitute } = req.params;

  // Fetch selected departments from the database based on the institute ID
  conn.query(
    "SELECT * FROM c_department WHERE institute_id = ?",
    [selectedInstitute],
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

// ************ Selected Model of Make in Call Details **********************

const getSelectedModel = async (req, res) => {
  const { selectedMake } = req.params;

  // Fetch selected departments from the database based on the institute ID
  conn.query(
    "SELECT * FROM c_model WHERE make_id = ?",
    [selectedMake],
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

module.exports = { getReport, getSelectedDepartment, getSelectedModel };
