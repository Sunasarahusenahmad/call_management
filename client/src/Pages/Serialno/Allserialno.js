import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allserialno = () => {

  const navigate = useNavigate();

    const email = sessionStorage.getItem("email");

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('email');
        if (!isLoggedIn) {
            navigate('/admin', { replace: true });
        }

        
    }, [navigate]);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to Logout")) {
            // Clear the session
            sessionStorage.removeItem('email');
            navigate('/admin', { replace: true });
        }
    };

  // Store the Data in State
  const [serialno, setSerialno] = useState("");
  const [modelId, setModelId] = useState("");
  const [makeId, setMakeId] = useState("");

  // Add or Edit serialno
  const savedata = async (e) => {
    e.preventDefault();

    const group = {
      serialno: serialno,
      modelId: modelId,
      makeId: makeId,
    }


    if (!serialno || !modelId || !makeId) {
      toast.error('please fill-up all fields');
    } else {
      try {
        // Check if serial number exists
        const response = await axios.post("/checkserialno", { serialno: serialno });
        if (response.data.exists) {
          toast.error(`${serialno} Serial number already exists!`);
        } else {
          // Serial number does not exist, save it
          await axios.post("/addserialno", group)
            .then((res) => {
              console.log(res);
              toast.success('Serial number added successfully!');
              window.location.reload();
            }).catch((err) => {
              console.log(err);
            });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }


  // get serialno and per serialno
  const [sno, setSno] = useState([]);
  const getSno = async () => {
    try {
      const res = await axios.get("/getserialno");
      setSno(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Get Make Data
  const [make, setMake] = useState([]);

  const getMake = async () => {
    try {
      const res = await axios.get("/getmake");
      setMake(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Get Model Data
  const [md, setMd] = useState([]);

  const getModel = async () => {
    try {
      const res = await axios.get(`/getmodel`);
      setMd(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Get Model Data
  const [model, setModel] = useState([]);

  const getSelectedModels = async () => {
    try {
      const res = await axios.get(`/selectedModels/${makeId}`);
      setModel(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSno();
    if (makeId) {
      getSelectedModels();
    }
    getMake();
    getModel();
  }, [makeId])

  // Trash (delete) Department Records
  const trashSerialno = async (id) => {
    try {
      if (window.confirm("Are you sure you want to remove this Serial No")) {
        const res = await axios.delete(`/trashserialno/${id}`);
        window.location.reload();
        getSno();
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error('This Category is Already exist in another Table');
    }
  }

  // Toggle Icons Click Events
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

  const changeStyle = () => {
    if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
    }
    else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    }
  };
  const changeStyle1 = () => {
    if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
    }
    else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    }
  };
  // End of Toggle Icons Click Events

  // Sorting Up - Down Arrow
  const [sortDirection, setSortDirection] = useState('asc');

  const toggleSortDirection = () => {
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);
  };
  // End of Sorting Up - Down Arrow

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
                                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
                                        <i className="fa fa-bars"></i>
                                    </button>

                                    {/*  <!-- Topbar Search --> */}
                                    <form
                                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                        <div className="input-group">
                                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                                aria-label="Search" aria-describedby="basic-addon2" />
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
                                            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-search fa-fw"></i>
                                            </a>
                                            {/*   <!-- Dropdown - Messages --> */}
                                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                                aria-labelledby="searchDropdown">
                                                <form className="form-inline mr-auto w-100 navbar-search">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control bg-light border-0 small"
                                                            placeholder="Search for..." aria-label="Search"
                                                            aria-describedby="basic-addon2" />
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
                                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Welcome, {email}</span>
                                                <img className="img-profile rounded-circle"
                                                    src="img/undraw_profile.svg" />
                                            </a>
                                            {/*  <!-- Dropdown - User Information --> */}
                                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="userDropdown">
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
                                                <a className="dropdown-item" href=""
                                                    onClick={handleLogout}>
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
                    <h1 className="h3 mb-0 text-gray-bold">Serial No</h1>
                  </div>

                  {/*  <!-- Form And Table Row --> */}
                  <div className="row">

                    <ToastContainer />

                    {/*   <!-- Institutes Records --> */}
                    <div className="col-xl-8 col-lg-7">
                      <div className="card shadow mb-4">
                        {/*  <!-- Header and Action Icon - Dropdown --> */}
                        <div
                          className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">All Serial No</h6>
                        </div>
                        {/*  <!-- Table Body --> */}
                        <div className="card-body" style={{ fontFamily: 'Signika Negative', fontSize: '15px' }}>
                          <div class="table-responsive">
                            <table class="table" id="dataTable" width="100%">
                              <thead>
                                <tr style={{ cursor: 'pointer' }}>
                                  <th scope="col">ID</th>
                                  <th onClick={toggleSortDirection}>Serial No <span>
                                    {sortDirection === 'asc' ? <i class="bi bi-arrow-up"></i> : <i class="bi bi-arrow-down"></i>}
                                  </span></th>
                                  <th onClick={toggleSortDirection} >Model <span>
                                    {sortDirection === 'asc' ? <i class="bi bi-arrow-up"></i> : <i class="bi bi-arrow-down"></i>}
                                  </span></th>
                                  <th onClick={toggleSortDirection} >Make (Company)  <span>
                                    {sortDirection === 'asc' ? <i class="bi bi-arrow-up"></i> : <i class="bi bi-arrow-down"></i>}
                                  </span></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  sno.map((item, idx) => {
                                    return (
                                      <tr className="institute">
                                        <td>{idx + 1}</td>
                                        <td>
                                          {item.serial_no}
                                          <p className="p-0 m-0 tred " style={{ fontSize: '14px' }}>
                                            <div className="d-flex">

                                              <Link to={'/editserialno'} state={{ id: item.id }} className='text-decoration-none'><p className="p-0 m-0">Edit | </p></Link>
                                              <p className="text-danger p-0 m-0" onClick={() => { trashSerialno(item.id) }}>&nbsp;Trash </p>
                                            </div>
                                          </p>
                                        </td>
                                        <td>
                                          {
                                            md.map((x) => {
                                              if (item.model_id == x.id) {
                                                return x.model_name
                                              }
                                            })
                                          }
                                        </td>
                                        <td>
                                          {
                                            make.map((x) => {
                                              if (item.make_id == x.id) {
                                                return x.make_name
                                              }
                                            })
                                          }
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*  <!-- Institute Form --> */}
                    <div className="col-xl-4 col-lg-5">
                      <div className="card shadow mb-4">
                        {/*  <!-- Institute Header - Dropdown --> */}
                        <div
                          className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">Add Serial no</h6>
                        </div>
                        {/*  <!-- Form Body --> */}
                        <div className="card-body" style={{ fontFamily: 'Signika Negative', fontSize: '15px' }}>
                          <form onSubmit={savedata}>

                            <div class="form-group">
                              <label for="name">Serial No</label>
                              <input type="text" class="form-control" placeholder="Enter Serial No" value={serialno}
                                onChange={(e) => { setSerialno(e.target.value) }} />
                            </div>

                            <div class="form-group">
                              <label for="website">Select Make (Company) </label>
                              <select className="form-control" value={makeId} onChange={(e) => { setMakeId(e.target.value) }} aria-label="Select option">
                                <option defaultValue>Select Make (Company) </option>
                                {
                                  make.map((item) => {
                                    return (
                                      <option key={item.id} value={item.id}>{item.make_name}</option>
                                    )
                                  })
                                }
                              </select>
                            </div>

                            <div class="form-group">
                              <label>Select Model</label>
                              <select className="form-control" onChange={(e) => { setModelId(e.target.value) }} aria-label="Select option">
                                <option defaultValue>Select Model</option>
                                {model.map((k) => (
                                  <option key={k.id} value={k.id}>
                                    {k.model_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <input type="submit" value={'Submit'} class="btn btn-primary col-lg-12 col-md-12 col-sm-12" />
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
  )
}

export default Allserialno

