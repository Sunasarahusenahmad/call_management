import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "@mui/material";

// React Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../Redux/UserReducer";

const Alluser = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");
  const user = sessionStorage.getItem("user");

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
      navigate("/admin", { replace: true });
    }
  };

  // Store the Data in State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  // Add or Edit Institute
  const savedata = async (e) => {
    e.preventDefault();

    const group = {
      username: username,
      password: password,
      name: name,
      userEmail: userEmail,
      mobile: mobile,
      instituteId: instituteId,
      departmentId: departmentId,
    };

    if (
      !username ||
      !password ||
      !name ||
      !userEmail ||
      !mobile ||
      !instituteId ||
      !departmentId
    ) {
      window.alert("please fill-up all fields");
    } else {
      try {
        // Check if username exists
        const response = await axios.post(
          `${process.env.REACT_APP_PROXY_URL}/checkuserlogin`,
          {
            username: username,
          }
        );
        if (response.data.exists) {
          window.alert(`${username} Username is already exists!`);
        } else {
          await axios
            .post(`${process.env.REACT_APP_PROXY_URL}/adduser`, group)
            .then((res) => {
              window.alert("User Added successful!");
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Get User Data
  // const [users, setUser] = useState([]);

  // const getUser = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_PROXY_URL}/getuser`);
  //     setUser(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  useEffect(() => {
    if (instituteId) {
      getSelectedDepartments();
    }
    getInstitute();
    // getUser();
  }, [instituteId]);

  // status code

  const updateStatus = async (userId, status) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_PROXY_URL}/updatestatus/${userId}`,
        { status }
      );
      if (res) {
        window.location.reload();
        // You can reload the user data or update the specific user's status in the state.
      } else {
        console.log("Error updating user status");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Trash (delete) Make Records
  const trashUser = async (id) => {
    try {
      if (window.confirm("Are you sure you want to remove this User")) {
        const res = await axios.delete(
          `${process.env.REACT_APP_PROXY_URL}/trashuser/${id}`
        );
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

  // Pagination And Search Bar

  const [searchFilter, setSearchFilter] = useState("");

  const filteredData = users.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchFilter) ||
      item.username.toLowerCase().includes(searchFilter) ||
      item.email.toLowerCase().includes(searchFilter)
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                    <h1 className="h3 mb-0 text-gray-bold">User</h1>
                  </div>

                  {/*  <!-- Form And Table Row --> */}
                  <div className="row">
                    {/*   <!-- Institutes Records --> */}
                    <div className="col-xl-8 col-lg-7">
                      <div className="card shadow mb-4">
                        {/*  <!-- Header and Action Icon - Dropdown --> */}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">
                            All User
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
                                  <th scope="col">ID</th>
                                  <th>Name</th>
                                  <th>{!user ? "Username" : ""}</th>
                                  <th>{!user ? "Password" : ""}</th>
                                  <th>Email</th>
                                  <th>{!user ? "Action" : ""}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredData.length > 0 ? (
                                  currentItems.map((item, idx) => {
                                    return (
                                      <tr className="institute">
                                        <td>{item.id}</td>
                                        <td>
                                          {item.name}
                                          <p
                                            className="p-0 m-0 tred "
                                            style={{ fontSize: "14px" }}
                                          >
                                            <div className="d-flex">
                                              {!user && (
                                                <>
                                                  <Link
                                                    to={"/edituser"}
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
                                                      trashUser(item.id);
                                                    }}
                                                  >
                                                    &nbsp;Trash{" "}
                                                  </p>
                                                </>
                                              )}
                                            </div>
                                          </p>
                                        </td>
                                        <td>{!user ? item.username : ""}</td>
                                        <td>{!user ? item.password : ""}</td>
                                        <td>{item.email}</td>

                                        {/* <td>
                                        <label className="toggle-switch">
                                          <input
                                            type="checkbox"
                                            checked={item.status === 1}
                                            onChange={() =>
                                              updateStatus(
                                                item.id,
                                                item.status === 1 ? 0 : 1
                                              )
                                            }
                                          />
                                          <span
                                            className="slider round"
                                            title={
                                              item.status === 1
                                                ? "Approve"
                                                : "Disapprove"
                                            }
                                          ></span>
                                        </label>
                                      </td> */}

                                        {!user ? (
                                          <td>
                                            <label className="toggle-switch">
                                              <input
                                                type="checkbox"
                                                checked={item.status === 1}
                                                onChange={() =>
                                                  updateStatus(
                                                    item.id,
                                                    item.status === 1 ? 0 : 1
                                                  )
                                                }
                                              />
                                              {item.status === 1 ? (
                                                <span
                                                  className="text-success pl-2"
                                                  onClick={() =>
                                                    updateStatus(item.id, 0)
                                                  }
                                                >
                                                  Approve
                                                </span>
                                              ) : (
                                                <span
                                                  className="text-danger pl-2"
                                                  onClick={() =>
                                                    updateStatus(item.id, 1)
                                                  }
                                                >
                                                  Disapprove
                                                </span>
                                              )}
                                            </label>
                                          </td>
                                        ) : (
                                          ""
                                        )}
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
                              onChange={(event, page) => handlePageChange(page)}
                              color="primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*  <!-- Institute Form --> */}
                    <div className="col-xl-4 col-lg-5">
                      <div className="card shadow mb-4">
                        {/*  <!-- Institute Header - Dropdown --> */}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">
                            Add User
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
                          <form onSubmit={savedata}>
                            <div class="form-group">
                              <label for="name">Name</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              />
                            </div>

                            <div class="form-group">
                              <label for="name">User Email</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter User Email"
                                value={userEmail}
                                onChange={(e) => {
                                  setUserEmail(e.target.value);
                                }}
                              />
                            </div>

                            <div class="form-group">
                              <label for="name">User Mobile</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter User Mobile No"
                                value={mobile}
                                onChange={(e) => {
                                  setMobile(e.target.value);
                                }}
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
                            </div>

                            <div class="form-group">
                              <label for="name">User Name</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter User Name"
                                value={username}
                                onChange={(e) => {
                                  setUsername(e.target.value);
                                }}
                              />
                            </div>

                            <div class="form-group">
                              <label for="name">Password</label>
                              <input
                                type="password"
                                class="form-control"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                              />
                            </div>

                            <input
                              type="submit"
                              value={"Submit"}
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

export default Alluser;
