import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

// MUI Dialog Box

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const AddCall = () => {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");
  const user = sessionStorage.getItem("user");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const isLoggedIn =
      sessionStorage.getItem("email") || sessionStorage.getItem("user");
    if (!isLoggedIn) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Logout")) {
      // Clear the session
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("userId");
      navigate("/admin", { replace: true });
    }
  };

  // Store the Data in State
  const [callDate, setCallDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [instituteId, setInstituteId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [calltypeID, setCalltypeID] = useState("");
  const [makeId, setMakeId] = useState("");
  const [modelId, setModelId] = useState("");
  const [serialnoId, setSerialnoId] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [callAction, setCallAction] = useState("");
  const [callRemarks, setCallRemarks] = useState("");
  const [collectedBy, setCollectedBy] = useState("");
  const [deliveredBy, setDeliveredBy] = useState("");
  const [deliveredDate, setDeliveredDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [userIds, setUserIds] = useState(sessionStorage.getItem("userId"));
  console.log(userIds);
  // handle image

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const newSelectedImages = [...selectedImages];

    for (let i = 0; i < files.length; i++) {
      console.log(files.length);
      console.log(files[i]);
      const file = files[i];
      const reader = new FileReader();

      reader.onload = ((index) => (e) => {
        console.log(file);
        newSelectedImages.push({ file, url: e.target.result });
        console.log(newSelectedImages);
        setSelectedImages(newSelectedImages);
      })(i);

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  console.log(selectedImages);

  // Get Department Data
  const [department, setDepartment] = useState([]);

  const getSelectedDepartments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/selectedDepartments/${instituteId}`
      );
      setDepartment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Institute Data
  const [institute, setInstitute] = useState([]);

  const getInstitute = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getinstitute`
      );
      setInstitute(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Make Data
  const [make, setMake] = useState([]);

  const getMake = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY_URL}/getmake`);
      setMake(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Model Data
  const [model, setModel] = useState([]);

  const getSelectedModels = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/selectedModels/${makeId}`
      );
      setModel(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Get Serialno Data
  const [serialno, setSerialno] = useState([]);

  const getSerialno = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getserialno`
      );
      console.log(res);
      setSerialno(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Calltype Data
  const [calltype, setCalltype] = useState([]);

  const getCalltype = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getcalltype`
      );
      setCalltype(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (instituteId) {
      getSelectedDepartments();
    }
    getInstitute();
    getMake();
    if (makeId) {
      getSelectedModels();
    }
    getSerialno();
    getCalltype();
  }, [instituteId, makeId]);

  // Save the data in database
  const admin_savedata = async (e) => {
    e.preventDefault();
    try {
      // if (serialnoId == "") {
      //   window.alert("Please Fill up the Serial No");
      // } else {
      // Appends all field data
      const formdata = new FormData();

      formdata.append("callDate", callDate);
      formdata.append("instituteId", instituteId);
      formdata.append("departmentId", departmentId);
      formdata.append("calltypeID", calltypeID);
      formdata.append("makeId", makeId);
      formdata.append("modelId", modelId);
      formdata.append("serialnoId", serialnoId);
      formdata.append("problemStatement", problemStatement);
      formdata.append("callAction", callAction);
      formdata.append("callRemarks", callRemarks);
      formdata.append("collectedBy", collectedBy);
      formdata.append("deliveredBy", deliveredBy);
      formdata.append("deliveredDate", deliveredDate);
      formdata.delete("userIds");

      selectedImages.forEach((image) => {
        formdata.append("images", image.file);
      });

      // const team = {
      //   callDate,
      //   instituteId,
      //   departmentId,
      //   calltypeID,
      //   makeId,
      //   modelId,
      //   serialnoId,
      //   problemStatement,
      //   callAction,
      //   callRemarks,
      //   collectedBy,
      //   deliveredBy,
      //   deliveredDate,
      // }
      console.log(formdata);
      const res = axios.post(
        `${process.env.REACT_APP_PROXY_URL}/addcall`,
        formdata
      );
      console.log(res);

      if (!res) {
        window.alert("Call Details is not Inserted 😂");
      } else {
        window.alert("Call Details is Inserted Successfully 👍");
        navigate("/admin-dashboard", { replace: true });
      }
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const user_savedata = async (e) => {
    e.preventDefault();

    try {
      // if (serialnoId == "") {
      //   window.alert("Please Fill up the Serial No");
      // } else {
      // Appends all field data
      const formdata = new FormData();

      formdata.append("callDate", callDate);
      formdata.append("instituteId", instituteId);
      formdata.append("departmentId", departmentId);
      formdata.append("calltypeID", calltypeID);
      formdata.append("makeId", makeId);
      formdata.append("modelId", modelId);
      formdata.append("serialnoId", serialnoId);
      formdata.append("problemStatement", problemStatement);
      formdata.append("callAction", callAction);
      formdata.append("callRemarks", callRemarks);
      formdata.append("collectedBy", collectedBy);
      formdata.append("deliveredBy", deliveredBy);
      formdata.append("deliveredDate", deliveredDate);
      formdata.append("userIds", userIds);

      selectedImages.forEach((image) => {
        formdata.append("images", image.file);
      });

      // const team = {
      //   callDate,
      //   instituteId,
      //   departmentId,
      //   calltypeID,
      //   makeId,
      //   modelId,
      //   serialnoId,
      //   problemStatement,
      //   callAction,
      //   callRemarks,
      //   collectedBy,
      //   deliveredBy,
      //   deliveredDate,
      // }
      console.log(formdata);
      const res = axios.post(
        `${process.env.REACT_APP_PROXY_URL}/addcall`,
        formdata
      );
      console.log(res);

      if (!res) {
        window.alert("Call Details is not Inserted 😂");
      } else {
        window.alert("Call Details is Inserted Successfully 👍");
        navigate("/admin-dashboard", { replace: true });
      }
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickInstitute = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // Store Institute Data in State
  const [instituteName, setInstituteName] = useState("");
  const [instituteLocation, setInstituteLocation] = useState("");
  const [instituteEmail, setInstituteEmail] = useState("");

  // Add Institute
  const saveinstitute = async (e) => {
    e.preventDefault();

    const group = {
      instituteName: instituteName,
      instituteLocation: instituteLocation,
      instituteEmail: instituteEmail,
    };

    if (!instituteName || !instituteLocation || !instituteEmail) {
      window.alert("please fill-up all fields");
    } else {
      try {
        await axios
          .post(`${process.env.REACT_APP_PROXY_URL}/addinstitute`, group)
          .then((res) => {
            console.log(res);
            window.alert("Institute Added successful!");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

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

  // Sorting Up - Down Arrow
  const [sortDirection, setSortDirection] = useState("asc");

  const toggleSortDirection = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
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
                          Welcome, {user || email}
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
                    <h1 className="h3 mb-0 text-gray-bold">Call Details</h1>
                    {/* <p className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                      className="fas fa-download fa-sm text-white-50"></i> Generate Report</p> */}
                  </div>

                  {/*  <!-- Form And Table Row --> */}
                  {!user && (
                    <>
                      <form encType="multipart/form-data" method="POST">
                        <div className="row">
                          {/*   <!-- Institutes Records --> */}
                          <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                              {/*  <!-- Header and Action Icon - Dropdown --> */}
                              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">
                                  Add Call Details
                                </h6>
                              </div>
                              {/*  <!-- Form Body --> */}
                              <div
                                className="card-body"
                                style={{
                                  fontFamily: "Signika Negative",
                                  fontSize: "15px",
                                }}
                              >
                                <div class="form-group">
                                  <label>Date</label>
                                  <input
                                    type="date"
                                    format="dd-MM-yyyy"
                                    class="form-control"
                                    placeholder="Enter Date"
                                    value={callDate}
                                    onChange={(e) => {
                                      setCallDate(e.target.value);
                                    }}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="website">
                                    Select Institute
                                  </label>
                                  <select
                                    className="form-control"
                                    value={instituteId}
                                    onChange={(e) => {
                                      setInstituteId(e.target.value);
                                    }}
                                    aria-label="Select option"
                                  >
                                    <option defaultValue>
                                      Select Institute
                                    </option>
                                    {institute.map((item) => {
                                      return (
                                        <option value={item.id}>
                                          {item.institute_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  <NavLink
                                    onClick={handleClickInstitute("paper")}
                                  >
                                    <div
                                      className="mb-4"
                                      style={{ fontSize: 14 }}
                                    >
                                      {" "}
                                      Add New Institute
                                    </div>
                                  </NavLink>
                                </div>

                                <Dialog
                                  open={open}
                                  fullWidth={true}
                                  onClose={handleClose}
                                  scroll={scroll}
                                  aria-labelledby="scroll-dialog-title"
                                  aria-describedby="scroll-dialog-description"
                                >
                                  <DialogTitle id="scroll-dialog-title">
                                    Add New Institute
                                  </DialogTitle>
                                  <DialogContent dividers={scroll === "paper"}>
                                    <DialogContentText
                                      id="scroll-dialog-description"
                                      ref={descriptionElementRef}
                                      tabIndex={-1}
                                    >
                                      <div class="dash-content px-3">
                                        <div class="card rounded-2">
                                          <form
                                            className="m-4"
                                            style={{
                                              fontFamily: "Signika Negative",
                                              fontSize: "15px",
                                            }}
                                          >
                                            <div class="form-group">
                                              <label for="name">
                                                Institute Name
                                              </label>
                                              <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter Institute Name"
                                                value={instituteName}
                                                onChange={(e) => {
                                                  setInstituteName(
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                            </div>

                                            <div class="form-group">
                                              <label for="location">
                                                Institute Location
                                              </label>
                                              <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter Location"
                                                value={instituteLocation}
                                                onChange={(e) => {
                                                  setInstituteLocation(
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                            </div>

                                            <div class="form-group">
                                              <label for="email">
                                                Institute Email
                                              </label>
                                              <input
                                                type="email"
                                                class="form-control"
                                                placeholder="Enter Email"
                                                value={instituteEmail}
                                                onChange={(e) => {
                                                  setInstituteEmail(
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                            </div>
                                            {/* <input type="submit" onClick={saveinstitute} value={'Submit'} class="btn btn-primary col-lg-12 col-md-12 col-sm-12" /> */}
                                          </form>
                                        </div>
                                      </div>
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      variant="outlined"
                                      onClick={handleClose}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="contained"
                                      onClick={saveinstitute}
                                    >
                                      Submit
                                    </Button>
                                  </DialogActions>
                                </Dialog>

                                <div className="form-group">
                                  <label htmlFor="website">
                                    Select Department
                                  </label>

                                  <select
                                    className="form-control"
                                    onChange={(e) => {
                                      setDepartmentId(e.target.value);
                                    }}
                                    id="departmentId"
                                  >
                                    <option value="">Select Department</option>
                                    {department.map((d) => (
                                      <option key={d.id} value={d.id}>
                                        {d.department_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div class="form-group">
                                  <label for="website">Select Call Type</label>
                                  <select
                                    className="form-control"
                                    value={calltypeID}
                                    onChange={(e) => {
                                      setCalltypeID(e.target.value);
                                    }}
                                    aria-label="Select option"
                                  >
                                    <option defaultValue>
                                      Select Call Type
                                    </option>
                                    {calltype.map((item) => {
                                      return (
                                        <option value={item.id}>
                                          {item.call_type}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div class="form-group">
                                  <label for="website">
                                    Select Make (Company){" "}
                                  </label>
                                  <select
                                    className="form-control"
                                    value={makeId}
                                    onChange={(e) => {
                                      setMakeId(e.target.value);
                                    }}
                                    aria-label="Select option"
                                  >
                                    <option defaultValue>
                                      Select Make (Company){" "}
                                    </option>
                                    {make.map((item) => {
                                      return (
                                        <option value={item.id}>
                                          {item.make_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div class="form-group">
                                  <label>Select Model</label>
                                  <select
                                    className="form-control"
                                    onChange={(e) => {
                                      setModelId(e.target.value);
                                    }}
                                    aria-label="Select option"
                                  >
                                    <option defaultValue>Select Model</option>
                                    {model.map((k) => (
                                      <option key={k.id} value={k.id}>
                                        {k.model_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="website">
                                    Select Serial No
                                  </label>

                                  <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size="small"
                                    options={serialno}
                                    getOptionLabel={(option) =>
                                      option.serial_no
                                    }
                                    sx={{ width: 300 }}
                                    onChange={(e, val) => {
                                      if (val) {
                                        setSerialnoId(val.id);
                                      } else {
                                        setSerialnoId(null);
                                      }
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Serial No"
                                      />
                                    )}
                                  />
                                </div>

                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    name="images"
                                    type="file"
                                    onChange={handleImageUpload}
                                    multiple
                                    disabled
                                  />
                                  <div>
                                    {selectedImages.map((image, index) => (
                                      <div key={index}>
                                        <img
                                          src={image.url}
                                          alt={`Selected Image ${index + 1}`}
                                          style={{
                                            width: "100px",
                                            height: "100px",
                                          }}
                                        />
                                        <button
                                          onClick={() => removeImage(index)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*  <!-- Call type Form --> */}
                          <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                              {/*  <!-- Call type Header - Dropdown --> */}
                              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">
                                  Add Call Details
                                </h6>
                              </div>
                              {/*  <!-- Form Body --> */}
                              <div
                                className="card-body"
                                style={{
                                  fontFamily: "Signika Negative",
                                  fontSize: "15px",
                                }}
                              >
                                <div class="form-group">
                                  <label for="name">Problem Statement</label>
                                  <textarea
                                    class="form-control"
                                    value={problemStatement}
                                    onChange={(e) => {
                                      setProblemStatement(e.target.value);
                                    }}
                                    rows="2"
                                    placeholder="write problem statement here..."
                                  ></textarea>
                                </div>

                                <div class="form-group">
                                  <label for="name">Call Action</label>
                                  <textarea
                                    class="form-control"
                                    value={callAction}
                                    onChange={(e) => {
                                      setCallAction(e.target.value);
                                    }}
                                    rows="2"
                                    placeholder="write problem action here..."
                                  ></textarea>
                                </div>

                                <div class="form-group">
                                  <label for="name">Problem Remarks</label>
                                  <textarea
                                    class="form-control"
                                    value={callRemarks}
                                    onChange={(e) => {
                                      setCallRemarks(e.target.value);
                                    }}
                                    rows="2"
                                    placeholder="write problem remarks here..."
                                  ></textarea>
                                </div>

                                <div class="form-group">
                                  <label>Collected By</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Collected by"
                                    value={collectedBy}
                                    onChange={(e) => {
                                      setCollectedBy(e.target.value);
                                    }}
                                  />
                                </div>

                                <div class="form-group">
                                  <label>Delivered By</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Delivered by"
                                    value={deliveredBy}
                                    onChange={(e) => {
                                      setDeliveredBy(e.target.value);
                                    }}
                                  />
                                </div>

                                <div class="form-group">
                                  <label>Delivered Date</label>
                                  <input
                                    type="date"
                                    format="dd-MM-yyyy"
                                    class="form-control"
                                    placeholder="Delivered Date"
                                    value={deliveredDate}
                                    onChange={(e) => {
                                      setDeliveredDate(e.target.value);
                                    }}
                                  />
                                </div>

                                <input
                                  type="submit"
                                  onClick={admin_savedata}
                                  value={"Submit"}
                                  class="btn btn-primary col-lg-12 col-md-12 col-sm-12"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  {!email && (
                    <>
                      <form encType="multipart/form-data" method="POST">
                        <div className="row">
                          <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-4">
                              {/*  <!-- Call type Header - Dropdown --> */}
                              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">
                                  Add Call Details
                                </h6>
                              </div>
                              {/*  <!-- Form Body --> */}
                              <div
                                className="card-body"
                                style={{
                                  fontFamily: "Signika Negative",
                                  fontSize: "15px",
                                }}
                              >
                                <div class="form-group">
                                  <label for="name">USER ID</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    required
                                    value={userIds}
                                    onChange={(e) => {
                                      setUserIds(e.target.value);
                                    }}
                                    readOnly
                                  />
                                </div>

                                <div class="form-group">
                                  <label>Date</label>
                                  <input
                                    type="date"
                                    format="dd-MM-yyyy"
                                    class="form-control"
                                    placeholder="Enter Date"
                                    value={callDate}
                                    onChange={(e) => {
                                      setCallDate(e.target.value);
                                    }}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="website">
                                    Select Institute
                                  </label>
                                  <select
                                    className="form-control"
                                    value={instituteId}
                                    onChange={(e) => {
                                      setInstituteId(e.target.value);
                                    }}
                                    aria-label="Select option"
                                  >
                                    <option defaultValue>
                                      Select Institute
                                    </option>
                                    {institute.map((item) => {
                                      return (
                                        <option value={item.id}>
                                          {item.institute_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="website">
                                    Select Department
                                  </label>

                                  <select
                                    className="form-control"
                                    onChange={(e) => {
                                      setDepartmentId(e.target.value);
                                    }}
                                    id="departmentId"
                                  >
                                    <option value="">Select Department</option>
                                    {department.map((d) => (
                                      <option key={d.id} value={d.id}>
                                        {d.department_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div class="form-group">
                                  <label for="name">Problem Statement</label>
                                  <textarea
                                    class="form-control"
                                    value={problemStatement}
                                    onChange={(e) => {
                                      setProblemStatement(e.target.value);
                                    }}
                                    rows="2"
                                    placeholder="write problem statement here..."
                                  ></textarea>
                                </div>

                                <input
                                  type="submit"
                                  onClick={user_savedata}
                                  value={"Submit"}
                                  class="btn btn-primary col-lg-12 col-md-12 col-sm-12"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </>
  );
};

export default AddCall;
