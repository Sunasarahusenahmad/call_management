import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// React Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../Redux/UserReducer";

const AllCall = () => {
  // get user records
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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

  // to set the email information
  const [open, setOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminService, setAdminServiece] = useState("");
  // to set the whatsapp message details
  // const [twilioAccountSid, setTwilioAccountSid] = useState("");
  // const [twilioAuthToken, setTwilioAuthToken] = useState("");

  const handleClickOpen = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY_URL}/getmail`);
      setAdminEmail(res.data[0].admin_email);
      setAdminPassword(res.data[0].admin_password);
      setAdminServiece(res.data[0].admin_service);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateEPS = async (e) => {
    try {
      await axios.post(`${process.env.REACT_APP_PROXY_URL}/updatesetmail`, {
        admin_email: adminEmail,
        admin_password: adminPassword,
        admin_service: adminService,
      });

      setOpen(false);
    } catch (error) {
      console.log(error);
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

  // clock time

  const calculateTimeDistance = (start, end) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const distance = endTime - startTime;

    // Calculate total hours
    const totalHours = Math.floor(distance / (1000 * 60 * 60));

    return `${totalHours} hours`;
  };

  const saveCurrentTime = async (id) => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");

      const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      if (
        window.confirm(
          `This Call Details Is Completely Over on this Time : ${currentDateTime}`
        )
      ) {
        const res = await axios.post(
          `${process.env.REACT_APP_PROXY_URL}/addclocktime`,
          {
            id,
            time: currentDateTime,
          }
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [department, setDepartment] = useState([]);

  const getDepartment = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getdepartment`
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
        `${process.env.REACT_APP_PROXY_URL}/getmodel`
      );
      setModel(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get serialno
  const [sno, setSno] = useState([]);
  const getSno = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getserialno`
      );
      setSno(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get users records
  // const [users, setUser] = useState([]);

  // const getUser = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_PROXY_URL}/getuser`);
  //     setUser(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getCall();
    getDepartment();
    getInstitute();
    getCalltype();
    getMake();
    getModel();
    getSno();
    // getUser();
  }, []);

  // Trash (delete) Call details Records
  const trashCallDetails = async (id) => {
    try {
      if (window.confirm("Are you sure you want to remove this Call Detail")) {
        const res = await axios.delete(
          `${process.env.REACT_APP_PROXY_URL}/trashcall/${id}`
        );
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

  // Pagination and Search

  const [searchFilter, setSearchFilter] = useState("");

  const filteredData = call.filter((item) => {
    const query = searchFilter.toLowerCase();
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
      instituteName.toLowerCase().includes(query) ||
      departmentName.toLowerCase().includes(query) ||
      calltypeName.toLowerCase().includes(query) ||
      makeName.toLowerCase().includes(query) ||
      modelName.toLowerCase().includes(query) ||
      serilaNo.toLowerCase().includes(query)
    );
  });

  // filtered user data
  const filteredData1 = call.filter((item) => {
    const query = searchFilter.toLowerCase();
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
      item.user_id == userId &&
      (instituteName.toLowerCase().includes(query) ||
        departmentName.toLowerCase().includes(query) ||
        calltypeName.toLowerCase().includes(query) ||
        makeName.toLowerCase().includes(query) ||
        modelName.toLowerCase().includes(query) ||
        serilaNo.toLowerCase().includes(query))
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems1 = filteredData1.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Set Admin Email, Password and Service</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                size="small"
                label="Email"
                type="email"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                label="Password"
                type="password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                size="small"
                label="Serviece"
                type="text"
                value={adminService}
                onChange={(event) => setAdminServiece(event.target.value)}
                required
                fullWidth
                margin="normal"
              />

              {/* <p>Whatsapp Message Set Information</p>
            <TextField
              size="small"
              label="Whatsapp Account SID"
              type="text"
              value={twilioAccountSid}
              onChange={(event) => setTwilioAccountSid(event.target.value)}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              size="small" 
              label="Whatsapp Auth Token"
              type="text"
              value={twilioAuthToken}
              onChange={(event) => setTwilioAuthToken(event.target.value)}
              required
              fullWidth
              margin="normal"
            /> */}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  type="submit"
                  onClick={handleUpdateEPS}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

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
                        value={searchFilter}
                        onChange={(e) => {
                          setSearchFilter(e.target.value);
                        }}
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
                              value={searchFilter}
                              onChange={(e) => {
                                setSearchFilter(e.target.value);
                              }}
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
                        <a
                          className="dropdown-item"
                          href=""
                          // onClick={handleOpenDialog}
                        >
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
                    <h1 className="h3 mb-0 text-gray-bold">Call Details</h1>
                    <div className="row">
                      {!user && (
                        <>
                          <p
                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                            onClick={handleClickOpen}
                          >
                            <i className="bi bi-telephone-plus fa-sm text-white-50"></i>{" "}
                            Set Email
                          </p>
                        </>
                      )}
                      <NavLink to={"/addcall"}>
                        <p className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-2">
                          <i className="bi bi-telephone-plus fa-sm text-white-50"></i>{" "}
                          Add Call Details
                        </p>
                      </NavLink>
                    </div>
                  </div>

                  {/*  <!-- Form And Table Row --> */}
                  <div className="row">
                    {email && (
                      <>
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
                                      <th>Institute</th>
                                      <th>Department</th>
                                      <th>Call Type</th>
                                      <th>User / Admin</th>
                                      {/* <th>Make</th>
                                      <th>Model</th>
                                      <th>Serial No</th> */}
                                      <th>Action</th>
                                      <th>Call</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filteredData.length > 0 ? (
                                      currentItems.map((item, idx) => {
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
                                                if (
                                                  item.institute_id === x.id
                                                ) {
                                                  return x.institute_name;
                                                }
                                              })}
                                              <p
                                                className="p-0 m-0 tred"
                                                style={{ fontSize: "14px" }}
                                              >
                                                <div className="d-flex">
                                                  {!user && (
                                                    <>
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
                                                          trashCallDetails(
                                                            item.id
                                                          );
                                                        }}
                                                      >
                                                        &nbsp;Trash{" "}
                                                      </p>
                                                    </>
                                                  )}
                                                </div>
                                              </p>
                                            </td>

                                            <td>
                                              {department.map((x) => {
                                                if (
                                                  item.department_id == x.id
                                                ) {
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
                                              {users.find(
                                                (x) => item.user_id == x.id
                                              )
                                                ? users.map((x) => {
                                                    if (item.user_id == x.id) {
                                                      return x.name;
                                                    }
                                                    return null; // Return null for non-matching entries
                                                  })
                                                : "Admin"}
                                            </td>

                                            {/* <td>
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
                                            </td> */}

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

                                            <td>
                                              <button
                                                className={`btn ${
                                                  item.status == 0
                                                    ? "btn-danger"
                                                    : item.status == 1
                                                    ? "btn-primary"
                                                    : "btn-success"
                                                }`}
                                                onClick={() => {
                                                  if (item.status == 2) {
                                                    saveCurrentTime(item.id);
                                                  }
                                                }}
                                                style={{
                                                  cursor:
                                                    item.status == 0
                                                      ? "not-allowed"
                                                      : item.status == 1
                                                      ? "not-allowed"
                                                      : "cursor",
                                                }}
                                                disabled={
                                                  item.status === 2 &&
                                                  item.ending_at &&
                                                  item.ending_at.length > 0
                                                }
                                              >
                                                {item.status == 0
                                                  ? "Pending"
                                                  : item.status == 1
                                                  ? "In Progress"
                                                  : "Closed"}
                                              </button>{" "}
                                              <br />
                                              <p
                                                className="m-0 pt-2 tred"
                                                style={{
                                                  fontSize: "14px",
                                                }}
                                              >
                                                <b>Total :</b>{" "}
                                                {item.status === 2 &&
                                                item.ending_at &&
                                                item.ending_at.length > 0
                                                  ? calculateTimeDistance(
                                                      item.created_at,
                                                      item.ending_at
                                                    )
                                                  : ""}
                                              </p>
                                              {/* <small
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  handleCheckDetailClick(item)
                                                }
                                              >
                                                Check Detail
                                              </small> */}
                                            </td>
                                            {/* <Dialog
                                              open={isBoxOpen}
                                              onClose={() =>
                                                setIsBoxOpen(false)
                                              }
                                            >
                                              {item && (
                                                <>
                                                  <DialogTitle>
                                                    Clock Details
                                                    <IconButton
                                                      aria-label="close"
                                                      onClick={() =>
                                                        setIsBoxOpen(false)
                                                      }
                                                      sx={{
                                                        position: "absolute",
                                                        right: 8,
                                                        top: 8,
                                                      }}
                                                    >
                                                      <CloseIcon />
                                                    </IconButton>
                                                  </DialogTitle>
                                                  <DialogContent>
                                                    <p>
                                                      Call ID:{" "}
                                                      {item.id}
                                                    </p>
                                                    <p
                                                      className="m-0 p-0 tred"
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      {new Date(
                                                        item.created_at
                                                      ).toLocaleTimeString()}{" "}
                                                      -
                                                      {item.clock_id ==
                                                      1
                                                        ? new Date(
                                                            item.ending_at
                                                          ).toLocaleTimeString()
                                                        : ""}
                                                    </p>
                                                    <p
                                                      className="m-0 pt-2 tred"
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      <b>Total Distance :</b>{" "}
                                                      {item.clock_id ==
                                                      1
                                                        ? calculateTimeDistance(
                                                            item.created_at,
                                                            item.ending_at
                                                          )
                                                        : ""}
                                                    </p>
                                                  </DialogContent>
                                                  <DialogActions>
                                                    <Button
                                                      onClick={() =>
                                                        setIsBoxOpen(false)
                                                      }
                                                    >
                                                      Close
                                                    </Button>
                                                  </DialogActions>
                                                </>
                                              )}
                                            </Dialog> */}
                                          </tr>
                                        );
                                      })
                                    ) : (
                                      <tr>
                                        <td colSpan={2}>
                                          <p>No Records Found</p>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {user && (
                      <>
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
                              <div className="table-responsive">
                                <table className="table" width="100%">
                                  <thead>
                                    <tr style={{ cursor: "pointer" }}>
                                      {/* <th scope="col">Images</th> */}
                                      <th scope="col">ID</th>
                                      <th>Institute</th>
                                      <th>Department</th>
                                      <th>Problem Statement</th>
                                      <th>Call</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filteredData1.length > 0 ? (
                                      currentItems1.map((item, idx) => {
                                        return item.user_id == userId ? (
                                          <>
                                            <tr className="institute" key={idx}>
                                              <td>{item.id}</td>
                                              <td>
                                                {institute.map((x) => {
                                                  if (
                                                    item.institute_id === x.id
                                                  ) {
                                                    return x.institute_name;
                                                  }
                                                })}
                                                <p
                                                  className="p-0 m-0 tred"
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  <div className="d-flex">
                                                    {!user && (
                                                      <>
                                                        <Link
                                                          to={"/editcall"}
                                                          state={{
                                                            id: item.id,
                                                          }}
                                                          className="text-decoration-none"
                                                        >
                                                          <p className="p-0 m-0">
                                                            Edit |
                                                          </p>
                                                        </Link>
                                                        <p
                                                          className="text-danger p-0 m-0"
                                                          onClick={() => {
                                                            trashCallDetails(
                                                              item.id
                                                            );
                                                          }}
                                                        >
                                                          &nbsp;Trash{" "}
                                                        </p>
                                                      </>
                                                    )}
                                                  </div>
                                                </p>
                                              </td>
                                              <td>
                                                {department.map((x) => {
                                                  if (
                                                    item.department_id == x.id
                                                  ) {
                                                    return x.department_name;
                                                  }
                                                })}
                                              </td>
                                              <td>{item.problem_statement}</td>
                                              <td>
                                                <button
                                                  className={`btn ${
                                                    item.status == 0
                                                      ? "btn-danger"
                                                      : item.status == 1
                                                      ? "btn-primary"
                                                      : "btn-success"
                                                  }`}
                                                  style={{
                                                    cursor:
                                                      item.status == 0
                                                        ? "not-allowed"
                                                        : item.status == 1
                                                        ? "not-allowed"
                                                        : "not-allowed",
                                                  }}
                                                >
                                                  {item.status == 0
                                                    ? "Pending"
                                                    : item.status == 1
                                                    ? "In Progress"
                                                    : "Closed"}
                                                </button>{" "}
                                                <br />
                                                <p
                                                  className="m-0 pt-2 tred"
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  <b>Total :</b>{" "}
                                                  {item.status === 2 &&
                                                  item.ending_at &&
                                                  item.ending_at.length > 0
                                                    ? calculateTimeDistance(
                                                        item.created_at,
                                                        item.ending_at
                                                      )
                                                    : ""}
                                                </p>
                                              </td>
                                            </tr>
                                          </>
                                        ) : null;
                                      })
                                    ) : (
                                      <tr>
                                        <td colSpan={2}>
                                          <p>No Records Found</p>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                                <Pagination
                                  page={currentPage}
                                  count={Math.ceil(
                                    filteredData1.length / itemsPerPage
                                  )}
                                  onChange={(event, page) =>
                                    handlePageChange(page)
                                  }
                                  color="primary"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
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
