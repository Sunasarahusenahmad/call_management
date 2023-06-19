const conn = require("../db/conn");
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const multer = require("multer");

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sunasarahusenahmad07@gmail.com",
    pass: "fjygvsdrcalpsnka",
  },
});

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads"); // store the image in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({
  storage: imgconfig,
});

// **************** Add Call Details *******************

router.post("/addcall", upload.array("images", 50), (req, res) => {
  const {
    callDate,
    instituteId,
    departmentId,
    calltypeID,
    makeId,
    modelId,
    serialnoId,
    problemStatement,
    callAction,
    callRemarks,
    collectedBy,
    deliveredBy,
    deliveredDate,
  } = req.body;

  const imgs = req.files.map((file) => file.filename);

  console.log(req.body);

  conn.query(
    "INSERT INTO `c_callmaster`(`call_date`, `institute_id`, `department_id`, `calltype_id`, `make_id`, `model_id`, `serialno_id`, `problem_statement`, `call_action`, `call_remarks`, `collected_by`, `delivered_by`, `delivered_date`, `images` ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      callDate,
      instituteId,
      departmentId,
      calltypeID,
      makeId,
      modelId,
      serialnoId,
      problemStatement,
      callAction,
      callRemarks,
      collectedBy,
      deliveredBy,
      deliveredDate,
      imgs.join(","),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        // res.status(500).send("An error occurred while inserting call details.");
      } else {
        res.send(result);
        console.log("Call Details Inserted!");
      }
    }
  );
});

// ************ Get Call Details **********************

router.get("/getcall", (req, res) => {
  const q =
    "SELECT *, DATE_FORMAT(DATE(call_date), '%Y-%m-%d') AS call_date, DATE_FORMAT(DATE(delivered_date), '%Y-%m-%d') AS delivered_date FROM c_callmaster order by id desc ";

  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

// ************ Selected Department of Institute in Call Details **********************

router.get("/selectedDepartments/:instituteId", (req, res) => {
  const { instituteId } = req.params;

  // Fetch selected departments from the database based on the institute ID
  conn.query(
    "SELECT * FROM c_department WHERE institute_id = ?",
    [instituteId],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.json(results);
      }
    }
  );
});

// ************ Selected Model of Make in Call Details **********************

router.get("/selectedModels/:makeId", (req, res) => {
  const { makeId } = req.params;

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
});

// ************ Trash Call Details **********************

router.delete("/trashcall/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM c_callmaster WHERE id = ?";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the Call Details." });
    } else {
      res.send(data);
      console.log("Call Details Deleted Successfully");
    }
  });
});

// ************ Get Call Details **********************

router.get("/getpercall/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const q =
    "SELECT *, DATE_FORMAT(DATE(call_date), '%Y-%m-%d') AS call_date, DATE_FORMAT(DATE(delivered_date), '%Y-%m-%d') AS delivered_date FROM c_callmaster WHERE id = ? order by id desc ";

  conn.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

// Send Mail

router.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "sunasarahusenahmad07@gmail.com",
    to: to.join(", "),
    subject,
    text,
  };

  console.log(to, subject, text);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).send("An error occurred while sending the email.");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully.");
    }
  });
});

// get call type name

router.get("/getcalltypename/:id", (req, res) => {
  const InstiId = req.params.id;
  const query = "SELECT call_type FROM c_calltype WHERE id = ?";

  // Execute the query with the call type ID as a parameter
  conn.query(query, [InstiId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving call type name");
    } else if (results.length === 0) {
      res.status(404).send("Call type not found");
    } else {
      const callTypeName = results[0].call_type;
      res.json({ call_type: callTypeName });
    }
  });
});

// get institute name

router.get("/getinstitutename/:id", (req, res) => {
  const InstiId = req.params.id;
  const query =
    "SELECT institute_name, institute_email FROM c_institute WHERE id = ?";

  // Execute the query with the Institute ID as a parameter
  conn.query(query, [InstiId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving Institute name");
    } else if (results.length === 0) {
      res.status(404).send("Institute not found");
    } else {
      const InstituteName = results[0].institute_name;
      const InstituteEmail = results[0].institute_email;
      res.json({
        institute_name: InstituteName,
        institute_email: InstituteEmail,
      });
    }
  });
});

// get department name

router.get("/getdepartmentname/:id", (req, res) => {
  const DepartmentId = req.params.id;
  const query = "SELECT department_name FROM c_department WHERE id = ?";

  // Execute the query with the Department ID as a parameter
  conn.query(query, [DepartmentId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving Department name");
    } else if (results.length === 0) {
      res.status(404).send("Department not found");
    } else {
      const DepartmentName = results[0].department_name;
      res.json({ department_name: DepartmentName });
    }
  });
});

// get model name

router.get("/getmodelname/:id", (req, res) => {
  const ModelID = req.params.id;
  const query = "SELECT model_name FROM c_model WHERE id = ?";

  // Execute the query with the Model ID as a parameter
  conn.query(query, [ModelID], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving Model name");
    } else if (results.length === 0) {
      res.status(404).send("Model not found");
    } else {
      const modelName = results[0].model_name;
      res.json({ model_name: modelName });
    }
  });
});

// get make name

router.get("/getmakename/:id", (req, res) => {
  const MakeID = req.params.id;
  const query = "SELECT make_name FROM c_make WHERE id = ?";

  // Execute the query with the Make ID as a parameter
  conn.query(query, [MakeID], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving Make name");
    } else if (results.length === 0) {
      res.status(404).send("Make not found");
    } else {
      const makeName = results[0].make_name;
      console.log(makeName);
      res.json({ make_name: makeName });
    }
  });
});

// get serial no

router.get("/getserialnos/:id", (req, res) => {
  const SerialNO = req.params.id;
  const query = "SELECT serial_no FROM c_serialno WHERE id = ?";

  // Execute the query with the Serial no as a parameter
  conn.query(query, [SerialNO], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving Serial no");
    } else if (results.length === 0) {
      res.status(404).send("Serial no not found");
    } else {
      const serialNo = results[0].serial_no;
      res.json({ serial_no: serialNo });
    }
  });
});

// edit call details

router.put("/editcall/:id", upload.array("images", 50), (req, res) => {
  const {
    callDate,
    instituteId,
    departmentId,
    calltypeID,
    makeId,
    modelId,
    serialnoId,
    problemStatement,
    callAction,
    callRemarks,
    collectedBy,
    deliveredBy,
    deliveredDate,
  } = req.body;

  const id = req.params.id;
  console.log(id);

  let imgs = [''];

  if (imgs == undefined) {

  } else {
    imgs = req.files.map((file) => file.filename);
  }

  console.log(imgs);

  console.log(req.body);

  conn.query(
    "UPDATE `c_callmaster` SET `call_date`= ?,`institute_id`= ?,`department_id`= ?,`calltype_id`= ?,`make_id`= ?,`model_id`= ?,`serialno_id`= ?,`problem_statement`= ?,`call_action`= ?,`call_remarks`= ?,`collected_by`= ?,`delivered_by`= ?,`delivered_date`= ?,`images`= ? WHERE id = ?",
    [
      callDate,
      instituteId,
      departmentId,
      calltypeID,
      makeId,
      modelId,
      serialnoId,
      problemStatement,
      callAction,
      callRemarks,
      collectedBy,
      deliveredBy,
      deliveredDate,
      imgs.join(","),
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        // res.status(500).send("An error occurred while inserting call details.");
      } else {
        res.send(result);
        console.log("Call Details Updated Successfully!");
      }
    }
  );
});

module.exports = router;
