import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const EditCall = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;

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

  // Store the Data in State
  const [callDate, setCallDate] = useState("");
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
  const [deliveredDate, setDeliveredDate] = useState("");

  // handle image
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const newSelectedImages = [...selectedImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = ((index) => (e) => {
        newSelectedImages.push({ file, url: e.target.result });
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

  const imageExists = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  console.log(selectedImages);

  // Get Department Data
  const [department, setDepartment] = useState([]);

  const getSelectedDepartments = async () => {
    try {
      const res = await axios.get(`/selectedDepartments/${instituteId}`);
      setDepartment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Department Data
  const [dp, setDp] = useState([]);

  const getDp = async () => {
    try {
      const res = await axios.get("/getdepartment");
      setDp(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Institute Data
  const [institute, setInstitute] = useState([]);

  const getInstitute = async () => {
    try {
      const res = await axios.get("/getinstitute");
      setInstitute(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Make Data
  const [make, setMake] = useState([]);

  const getMake = async () => {
    try {
      const res = await axios.get("/getmake");
      setMake(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Model Data
  const [model, setModel] = useState([]);

  const getSelectedModels = async () => {
    try {
      const res = await axios.get(`/selectedModels/${makeId}`);
      setModel(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Model Data
  const [md, setMd] = useState([]);

  const getMd = async () => {
    try {
      const res = await axios.get("/getmodel");
      setMd(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Serialno Data
  const [serialno, setSerialno] = useState([]);

  const getSerialno = async () => {
    try {
      const res = await axios.get("/getserialno");
      setSerialno(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Calltype Data
  const [calltype, setCalltype] = useState([]);

  const getCalltype = async () => {
    try {
      const res = await axios.get("/getcalltype");
      setCalltype(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [gp, setGp] = useState([]);

  const getGP = async () => {
    try {
      const res = await axios.get(`/getpercall/${id}`);
      setGp(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPerCall = async () => {
    try {
      const res = await axios.get(`/getpercall/${id}`);
      setCallDate(res.data[0].call_date);
      setCalltypeID(res.data[0].calltype_id);
      // setMakeId(res.data[0].make_id);
      // setModelId(res.data[0].model_id);
      setSerialnoId(res.data[0].serialno_id);
      setProblemStatement(res.data[0].problem_statement);
      setCallAction(res.data[0].call_action);
      setCallRemarks(res.data[0].call_remarks);
      setCollectedBy(res.data[0].collected_by);
      setDeliveredBy(res.data[0].delivered_by);
      setDeliveredDate(res.data[0].delivered_date);
      setSelectedImages(res.data[0].images.split(","));
    } catch (error) {
      console.log(error);
    }
  };

  // const getNewCall = async () => {
  //   try {
  //     const res = await axios.get(`/getpercall/${id}`);
  //     setCallDate(res.data[0].call_date);
  //     setCalltypeID(res.data[0].calltype_id);
  //     setInstituteId(res.data[0].institute_id);
  //     setDepartmentId(res.data[0].department_id);
  //     setSerialnoId(res.data[0].serialno_id);
  //     setProblemStatement(res.data[0].problem_statement);
  //     setCallAction(res.data[0].call_action);
  //     setCallRemarks(res.data[0].call_remarks);
  //     setCollectedBy(res.data[0].collected_by);
  //     setDeliveredBy(res.data[0].delivered_by);
  //     setDeliveredDate(res.data[0].delivered_date);
  //     setImage(res.data[0].image);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getMake();
  //   if (instituteId) {
  //     getSelectedModels();
  //   }
  //   getSerialno();
  //   getCalltype();
  //   getNewCall();
  //   getGP();
  //   getDp();
  //   getMd();
  // }, [makeId]);

  useEffect(() => {
    if (instituteId) {
      getSelectedDepartments();
    }
    if (makeId) {
      getSelectedModels();
    }
    getMake();
    getInstitute();
    getSerialno();
    getCalltype();
    getPerCall();
    getGP();
    getDp();
    getMd();
  }, [instituteId, makeId]);

  // Save the data in database
  const editdata = async (e) => {
    e.preventDefault();

    try {
      if (instituteId == "") {
        window.alert("Please Fill up the Institute");
      } else if (departmentId == "") {
        window.alert("Please Fill up the Department");
      } else if (makeId == "") {
        window.alert("Please Fill up the Make");
      } else if (modelId == "") {
        window.alert("Please Fill up the Model");
      } else {
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

        selectedImages.forEach((image) => {
          formdata.append("images", image.file);
        });

        console.log(formdata);

        const res = axios.put(`/editcall/${id}`, formdata);

        if (!res) {
          window.alert("Call Details is not Updated 😂");
        } else {
          window.alert("Call Details is Updated Successfully 👍");
          navigate("/allcall", { replace: true });
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
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
              <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href="#"
              >
                <div
                  className="sidebar-brand-icon"
                  style={{ transform: "rotate(15deg)" }}
                >
                  <i class="bi bi-telephone"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Call Management</div>
                <div className="text-center d-none d-md-inline"></div>
              </a>

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

              {/*   <!-- Heading --> */}
              <div className="sidebar-heading">Institute & Departments</div>

              {/*  <!-- Nav Item - Institutes Collapse Menu --> */}
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-toggle="collapse"
                  data-target="#institute"
                  aria-expanded="true"
                  aria-controls="institute"
                >
                  <i class="bi bi-house-gear"></i>
                  <span>Institute</span>
                </a>
                <div
                  id="institute"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Institutes:</h6>
                    <NavLink to={"/allinstitute"} className="collapse-item">
                      All Institute
                    </NavLink>
                    <NavLink to={"/addinstitute"} className="collapse-item">
                      Add New
                    </NavLink>
                  </div>
                </div>
              </li>

              {/* <!-- Nav Item - Departments Collapse Menu --> */}
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-toggle="collapse"
                  data-target="#department"
                  aria-expanded="true"
                  aria-controls="department"
                >
                  <i class="bi bi-border-all"></i>
                  <span>Departments</span>
                </a>
                <div
                  id="department"
                  className="collapse"
                  aria-labelledby="headingUtilities"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Departments:</h6>
                    <NavLink to={"/alldepartment"} className="collapse-item">
                      All Departments
                    </NavLink>
                    <NavLink to={"/adddepartment"} className="collapse-item">
                      Add New
                    </NavLink>
                  </div>
                </div>
              </li>

              {/*  <!-- Divider --> */}
              <hr className="sidebar-divider" />

              {/* <!-- Heading --> */}
              <div className="sidebar-heading">Makes & Models</div>

              {/*  <!-- Nav Item - Make Collapse Menu --> */}
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-toggle="collapse"
                  data-target="#make"
                  aria-expanded="true"
                  aria-controls="make"
                >
                  <i class="bi bi-building"></i>
                  <span>Make (Company) </span>
                </a>
                <div
                  id="make"
                  className="collapse"
                  aria-labelledby="headingPages"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Make (Company):</h6>
                    <NavLink to={"/allmake"} className="collapse-item">
                      All Makes
                    </NavLink>
                    <NavLink to={"/addmake"} className="collapse-item">
                      Add New
                    </NavLink>
                  </div>
                </div>
              </li>

              {/*  <!-- Nav Item - Models Collapse Menu --> */}
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-toggle="collapse"
                  data-target="#model"
                  aria-expanded="true"
                  aria-controls="model"
                >
                  <i class="bi bi-usb-symbol"></i>
                  <span>Models</span>
                </a>
                <div
                  id="model"
                  className="collapse"
                  aria-labelledby="headingPages"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Models:</h6>
                    <NavLink to={"/allmodel"} className="collapse-item">
                      All Model
                    </NavLink>
                    <NavLink to={"/addmodel"} className="collapse-item">
                      Add New
                    </NavLink>
                  </div>
                </div>
              </li>

              {/*  <!-- Divider --> */}
              <hr className="sidebar-divider" />

              {/* <!-- Heading --> */}
              <div className="sidebar-heading">Serial No & Call Type</div>

              {/*  <!-- Nav Item - Serial No Collapse Menu --> */}
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-toggle="collapse"
                  data-target="#serialno"
                  aria-expanded="true"
                  aria-controls="serialno"
                >
                  <i class="bi bi-123"></i>
                  <span>Serial No</span>
                </a>
                <div
                  id="serialno"
                  className="collapse"
                  aria-labelledby="headingPages"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Serial No:</h6>
                    <NavLink to={"/allserialno"} className="collapse-item">
                      All Serial No
                    </NavLink>
                    <NavLink to={"/addserialno"} className="collapse-item">
                      Add New
                    </NavLink>
                  </div>
                </div>
              </li>

              {/*  <!-- Nav Item - Call Type Collapse Menu --> */}
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-toggle="collapse"
                  data-target="#calltype"
                  aria-expanded="true"
                  aria-controls="calltype"
                >
                  <i class="bi bi-telephone-x"></i>
                  <span>Call Type</span>
                </a>
                <div
                  id="calltype"
                  className="collapse"
                  aria-labelledby="headingPages"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Call Type:</h6>
                    <NavLink to={"/allcalltype"} className="collapse-item">
                      All Call Type
                    </NavLink>
                    <NavLink to={"/addcalltype"} className="collapse-item">
                      Add New
                    </NavLink>
                  </div>
                </div>
              </li>

              {/*  <!-- Divider --> */}
              <hr className="sidebar-divider" />

              {/* <!-- Heading --> */}
              <div className="sidebar-heading">Call Master & Add User</div>

              {/*  <!-- Nav Item - Call Master Collapse Menu --> */}
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-toggle="collapse"
                  data-target="#call"
                  aria-expanded="true"
                  aria-controls="call"
                >
                  <i class="bi bi-telephone-plus"></i>
                  <span>Call Master</span>
                </a>
                <div
                  id="call"
                  className="collapse"
                  aria-labelledby="headingPages"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Call Master:</h6>
                    <NavLink to={"/allcall"} className="collapse-item">
                      All Calls
                    </NavLink>
                    <NavLink to={"/addcall"} className="collapse-item">
                      Add New
                    </NavLink>
                  </div>
                </div>
              </li>

              {/*  <!-- Nav Item - Add User Collapse Menu --> */}
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-toggle="collapse"
                  data-target="#user"
                  aria-expanded="true"
                  aria-controls="user"
                >
                  <i class="bi bi-person"></i>
                  <span>User</span>
                </a>
                <div
                  id="user"
                  className="collapse"
                  aria-labelledby="headingPages"
                  data-
                  parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">User:</h6>
                    <NavLink to={"/alluser"} className="collapse-item">
                      All User
                    </NavLink>
                    <NavLink to={"/adduser"} className="collapse-item">
                      Add User
                    </NavLink>
                  </div>
                </div>
              </li>

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
                    <h1 className="h3 mb-0 text-gray-bold">Call Details</h1>
                  </div>

                  {/*  <!-- Form And Table Row --> */}
                  <form encType="multipart/form-data" method="POST">
                    <div className="row">
                      <ToastContainer />

                      {/*   <!-- Institutes Records --> */}
                      <div className="col-xl-4 col-lg-5">
                        <div className="card shadow mb-4">
                          {/*  <!-- Header and Action Icon - Dropdown --> */}
                          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                              Edit Call Details
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
                              <label for="name">ID</label>
                              <input
                                type="text"
                                class="form-control"
                                value={id}
                                readOnly
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="website">Select Institute</label>
                              <select
                                className="form-control"
                                value={instituteId}
                                onChange={(e) => {
                                  setInstituteId(e.target.value);
                                }}
                                aria-label="Select option"
                              >
                                <option defaultValue>Select Institute</option>
                                {institute.map((item) => {
                                  return (
                                    <option value={item.id}>
                                      {item.institute_name}
                                    </option>
                                  );
                                })}
                              </select>

                              <div
                                className="mt-2 p-2"
                                style={{
                                  backgroundColor: "#E61A23",
                                  color: "white",
                                  borderRadius: "5px",
                                }}
                              >
                                YOUR CURRENT INSTITUTE &rArr;
                                {gp.map((k) => {
                                  return (
                                    <span className="pl-2">
                                      {institute.map((x) => {
                                        if (k.institute_id == x.id) {
                                          return x.institute_name;
                                        }
                                      })}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="website">Select Department</label>

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

                              <div
                                className="mt-2 p-2"
                                style={{
                                  backgroundColor: "#E61A23",
                                  color: "white",
                                  borderRadius: "5px",
                                }}
                              >
                                YOUR CURRENT DEPARTMENT &rArr;
                                {gp.map((k) => {
                                  return (
                                    <span className="pl-2">
                                      {dp.map((x) => {
                                        if (k.department_id == x.id) {
                                          return x.department_name;
                                        }
                                      })}
                                    </span>
                                  );
                                })}
                              </div>
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

                              <div
                                className="mt-2 p-2"
                                style={{
                                  backgroundColor: "#E61A23",
                                  color: "white",
                                  borderRadius: "5px",
                                }}
                              >
                                YOUR CURRENT MAKE &rArr;
                                {gp.map((k) => {
                                  return (
                                    <span className="pl-2">
                                      {make.map((x) => {
                                        if (k.make_id == x.id) {
                                          return x.make_name;
                                        }
                                      })}
                                    </span>
                                  );
                                })}
                              </div>
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

                              <div
                                className="mt-2 p-2"
                                style={{
                                  backgroundColor: "#E61A23",
                                  color: "white",
                                  borderRadius: "5px",
                                }}
                              >
                                YOUR CURRENT MODEL &rArr;
                                {gp.map((k) => {
                                  return (
                                    <span className="pl-2">
                                      {md.map((x) => {
                                        if (k.model_id == x.id) {
                                          return x.model_name;
                                        }
                                      })}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>

                            <div class="form-group">
                              <label for="website">Select Call Type</label>
                              <select
                                className="form-control"
                                value={calltypeID}
                                onChange={(e) => setCalltypeID(e.target.value)}
                                aria-label="Select option"
                              >
                                <option defaultValue>Select Call Type</option>
                                {calltype.map((item) => {
                                  return (
                                    <option value={item.id}>
                                      {item.call_type}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <div className="form-group">
                              <label htmlFor="website">Select Serial No</label>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                size="small"
                                options={serialno}
                                getOptionLabel={(option) => option.serial_no}
                                sx={{ width: 300 }}
                                value={
                                  serialno.find(
                                    (option) => option.id === serialnoId
                                  ) || null
                                }
                                onChange={(e, val) => {
                                  if (val) {
                                    setSerialnoId(val.id);
                                  } else {
                                    setSerialnoId(null);
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Serial No" />
                                )}
                              />
                            </div>

                            <div class="form-group">
                              <label>Date</label>
                              <input
                                type="date"
                                class="form-control"
                                format="dd-MM-yyyy"
                                value={callDate}
                                onChange={(e) => {
                                  setCallDate(e.target.value);
                                }}
                              />
                            </div>

                            <div className="form-group">
                              <label>Choose Images</label>
                              <input
                                className="form-control"
                                name="images"
                                type="file"
                                onChange={handleImageUpload}
                                multiple
                              />

                              <div>
                                {selectedImages.map((image, index) => (
                                  <div key={index}>
                                    {imageExists(image) && !image.url ? (
                                      <img
                                        src={`/uploads/${image}`}
                                        alt={`image`}
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                        }}
                                      />
                                    ) : null}
                                    {imageExists(image) && image.url ? (
                                      <img
                                        src={image.url}
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                        }}
                                        alt={`Image ${index + 1}`}
                                      />
                                    ) : null}
                                    <button onClick={() => removeImage(index)}>
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>

                              {/* <div>
                                {selectedImages.map((image, index) => (
                                  <div key={index}>
                                    <img
                                      src={`/uploads/${image}`}
                                      // src={image.url}
                                      alt={`Selected Image ${index + 1}`}
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                      }}
                                    />
                                    <button onClick={() => removeImage(index)}>
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div> */}
                            </div>

                            {/* <div className="form-group mb-4">
                              {selectedImages.map((image, index) => {
                                <>
                                  <img
                                    key={index}
                                    src={image.url}
                                    alt={`No Images`}
                                    style={{ height: "100px", width: "100px" }}
                                  />
                                  <button onClick={() => removeImage(index)}>
                                    Remove
                                  </button>
                                </>;
                              })}
                            </div> */}
                          </div>
                        </div>
                      </div>
                      {/*  <!-- Call type Form --> */}
                      <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">
                          {/*  <!-- Call type Header - Dropdown --> */}
                          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                              Edit Call Details
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
                              <label for="name">Problem Action</label>
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
                                value={deliveredDate}
                                onChange={(e) => {
                                  setDeliveredDate(e.target.value);
                                }}
                              />
                            </div>

                            <input
                              type="submit"
                              onClick={editdata}
                              value={"Update"}
                              class="btn btn-primary col-lg-12 col-md-12 col-sm-12"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </>
  );
};

export default EditCall;
