import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Pagination from "react-js-pagination";
import Pagination from '@mui/material/Pagination';

const AllCall = () => {
  const navigate = useNavigate();

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
      const res = await axios.get("/getcall");
      setCall(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Department Data
  const [department, setDepartment] = useState([]);

  const getDepartment = async () => {
    try {
      const res = await axios.get("/getdepartment");
      setDepartment(res.data);
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

  // Get Call type Data
  const [calltype, setCalltype] = useState([]);

  const getCalltype = async () => {
    try {
      const res = await axios.get("/getcalltype");
      setCalltype(res.data);
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

  const getModel = async () => {
    try {
      const res = await axios.get("/getmodel");
      setModel(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get serialno
  const [sno, setSno] = useState([]);
  const getSno = async () => {
    try {
      const res = await axios.get("/getserialno");
      setSno(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCall();
    getDepartment();
    getInstitute();
    getCalltype();
    getMake();
    getModel();
    getSno();
  }, []);

  // Trash (delete) Call details Records
  const trashCallDetails = async (id) => {
    try {
      if (window.confirm("Are you sure you want to remove this Call Detail")) {
        const res = await axios.delete(`/trashcall/${id}`);
        window.location.reload();
        getCall();
      }
    } catch (error) {
      console.log(error.response.data.error);
      window.alert("This Category is Already exist in another Table");
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
  // End of Sorting Up - Down Arrow

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value;
    const filteredData = call.filter((item) => {
      const instituteName =
        institute.find((x) => x.id === item.institute_id)?.institute_name || "";
      const departmentName =
        department.find((x) => x.id === item.department_id)?.department_name ||
        "";
      const calltypeName =
        calltype.find((x) => x.id === item.calltype_id)?.call_type || "";
      const makeName = make.find((x) => x.id === item.make_id)?.make_name || "";
      const modelName =
        model.find((x) => x.id === item.model_id)?.model_name || "";
      const serilaNo =
        sno.find((x) => x.id === item.serialno_id)?.serial_no || "";
      return (
        instituteName.toLowerCase().includes(query.toLowerCase()) ||
        departmentName.toLowerCase().includes(query.toLowerCase()) ||
        calltypeName.toLowerCase().includes(query.toLowerCase()) ||
        makeName.toLowerCase().includes(query.toLowerCase()) ||
        modelName.toLowerCase().includes(query.toLowerCase()) ||
        serilaNo.toLowerCase().includes(query.toLowerCase())
      );
    });
    setSearchQuery(query);
    setFilteredData(filteredData);
  };

  // searched records pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // normally records pagination
  const [currentPages, setCurrentPages] = useState(1);
  const [itemsPerPages] = useState(5);

  const indexOfLastItems = currentPages * itemsPerPages;
  const indexOfFirstItems = indexOfLastItems - itemsPerPages;

  const currentItem = call.slice(indexOfFirstItems, indexOfLastItems);

  const handlePageChanges = (pageNumber) => {
    setCurrentPages(pageNumber);
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
                        value={searchQuery}
                        onChange={handleSearch}
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
                              value={searchQuery}
                              onChange={handleSearch}
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
                    <ToastContainer />

                    {/*   <!-- Institutes Records --> */}
                    <div className="col-xl-12 col-lg-12">
                      <div className="card shadow mb-4">
                        {/*  <!-- Header and Action Icon - Dropdown --> */}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">
                            All Call Details
                          </h6>
                        </div>
                        {/*  <!-- Table Body --> */}
                        <div
                          className="card-body"
                          style={{
                            fontFamily: "Signika Negative",
                            fontSize: "15px",
                          }}
                        >
                          <div class="table-responsive">
                            <table class="table" width="100%">
                              <thead>
                                <tr style={{ cursor: "pointer" }}>
                                  {/* <th scope="col">Images</th> */}
                                  <th scope="col">ID</th>
                                  <th onClick={toggleSortDirection}>
                                    Institute
                                    <span>
                                      {sortDirection === "asc" ? (
                                        <i class="bi bi-arrow-up"></i>
                                      ) : (
                                        <i class="bi bi-arrow-down"></i>
                                      )}
                                    </span>
                                  </th>
                                  <th onClick={toggleSortDirection}>
                                    Department
                                    <span>
                                      {sortDirection === "asc" ? (
                                        <i class="bi bi-arrow-up"></i>
                                      ) : (
                                        <i class="bi bi-arrow-down"></i>
                                      )}
                                    </span>
                                  </th>
                                  <th onClick={toggleSortDirection}>
                                    Call Type
                                    <span>
                                      {sortDirection === "asc" ? (
                                        <i class="bi bi-arrow-up"></i>
                                      ) : (
                                        <i class="bi bi-arrow-down"></i>
                                      )}
                                    </span>
                                  </th>
                                  <th onClick={toggleSortDirection}>
                                    Make
                                    <span>
                                      {sortDirection === "asc" ? (
                                        <i class="bi bi-arrow-up"></i>
                                      ) : (
                                        <i class="bi bi-arrow-down"></i>
                                      )}
                                    </span>
                                  </th>
                                  <th onClick={toggleSortDirection}>
                                    Model
                                    <span>
                                      {sortDirection === "asc" ? (
                                        <i class="bi bi-arrow-up"></i>
                                      ) : (
                                        <i class="bi bi-arrow-down"></i>
                                      )}
                                    </span>
                                  </th>
                                  <th onClick={toggleSortDirection}>
                                    Serial No
                                    <span>
                                      {sortDirection === "asc" ? (
                                        <i class="bi bi-arrow-up"></i>
                                      ) : (
                                        <i class="bi bi-arrow-down"></i>
                                      )}
                                    </span>
                                  </th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredData.length > 0
                                  ? currentItems.map((item, idx) => {
                                      return (
                                        <tr className="institute">
                                          {/* <td>
                                            {item.images.length > 0 ? (
                                              item.images
                                                .split(",")
                                                .map((image, index) => (
                                                  <img
                                                    key={index}
                                                    src={`/uploads/${image}`}
                                                    alt=""
                                                    style={{
                                                      width: "50px",
                                                      height: "50px",
                                                    }}
                                                  />
                                                ))
                                            ) : (
                                              <span>
                                                <img
                                                  src={`/uploads/noimage.png`}
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                  }}
                                                  alt="No Image"
                                                />
                                              </span>
                                            )}
                                          </td> */}
                                          <td>{item.id}</td>
                                          <td>
                                            {institute.map((x) => {
                                              if (item.institute_id == x.id) {
                                                return x.institute_name;
                                              }
                                            })}
                                            <p
                                              className="p-0 m-0 tred "
                                              style={{ fontSize: "14px" }}
                                            >
                                              <div className="d-flex">
                                                <Link
                                                  to={"/editcall"}
                                                  state={{ id: item.id }}
                                                  className="text-decoration-none"
                                                >
                                                  <p className="p-0 m-0">
                                                    Edit |{" "}
                                                  </p>
                                                </Link>
                                                <p
                                                  className="text-danger p-0 m-0"
                                                  onClick={() => {
                                                    trashCallDetails(item.id);
                                                  }}
                                                >
                                                  &nbsp;Trash{" "}
                                                </p>
                                              </div>
                                            </p>
                                          </td>
                                          <td>
                                            {department.map((x) => {
                                              if (item.department_id == x.id) {
                                                return x.department_name;
                                              }
                                            })}
                                          </td>
                                          <td>
                                            {calltype.map((x) => {
                                              if (item.calltype_id == x.id) {
                                                return x.call_type;
                                              }
                                            })}
                                          </td>

                                          <td>
                                            {make.map((x) => {
                                              if (item.make_id == x.id) {
                                                return x.make_name;
                                              }
                                            })}
                                          </td>

                                          <td>
                                            {model.map((x) => {
                                              if (item.model_id == x.id) {
                                                return x.model_name;
                                              }
                                            })}
                                          </td>

                                          <td>
                                            {sno.map((x) => {
                                              if (item.serialno_id == x.id) {
                                                return x.serial_no;
                                              }
                                            })}
                                          </td>

                                          <td>
                                            <span data-toggle="tooltip">
                                              <Link
                                                to={"/sendmail"}
                                                state={{ id: item.id }}
                                                className="text-decoration-none"
                                              >
                                                <i class="bi bi-envelope"></i>
                                              </Link>
                                            </span>

                                            <span
                                              className="pl-4"
                                              data-toggle="tooltip"
                                            >
                                              <Link
                                                to={"/generatereport"}
                                                state={{ id: item.id }}
                                                className="text-decoration-none"
                                              >
                                                <i class="bi bi-file-earmark-text"></i>
                                              </Link>
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  : currentItem.map((item, idx) => {
                                      return (
                                        <tr className="institute">
                                          {/* <td>
                                            {item.images.length > 0 ? (
                                              item.images
                                                .split(",")
                                                .map((image, index) => (
                                                  <img
                                                    key={index}
                                                    src={`/uploads/${image}`}
                                                    alt=""
                                                    style={{
                                                      width: "50px",
                                                      height: "50px",
                                                    }}
                                                  />
                                                ))
                                            ) : (
                                              <span>
                                                <img
                                                  src={`/uploads/noimage.png`}
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                  }}
                                                  alt="No Image"
                                                />
                                              </span>
                                            )}
                                          </td> */}
                                          <td>{item.id}</td>
                                          <td>
                                            {institute.map((x) => {
                                              if (item.institute_id == x.id) {
                                                return x.institute_name;
                                              }
                                            })}
                                            <p
                                              className="p-0 m-0 tred "
                                              style={{ fontSize: "14px" }}
                                            >
                                              <div className="d-flex">
                                                <Link
                                                  to={"/editcall"}
                                                  state={{ id: item.id }}
                                                  className="text-decoration-none"
                                                >
                                                  <p className="p-0 m-0">
                                                    Edit |{" "}
                                                  </p>
                                                </Link>
                                                <p
                                                  className="text-danger p-0 m-0"
                                                  onClick={() => {
                                                    trashCallDetails(item.id);
                                                  }}
                                                >
                                                  &nbsp;Trash{" "}
                                                </p>
                                              </div>
                                            </p>
                                          </td>
                                          <td>
                                            {department.map((x) => {
                                              if (item.department_id == x.id) {
                                                return x.department_name;
                                              }
                                            })}
                                          </td>
                                          <td>
                                            {calltype.map((x) => {
                                              if (item.calltype_id == x.id) {
                                                return x.call_type;
                                              }
                                            })}
                                          </td>

                                          <td>
                                            {make.map((x) => {
                                              if (item.make_id == x.id) {
                                                return x.make_name;
                                              }
                                            })}
                                          </td>

                                          <td>
                                            {model.map((x) => {
                                              if (item.model_id == x.id) {
                                                return x.model_name;
                                              }
                                            })}
                                          </td>

                                          <td>
                                            {sno.map((x) => {
                                              if (item.serialno_id == x.id) {
                                                return x.serial_no;
                                              }
                                            })}
                                          </td>

                                          <td>
                                            <span data-toggle="tooltip">
                                              <Link
                                                to={"/sendmail"}
                                                state={{ id: item.id }}
                                                className="text-decoration-none"
                                              >
                                                <i class="bi bi-envelope"></i>
                                              </Link>
                                            </span>

                                            <span
                                              className="pl-4"
                                              data-toggle="tooltip"
                                            >
                                              <Link
                                                to={"/generatereport"}
                                                state={{ id: item.id }}
                                                className="text-decoration-none"
                                              >
                                                <i class="bi bi-file-earmark-text"></i>
                                              </Link>
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                              </tbody>
                            </table>

                            {filteredData.length > 0 ? (
                              <Pagination
                                page={currentPage}
                                count={Math.ceil(
                                  filteredData.length / itemsPerPage
                                )}
                                onChange={(event, page) =>
                                  handlePageChange(page)
                                }
                                color="primary"
                              />
                            ) : (
                              <Pagination
                                page={currentPages}
                                count={Math.ceil(call.length / itemsPerPages)}
                                onChange={(event, page) =>
                                  handlePageChanges(page)
                                }
                                color="primary"
                              />
                            )}

                            {/* {filteredData.length > 0 ? (
                              <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={itemsPerPage}
                                totalItemsCount={filteredData.length}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                              />
                            ) : (
                              <Pagination
                                activePage={currentPages}
                                itemsCountPerPage={itemsPerPages}
                                totalItemsCount={call.length}
                                pageRangeDisplayed={5}
                                onChange={handlePageChanges}
                                itemClass="page-item"
                                linkClass="page-link"
                              />
                            )} */}
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
      </div>
    </>
  );
};

export default AllCall;
