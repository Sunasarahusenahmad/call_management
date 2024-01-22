import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Container, InputAdornment, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const Reports = () => {
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

  // Search Reports

  const [searchFilter, setSearchFilter] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [previewAll, setPreviewAll] = useState(false);
  const [currentReportIndex, setCurrentReportIndex] = useState(0);

  const [callId, setCallId] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCalltype, setSelectedCalltype] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedSerialNo, setSelectedSerialNo] = useState("");

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

  // Get Department Data
  const [department, setDepartment] = useState([]);

  const getDepartment = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/selectedDepartments/${selectedInstitute}`
      );
      setDepartment(res.data);
      setSelectedDepartment("");
    } catch (error) {
      console.log(error);
    }
  };

  // Get Call type Data
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

  const getModel = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/selectedModels/${selectedMake}`
      );
      setModel(res.data);
      setSelectedModel("");
    } catch (error) {
      console.log(error);
    }
  };

  // get serialno
  const [serilaNo, setSerialNo] = useState([]);

  const getSerialNo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getserialno`
      );
      setSerialNo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get call
  const [call, setCall] = useState([]);

  const getCall = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY_URL}/getcall`);
      setCall(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInstitute();
    if (selectedInstitute) {
      getDepartment();
    }
    getCalltype();
    getMake();
    if (selectedMake) {
      getModel();
    }
    getSerialNo();
    getCall();
  }, [selectedInstitute, selectedMake]);

  const handleFilter = (e) => {
    e.preventDefault();

    const requestData = {
      // callId: callId,
      selectedInstitute: selectedInstitute,
      selectedDepartment: selectedDepartment,
      selectedCalltype: selectedCalltype,
      selectedMake: selectedMake,
      selectedModel: selectedModel,
      selectedSerialNo: selectedSerialNo,
    };

    console.log(requestData);

    if (
      // callId ||
      selectedInstitute ||
      selectedDepartment ||
      selectedCalltype ||
      selectedMake ||
      selectedModel ||
      selectedSerialNo
    ) {
      axios
        .post(`${process.env.REACT_APP_PROXY_URL}/getreport`, requestData)
        .then((response) => {
          console.log(response.data);
          setCall(response.data);
          setShowContent(true);
          console.log(showContent);
          setPreviewAll(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setShowContent(false);
    }
  };

  // preview all report

  const previewAllFun = () => {
    const requestData = {
      // callId: callId,
      selectedInstitute: selectedInstitute,
      selectedDepartment: selectedDepartment,
      selectedCalltype: selectedCalltype,
      selectedMake: selectedMake,
      selectedModel: selectedModel,
      selectedSerialNo: selectedSerialNo,
    };
    axios
      .post(`${process.env.REACT_APP_PROXY_URL}/getreport`, requestData)
      .then((response) => {
        setCall(response.data);
        console.log(response.data);
        setShowContent(false);
        setPreviewAll(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // download report

  const downloadPdf = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      html: "#my-table",
    });
    doc.save("system-sevice-support.pdf");
  };

  // MUI DIALOG BOX

  const handleClose = () => {
    setPreviewAll(false);
  };

  return (
    <>
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
                      //   value={searchFilter}
                      //   onChange={(e) => {
                      //     setSearchFilter(e.target.value);
                      //   }}
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
                            // value={searchFilter}
                            // onChange={(e) => {
                            //   setSearchFilter(e.target.value);
                            // }}
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
                        Welcome, {email || user}
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
                      <a className="dropdown-item" href="">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Edit Profile
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
                  <h1 className="h3 mb-0 text-gray-bold">Find Report</h1>
                </div>

                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                      {/*  <!-- Header and Action Icon - Dropdown --> */}
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Search Records
                        </h6>
                        {/* <div>
                          <TextField
                            id="search"
                            type="search"
                            label="Search"
                            size="small"
                            value={searchFilter}
                            onChange={(e) => {
                              setSearchFilter(e.target.value);
                            }}
                            
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <SearchIcon
                                    onClick={handleIconSearch}
                                    style={{ cursor: "pointer" }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div> */}
                      </div>
                      <div
                        className="card-body"
                        style={{
                          fontFamily: "Signika Negative",
                          fontSize: "15px",
                        }}
                      >
                        <div className="row">
                          <div className="col-xl-4 col-lg-4">
                            {/* <div className="form-group">
                              <TextField
                                id="search"
                                type="search"
                                label="Search by Call ID"
                                size="small"
                                value={callId}
                                onChange={(e) => {
                                  setCallId(e.target.value);
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <SearchIcon
                                        // onClick={handleFilter}
                                        style={{ cursor: "pointer" }}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </div> */}

                            <div className="form-group">
                              <label htmlFor="website">Select Institute</label>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                required
                                size="small"
                                options={institute}
                                getOptionLabel={(option) =>
                                  option.institute_name
                                }
                                value={
                                  institute.find(
                                    (option) => option.id === selectedInstitute
                                  ) || null
                                }
                                onChange={(e, val) => {
                                  if (val) {
                                    setSelectedInstitute(val.id);
                                  } else {
                                    setSelectedInstitute("");
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Institute" />
                                )}
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="website">Select Department</label>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                required
                                size="small"
                                options={department}
                                getOptionLabel={(option) =>
                                  option.department_name
                                }
                                value={
                                  department.find(
                                    (option) => option.id === selectedDepartment
                                  ) || null
                                }
                                onChange={(e, val) => {
                                  if (val) {
                                    setSelectedDepartment(val.id);
                                  } else {
                                    setSelectedDepartment("");
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Deparment" />
                                )}
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="website">Select Call Type</label>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                required
                                size="small"
                                options={calltype}
                                getOptionLabel={(option) => option.call_type}
                                value={
                                  calltype.find(
                                    (option) => option.id === selectedCalltype
                                  ) || null
                                }
                                onChange={(e, val) => {
                                  if (val) {
                                    setSelectedCalltype(val.id);
                                  } else {
                                    setSelectedCalltype("");
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Call Type" />
                                )}
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="website">Select Make</label>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                required
                                size="small"
                                options={make}
                                getOptionLabel={(option) => option.make_name}
                                value={
                                  make.find(
                                    (option) => option.id === selectedMake
                                  ) || null
                                }
                                onChange={(e, val) => {
                                  if (val) {
                                    setSelectedMake(val.id);
                                  } else {
                                    setSelectedMake("");
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Make" />
                                )}
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="website">Select Model</label>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                required
                                size="small"
                                options={model}
                                getOptionLabel={(option) => option.model_name}
                                value={
                                  model.find(
                                    (option) => option.id === selectedModel
                                  ) || null
                                }
                                onChange={(e, val) => {
                                  if (val) {
                                    setSelectedModel(val.id);
                                  } else {
                                    setSelectedModel("");
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Model" />
                                )}
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="website">Select Serial No</label>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                required
                                size="small"
                                options={serilaNo}
                                getOptionLabel={(option) => option.serial_no}
                                value={
                                  serilaNo.find(
                                    (option) => option.id === selectedSerialNo
                                  ) || null
                                }
                                onChange={(e, val) => {
                                  if (val) {
                                    setSelectedSerialNo(val.id);
                                  } else {
                                    setSelectedSerialNo("");
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Serial No" />
                                )}
                              />
                            </div>

                            <input
                              type="submit"
                              onClick={handleFilter}
                              value={"Filter Report"}
                              class="btn btn-primary col-lg-12 col-md-12 col-sm-12"
                            />
                          </div>

                          <div className="col-xl-8 col-lg-8">
                            {showContent == true && call.length > 0 ? (
                              <div class="container">
                                <div class="table-container">
                                  <div class="row">
                                    <div class="col-lg-10 col-sm-12 mx-auto table-responsive">
                                      <div class="card">
                                        <div class="card-body">
                                          <h5 class="card-title text-center">
                                            System Service Support
                                          </h5>
                                          <table
                                            id="my-table"
                                            class="table table-bordered"
                                          >
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Date
                                                  </span>{" "}
                                                  <span className="pl-5">
                                                    {
                                                      call[currentReportIndex]
                                                        .call_date
                                                    }
                                                  </span>
                                                </td>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Call ID
                                                  </span>{" "}
                                                  <span className="pl-5">
                                                    {
                                                      call[currentReportIndex]
                                                        .id
                                                    }
                                                  </span>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Institute Name
                                                  </span>{" "}
                                                  <div className="pt-2">
                                                    {institute.map((x) => {
                                                      if (
                                                        call[currentReportIndex]
                                                          .institute_id === x.id
                                                      ) {
                                                        return x.institute_name;
                                                      }
                                                      return null;
                                                    })}
                                                  </div>
                                                </td>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Department Name
                                                  </span>{" "}
                                                  <div className="pt-2">
                                                    {department.map((x) => {
                                                      if (
                                                        call[currentReportIndex]
                                                          .department_id ===
                                                        x.id
                                                      ) {
                                                        return x.department_name;
                                                      }
                                                      return null;
                                                    })}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Call Type
                                                  </span>{" "}
                                                  <span
                                                    style={{
                                                      fontWeight: "lighter",
                                                    }}
                                                    className="pl-5"
                                                  >
                                                    {calltype.map((x) => {
                                                      if (
                                                        call[currentReportIndex]
                                                          .calltype_id === x.id
                                                      ) {
                                                        return x.call_type;
                                                      }
                                                      return null;
                                                    })}
                                                  </span>{" "}
                                                  <br />
                                                  Hardware <br />
                                                  Software <br />
                                                  Antivirus <br />
                                                  Other
                                                </td>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    System
                                                  </span>{" "}
                                                  <span
                                                    style={{
                                                      fontWeight: "lighter",
                                                    }}
                                                    className="pl-5"
                                                  >
                                                    {model.map((x) => {
                                                      if (
                                                        call[currentReportIndex]
                                                          .model_id === x.id
                                                      ) {
                                                        return x.model_name;
                                                      }
                                                      return null;
                                                    })}
                                                  </span>{" "}
                                                  <br />
                                                  Model <br />
                                                  Assemble <br />
                                                  or <br />
                                                  Branded
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Company
                                                  </span>{" "}
                                                  <span className="pl-5">
                                                    {make.map((x) => {
                                                      if (
                                                        call[currentReportIndex]
                                                          .make_id === x.id
                                                      ) {
                                                        return x.make_name;
                                                      }
                                                      return null;
                                                    })}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    System
                                                  </span>{" "}
                                                  <span
                                                    style={{
                                                      fontWeight: "lighter",
                                                    }}
                                                    className="pl-5"
                                                  >
                                                    {serilaNo.map((x) => {
                                                      if (
                                                        call[currentReportIndex]
                                                          .serialno_id === x.id
                                                      ) {
                                                        return x.serial_no;
                                                      }
                                                      return null;
                                                    })}
                                                  </span>{" "}
                                                  <br />
                                                  Serial <br />
                                                  Number
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Problem Nature
                                                  </span>{" "}
                                                  <div className="pt-2">
                                                    {
                                                      call[currentReportIndex]
                                                        .problem_statement
                                                    }
                                                  </div>
                                                </td>
                                                <td>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Action Taken
                                                  </span>{" "}
                                                  <div className="pt-2">
                                                    {
                                                      call[currentReportIndex]
                                                        .call_action
                                                    }
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <div>
                                            <Button
                                              variant="contained"
                                              onClick={() =>
                                                setCurrentReportIndex(
                                                  (prevIndex) =>
                                                    prevIndex > 0
                                                      ? prevIndex - 1
                                                      : 0
                                                )
                                              }
                                            >
                                              <SkipPreviousIcon />
                                            </Button>
                                            <Button
                                              variant="contained"
                                              className="ml-2"
                                              onClick={() =>
                                                setCurrentReportIndex(
                                                  (prevIndex) =>
                                                    prevIndex < call.length - 1
                                                      ? prevIndex + 1
                                                      : prevIndex
                                                )
                                              }
                                            >
                                              <SkipNextIcon />
                                            </Button>
                                            <Button
                                              onClick={downloadPdf}
                                              className="ml-2"
                                              variant="contained"
                                              startIcon={<LocalPrintshopIcon />}
                                            >
                                              Print
                                            </Button>
                                            <Button
                                              onClick={previewAllFun}
                                              className="ml-2"
                                              variant="contained"
                                            >
                                              Preview All
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <Dialog
                            open={previewAll}
                            onClose={handleClose}
                            maxWidth="lg"
                          >
                            <DialogTitle>
                              System Service Support{" "}
                              <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                style={{
                                  position: "absolute",
                                  top: 10,
                                  right: 10,
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </DialogTitle>
                            <DialogContent dividers>
                              <div className="table-container">
                                <div className="row">
                                  <div className="col-lg-10 col-sm-12 mx-auto table-responsive">
                                    <table
                                      id="my-table"
                                      className="table table-bordered"
                                    >
                                      <tbody>
                                        {call.map((item) => (
                                          <tr key={item.id}>
                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Date
                                              </span>{" "}
                                              <span className="pl-5">
                                                {item.call_date}
                                              </span>
                                            </td>

                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Call ID
                                              </span>{" "}
                                              <span className="pl-5">
                                                {item.id}
                                              </span>
                                            </td>

                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Institute Name
                                              </span>{" "}
                                              <span className="pl-5">
                                                {institute.map((x) => {
                                                  if (
                                                    item.institute_id == x.id
                                                  ) {
                                                    return x.institute_name;
                                                  } else {
                                                    return null;
                                                  }
                                                })}
                                              </span>
                                            </td>

                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Deparment Name
                                              </span>{" "}
                                              <span className="pl-5">
                                                {department.map((x) => {
                                                  if (
                                                    item.department_id == x.id
                                                  ) {
                                                    return x.department_name;
                                                  } else {
                                                    return null;
                                                  }
                                                })}
                                              </span>
                                            </td>

                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Call Type
                                              </span>{" "}
                                              <span className="pl-5">
                                                {calltype.map((x) => {
                                                  if (
                                                    item.calltype_id == x.id
                                                  ) {
                                                    return x.call_type;
                                                  } else {
                                                    return null;
                                                  }
                                                })}
                                              </span>
                                            </td>

                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Make Name
                                              </span>{" "}
                                              <span className="pl-5">
                                                {make.map((x) => {
                                                  if (item.make_id == x.id) {
                                                    return x.make_name;
                                                  } else {
                                                    return null;
                                                  }
                                                })}
                                              </span>
                                            </td>

                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Model Name
                                              </span>{" "}
                                              <span className="pl-5">
                                                {model.map((x) => {
                                                  if (item.model_id == x.id) {
                                                    return x.model_name;
                                                  } else {
                                                    return null;
                                                  }
                                                })}
                                              </span>
                                            </td>

                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Serial Number
                                              </span>{" "}
                                              <span className="pl-5">
                                                {serilaNo.map((x) => {
                                                  if (
                                                    item.serialno_id == x.id
                                                  ) {
                                                    return x.serial_no;
                                                  } else {
                                                    return null;
                                                  }
                                                })}
                                              </span>
                                            </td>

                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Problem Statement
                                              </span>{" "}
                                              <span className="pl-5">
                                                {item.problem_statement}
                                              </span>
                                            </td>

                                            <td>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Call Action
                                              </span>{" "}
                                              <span className="pl-5">
                                                {item.call_action}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<LocalPrintshopIcon />}
                                style={{ marginTop: 10 }}
                                className="print-button"
                                onClick={() => window.print()}
                              >
                                Print
                              </Button>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Reports;
