const conn = require("../db/conn");
const express = require("express");
const nodemailer = require("nodemailer");
// const twilio = require("twilio");
const router = express.Router();
const multer = require("multer");

let transporter;

// Set admin mail details
router.post("/updatesetmail", (req, res) => {
  // const { adminEmail, adminPassword, adminService } = req.body;
  // console.log(adminEmail, adminPassword, adminService);

  const { admin_email, admin_password, admin_service } = req.body;
  console.log(admin_email, admin_password, admin_service);
  const query =
    "UPDATE c_setmail SET admin_email = ?, admin_password = ?, admin_service = ?  WHERE id = 1";

  conn.query(
    query,
    [admin_email, admin_password, admin_service],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        // res.send(results);
      }
    }
  );

  // Create the transporter with the provided admin details
  transporter = nodemailer.createTransport({
    service: admin_service,
    auth: {
      user: admin_email,
      pass: admin_password,
    },
  });

  res.send("Admin mail details set successfully.");
});

// Send Mail
router.post("/send-email", (req, res) => {
  const { to, subject, text, userEmail } = req.body;
  console.log(to, subject, text, userEmail);

  if (!transporter) {
    return res.status(500).send("Admin mail details not set.");
  }

  const toEmails = [to, ...userEmail];

  const mailOptions = {
    to: toEmails.join(", "),
    subject,
    text,
    from: "System Service Report <your-email@example.com>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      res
        .status(500)
        .send("An error occurred while sending the email: " + error.message);
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully.");
    }
  });
});

// Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "sunasarahusenahmad07@gmail.com",
//     pass: "fjygvsdrcalpsnka",
//   },
// });

// whatsapp api
// whatsapp account sid : ACa99f7e636f920b0fea25afac9c1485ce
// whatsapp auth token : 7b2140a7c004bfa36a785d33579f32c3

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     // user: "sunasarahusenahmad07@gmail.com",
//     // pass: "gkxxcmufsczhtjiq",
//     // user: "fackidi69@gmail.com",
//     // pass: "iznmliqqjrtrtnrj",
//     user: "mahesh.patel@bkmbcacollege.ac.in",
//     pass: "qzphbalbtdxqtzza"
//   },
// });

// let transporter;
// let twilioClient;

// // Set admin mail details
// router.post("/setadminmail", (req, res) => {
//   const {
//     adminEmail,
//     adminPassword,
//     adminService,
//     twilioAccountSid,
//     twilioAuthToken,
//   } = req.body;

//   // Create the transporter with the provided admin details
//   transporter = nodemailer.createTransport({
//     service: adminService,
//     auth: {
//       user: adminEmail,
//       pass: adminPassword,
//     },
//   });

//   // Create the Twilio client
//   twilioClient = twilio(twilioAccountSid, twilioAuthToken);

//   res.send("Admin mail details set successfully.");
// });

// // Send Mail and WhatsApp message
// router.post("/send-email", (req, res) => {
//   const { to, subject, text } = req.body;
//   const userEmail = req.body.userEmail || [];

//   if (!transporter) {
//     return res.status(500).send("Admin mail details not set.");
//   }

//   const toEmails = [...to, ...userEmail];
//   const mailOptions = {
//     from: "System Support Services",
//     to: toEmails.join(", "),
//     subject,
//     text,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error:", error);
//       res
//         .status(500)
//         .send("An error occurred while sending the email: " + error.message);
//     } else {
//       console.log("Email sent:", info.response);
//       res.send("Email sent successfully.");

//       // Send WhatsApp message with the email details
//       const message = `New email sent\nSubject: ${subject}\nTo: ${toEmails.join(
//         ""
//       )}\nMessage: ${text}`;

//       twilioClient.messages
//         .create({
//           body: message,
//           from: "whatsapp:+14155238886",
//           to: "whatsapp:+919157037748",
//         })
//         .then((message) => console.log("WhatsApp message sent:", message.sid))
//         .catch((error) =>
//           console.log("Error sending WhatsApp message:", error)
//         );
//     }
//   });
// });

// **************** Add Only Call Details with Clock Time *******************

router.post("/addclocktime", (req, res) => {
  const { id, time } = req.body;
  console.log(time);

  const q = `UPDATE c_callmaster SET ending_at = ? WHERE id = ?`;
  conn.query(q, [time, id], (error, results) => {
    if (error) {
      console.error(error);
    } else {
      res.send(results);
    }
  });
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
    userIds,
  } = req.body;

  const imgs = req.files.map((file) => file.filename);

  console.log(req.body);

  conn.query(
    "INSERT INTO `c_callmaster`(`call_date`, `institute_id`, `department_id`, `calltype_id`, `make_id`, `model_id`, `serialno_id`, `problem_statement`, `call_action`, `call_remarks`, `collected_by`, `delivered_by`, `delivered_date`, `images`, `user_id` ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
      userIds,
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
    // "SELECT *, DATE_FORMAT(DATE(call_date), '%Y-%m-%d') AS call_date, DATE_FORMAT(DATE(delivered_date), '%Y-%m-%d') AS delivered_date, DATE_FORMAT(created_at, '%h:%i:%s') AS created_at, DATE_FORMAT(ending_at, '%h:%i:%s') AS ending_at FROM c_callmaster order by id desc ";

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
    status,
  } = req.body;

  const id = req.params.id;
  console.log(id);

  let imgs = [""];

  if (imgs == undefined) {
  } else {
    imgs = req.files.map((file) => file.filename);
  }

  console.log(imgs);

  console.log(req.body);

  conn.query(
    "UPDATE `c_callmaster` SET `call_date`= ?,`institute_id`= ?,`department_id`= ?,`calltype_id`= ?,`make_id`= ?,`model_id`= ?,`serialno_id`= ?,`problem_statement`= ?,`call_action`= ?,`call_remarks`= ?,`collected_by`= ?,`delivered_by`= ?,`delivered_date`= ?,`images`= ?, `status`= ? WHERE id = ?",
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
      status,
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

// ************ Get Admin Details **********************

router.get("/getadmin", (req, res) => {
  const q = "SELECT * FROM c_admin WHERE id = ? ";
  const id = 1;
  conn.query(q, id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

// ************ Update Admin Details **********************

router.put("/updateadminprofile", (req, res) => {
  const { email, password } = req.body;
  const query = "UPDATE c_admin SET email = ?, password = ? WHERE id = 1";

  conn.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  });
});

// ************ Get Set Admin Mail Details **********************

router.get("/getmail", (req, res) => {
  const q = "SELECT * FROM c_setmail WHERE id = ? ";
  const id = 1;
  conn.query(q, id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

// ************ Update Set Mail Details **********************

// router.put("/updatesetmail", (req, res) => {
//   const { admin_email, admin_password, admin_service } = req.body;
//   const query =
//     "UPDATE c_setmail SET admin_email = ?, admin_password = ?, admin_service = ?  WHERE id = 1";

//   conn.query(
//     query,
//     [admin_email, admin_password, admin_service],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//       } else {
//         res.send(results);
//       }
//     }
//   );
// });

module.exports = router;
