import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const SendMail = () => {
  // SEND MAIL

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [userEmail, setUserEmail] = useState([]);
  const [callDate, setCallDate] = useState("");
  const [instituteId, setInstituteId] = useState(null);
  const [departmentId, setDepartmentId] = useState("");
  const [makeId, setMakeId] = useState("");
  const [modelId, setModelId] = useState("");
  const [serialnoId, setSerialnoId] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;
  console.log(id);

  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("email");
    if (!isLoggedIn) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Logout")) {
      // Clear the session
      sessionStorage.removeItem("email");
      navigate("/admin", { replace: true });
    }
  };

  // Get Call details Data
  const [call, setCall] = useState([]);

  const getCall = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY_URL}/getcall`);
      setCall(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPerCall = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getpercall/${id}`
      );

      const callTypeId = res.data[0].calltype_id;

      // Fetch the call type name based on the ID
      const callTypeRes = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getcalltypename/${callTypeId}`
      );
      const callTypeName = callTypeRes.data.call_type;

      setSubject(callTypeName);
      const callId = res.data[0].id;
      const callDate = res.data[0].call_date;
      const problemStatement = res.data[0].problem_statement;
      const callAction = res.data[0].call_action;

      // Get Institute Name
      const InstiId = res.data[0].institute_id;

      // Get Dpartment Name
      const DepartmentId = res.data[0].department_id;

      // Fetch the call type name based on the ID
      let InstituteName = "";
      let InstituteEmail = "";
      axios
        .get(`${process.env.REACT_APP_PROXY_URL}/getinstitutename/${InstiId}`)
        .then((res) => {
          InstituteName = res.data.institute_name;
          InstituteEmail = res.data.institute_email;
          setTo(InstituteEmail);
        });

      // Get Make name
      const MakeID = res.data[0].make_id;

      // Fetch the call type name based on the ID
      let MakeName = "";
      axios
        .get(`${process.env.REACT_APP_PROXY_URL}/getmakename/${MakeID}`)
        .then((res) => {
          MakeName = res.data.make_name;
        });

      // Get Serial No
      const SerialNO = res.data[0].serialno_id;
      // Fetch the call type name based on the ID
      let SerialNo = "";
      axios
        .get(`${process.env.REACT_APP_PROXY_URL}/getserialnos/${SerialNO}`)
        .then((res) => {
          SerialNo = res.data.serial_no;
        });

      // Get Model name
      const ModelID = res.data[0].model_id;
      // Fetch the call type name based on the ID
      let ModelName = "";
      axios
        .get(`${process.env.REACT_APP_PROXY_URL}/getmodelname/${ModelID}`)
        .then((res) => {
          ModelName = res.data.model_name;
        });
      // Fetch the call type name based on the ID
      let DepartmentName = "";
      axios
        .get(
          `${process.env.REACT_APP_PROXY_URL}/getdepartmentname/${DepartmentId}`
        )
        .then((res) => {
          DepartmentName = res.data.department_name;
          setText(
            `Call ID : ${callId} \nCall Date : ${callDate} \nInstitute : ${InstituteName} \nDepartment : ${DepartmentName} \n\nCall Type : ${callTypeName} \nMake : ${MakeName} \nModel : ${ModelName} \nSerial No : ${SerialNo} \n\nProblem Nature : \n${problemStatement} \n\nAction Taken: \n${callAction}`
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Get User Data
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY_URL}/getuser`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCall();
    getPerCall();
    getUser();
  }, []);

  // Toggle Icons Click Events
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  // End of Toggle Icons Click Events

  const sendmail = async (e) => {
    e.preventDefault();

    try {
      console.log(userEmail);
      console.log(to, subject, text, userEmail);
      await axios.post(`${process.env.REACT_APP_PROXY_URL}/send-email`, {
        to,
        subject,
        text,
        userEmail,
      });
      alert("Email sent successfully!");
    } catch (error) {
      console.log("Error:", error.response);
      alert("Failed to send the email.");
    }
  };

  return (
    <>
      <div>
        <body id="page-top">
          {/*  <!-- Page Wrapper --> */}
          <div id="wrapper">
            {/* <!-- Sidebar --> */}
            <ul className={style} id="accordionSidebar">
              {/*  <!-- Sidebar - Brand --> */}
              <NavLink
                className="sidebar-brand d-flex align-items-center justify-content-center"
                to={"/admin-dashboard"}
              >
                <div
                  className="sidebar-brand-icon"
                  style={{ transform: "rotate(15deg)" }}
                >
                  <i class="bi bi-telephone"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Call Management</div>
                <div className="text-center d-none d-md-inline"></div>
              </NavLink>

              {/*   <!-- Divider --> */}
              <hr className="sidebar-divider my-0" />
              {/*  <!-- Nav Item - Dashboard --> */}
              <li className="nav-item active">
                <NavLink to={"/admin-dashboard"} className="nav-link">
                  <i className="fas fa-fw fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              {/*  <!-- Divider --> */}
              <hr className="sidebar-divider" />
              {!user && (
                <>
                  {/*   <!-- Heading --> */}
                  <div className="sidebar-heading">Institute & Departments</div>

                  {/*  <!-- Nav Item - Institutes Collapse Menu --> */}
                  <li className="nav-item">
                    <NavLink to={"/allinstitute"} className="nav-link">
                      <i class="bi bi-house-gear"></i>
                      <span>Institute</span>
                    </NavLink>
                  </li>

                  {/* <!-- Nav Item - Departments Collapse Menu --> */}
                  <li className="nav-item">
                    <NavLink to={"/alldepartment"} className="nav-link">
                      <i class="bi bi-border-all"></i>
                      <span>Department</span>
                    </NavLink>
                  </li>

                  {/*  <!-- Divider --> */}
                  <hr className="sidebar-divider" />
                  {/*   <!-- Heading --> */}
                  <div className="sidebar-heading">Call Type</div>

                  <li className="nav-item">
                    <NavLink to={"/allcalltype"} className="nav-link">
                      <i class="bi bi-telephone-x"></i>
                      <span>Call Type</span>
                    </NavLink>
                  </li>

                  {/*  <!-- Divider --> */}
                  <hr className="sidebar-divider" />
                  {/* <!-- Heading --> */}
                  <div className="sidebar-heading">Makes & Models</div>

                  {/*  <!-- Nav Item - Make Collapse Menu --> */}
                  <li className="nav-item">
                    <NavLink to={"/allmake"} className="nav-link">
                      <i class="bi bi-building"></i>
                      <span>Make</span>
                    </NavLink>
                  </li>

                  {/*  <!-- Nav Item - Models Collapse Menu --> */}
                  <li className="nav-item">
                    <NavLink to={"/allmodel"} className="nav-link">
                      <i class="bi bi-usb-symbol"></i>
                      <span>Model</span>
                    </NavLink>
                  </li>

                  {/*  <!-- Divider --> */}
                  <hr className="sidebar-divider" />

                  {/* <!-- Heading --> */}
                  <div className="sidebar-heading">Serial No</div>

                  {/*  <!-- Nav Item - Serial No Collapse Menu --> */}
                  <li className="nav-item">
                    <NavLink to={"/allserialno"} className="nav-link">
                      <i class="bi bi-123"></i>
                      <span>Serial No</span>
                    </NavLink>
                  </li>

                  {/*  <!-- Divider --> */}
                  <hr className="sidebar-divider" />

                  {/* <!-- Heading --> */}
                  <div className="sidebar-heading">Call Master & User</div>

                  {/*  <!-- Nav Item - Call Master Collapse Menu --> */}
                  <li className="nav-item">
                    <NavLink to={"/allcall"} className="nav-link">
                      <i class="bi bi-telephone-plus"></i>
                      <span>Call Master</span>
                    </NavLink>
                  </li>

                  {/*  <!-- Nav Item - Add User Collapse Menu --> */}
                  <li className="nav-item">
                    <NavLink to={"/alluser"} className="nav-link">
                      <i class="bi bi-person"></i>
                      <span>Users</span>
                    </NavLink>
                  </li>

                  {/*  <!-- Divider --> */}
                  <hr className="sidebar-divider" />

                  {/* <!-- Heading --> */}
                  <div className="sidebar-heading">Reports</div>

                  {/*  <!-- Nav Item - Report Collapse Menu --> */}
                  <li className="nav-item">
                    <NavLink to={"/reports"} className="nav-link">
                      <i class="bi bi-journal-text"></i>
                      <span>Reports</span>
                    </NavLink>
                  </li>
                </>
              )}
              {/* Sidebar Toggle */}
              <button
                className="rounded-circle border-0 mx-auto mt-4"
                id="sidebarToggle"
                onClick={changeStyle}
              ></button>
            </ul>
            {/*  <!-- End of Sidebar --> */}

            {/*  <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/*  <!-- Main Content --> */}
              <div id="content">
                {/*  <!-- Topbar --> */}
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow ">
                  {/*  <!-- Sidebar Toggle (Topbar) --> */}
                  <button
                    id="sidebarToggleTop"
                    className="btn btn-link d-md-none rounded-circle mr-3"
                    onClick={changeStyle1}
                  >
                    <i className="fa fa-bars"></i>
                  </button>

                  {/*  <!-- Topbar Search --> */}
                  <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/*  <!-- Topbar Navbar --> */}
                  <ul className="navbar-nav ml-auto">
                    {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                    <li className="nav-item dropdown no-arrow d-sm-none">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="searchDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-search fa-fw"></i>
                      </a>
                      {/*   <!-- Dropdown - Messages --> */}
                      <div
                        className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown"
                      >
                        <form className="form-inline mr-auto w-100 navbar-search">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control bg-light border-0 small"
                              placeholder="Search for..."
                              aria-label="Search"
                              aria-describedby="basic-addon2"
                            />
                            <div className="input-group-append">
                              <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </li>

                    {/* <!-- Nav Item - User Information --> */}
                    <li className="nav-item dropdown no-arrow">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                          Welcome, {email}
                        </span>
                        <img
                          className="img-profile rounded-circle"
                          src="img/undraw_profile.svg"
                        />
                      </a>
                      {/*  <!-- Dropdown - User Information --> */}
                      <div
                        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown"
                      >
                        <a className="dropdown-item" href="#">
                          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                          Profile
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                          Settings
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                          Activity Log
                        </a>
                        <div className="dropdown-divider"></div>
                        <a
                          className="dropdown-item"
                          href=""
                          onClick={handleLogout}
                        >
                          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                          Logout
                        </a>
                      </div>
                    </li>
                  </ul>
                </nav>
                {/*  <!-- End of Topbar --> */}

                {/* <!-- Begin Page Content --> */}
                <div className="container-fluid">
                  {/*  <!-- Page Heading --> */}
                  <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-bold">Call Type</h1>
                    <div className="row">
                      <NavLink to={"/addcall"}>
                        <p className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                          <i className="bi bi-telephone-plus fa-sm text-white-50"></i>{" "}
                          Add Call Details
                        </p>
                      </NavLink>
                    </div>
                  </div>

                  {/*  <!-- Form And Table Row --> */}
                  <div className="row">
                    {/*   <!-- Institutes Records --> */}
                    <div className="col-xl-12 col-lg-12">
                      <div className="card shadow mb-4">
                        <div class="dash-content px-3">
                          <form
                            className="m-4"
                            style={{
                              fontFamily: "Signika Negative",
                              fontSize: "15px",
                            }}
                          >
                            <div class="form-group">
                              <label for="name">Institute Email</label>
                              <input
                                class="form-control"
                                type="email"
                                placeholder="To"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                readOnly
                              />
                            </div>

                            <div className="form-group">
                              <FormControl
                                sx={{
                                  m: 1,
                                  width: {
                                    xs: "100%",
                                    sm: 600,
                                    md: 800,
                                    lg: 1000,
                                  },
                                }}
                              >
                                <label htmlFor="name">Select User Email</label>
                                <Select
                                  multiple
                                  value={userEmail}
                                  onChange={(e) => {
                                    setUserEmail(e.target.value);
                                  }}
                                  size="small"
                                  renderValue={(selected) => (
                                    <div>
                                      {selected.map((value, index) => (
                                        <span key={value}>
                                          {value}
                                          {index < selected.length - 1
                                            ? ", "
                                            : ""}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                >
                                  {user.map((item) => (
                                    <MenuItem key={item.id} value={item.email}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>

                            <div class="form-group">
                              <label for="location">Subject</label>
                              <input
                                class="form-control"
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                readOnly
                              />
                            </div>

                            <div class="form-group">
                              <label for="email">Messages</label>

                              <textarea
                                rows="10"
                                class="form-control"
                                placeholder="Message"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                readOnly
                              />
                            </div>

                            <input
                              type="submit"
                              onClick={sendmail}
                              value={"Send Mail"}
                              class="btn btn-primary col-lg-12 col-md-12 col-sm-12"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </>
  );
};

export default SendMail;
