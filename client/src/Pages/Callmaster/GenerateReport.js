import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GenerateReport = () => {
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

  const [callId, setCallId] = useState("");
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
      setCallId(res.data[0].id);
      setCallDate(res.data[0].call_date);
      setProblemStatement(res.data[0].problem_statement);
      setCallAction(res.data[0].call_action);

      // Get Institute Name
      const InstiId = res.data[0].institute_id;

      // Fetch the call type name based on the ID
      const InstituteRes = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getinstitutename/${InstiId}`
      );
      const InstituteName = InstituteRes.data.institute_name;

      setInstituteId(InstituteName);

      // Get Dpartment Name
      const DepartmentId = res.data[0].department_id;

      // Fetch the call type name based on the ID
      const DepartmentRes = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getdepartmentname/${DepartmentId}`
      );
      const DepartmentName = DepartmentRes.data.department_name;

      setDepartmentId(DepartmentName);

      // Get Call type name
      const callTypeId = res.data[0].calltype_id;

      // Fetch the call type name based on the ID
      const callTypeRes = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getcalltypename/${callTypeId}`
      );
      const callTypeName = callTypeRes.data.call_type;

      setCalltypeID(callTypeName);

      // Get Model name
      const ModelID = res.data[0].model_id;

      // Fetch the call type name based on the ID
      const modelRes = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getmodelname/${ModelID}`
      );
      const modelName = modelRes.data.model_name;

      setModelId(modelName);

      // Get Make name
      const MakeID = res.data[0].make_id;

      // Fetch the call type name based on the ID
      const makeRes = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getmakename/${MakeID}`
      );
      const makeName = makeRes.data.make_name;

      setMakeId(makeName);

      // Get Serial No
      const SerialNO = res.data[0].serialno_id;

      // Fetch the call type name based on the ID
      const serialRes = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/getserialnos/${SerialNO}`
      );
      const serialNo = serialRes.data.serial_no;

      setSerialnoId(serialNo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCall();
    getPerCall();
  }, []);

  const downloadPdf = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      html: "#my-table",
    });
    doc.save("support_report.pdf");
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
                    <h1 className="h3 mb-0 text-gray-bold">
                      System Support Report
                    </h1>
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
                  {/* <div className="row">
                    <div className="col-xl-12 col-lg-12">
                      <div class="dash-content px-3">
                        <div class="container">
                          <div class="table-container">
                            <div class="row">
                              <div class="col-lg-10 col-sm-12 mx-auto table-responsive">
                                <table
                                  id="my-table"
                                  class="table table-bordered"
                                >
                                  <thead class="thead-dark">
                                    <tr>
                                      <th
                                        scope="col"
                                        colspan="2"
                                        class="text-center"
                                      >
                                        <div class="d-flex justify-content-center">
                                          <div class="h5">
                                            System Support Report
                                          </div>
                                        </div>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          Date
                                        </span>{" "}
                                        <span className="pl-5">{callDate}</span>
                                      </td>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          Call ID
                                        </span>{" "}
                                        <span className="pl-5">{callId}</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          Institute Name
                                        </span>{" "}
                                        <div className="pt-2">
                                          {instituteId}
                                        </div>
                                      </td>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          Department Name
                                        </span>{" "}
                                        <div className="pt-2">
                                          {departmentId}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          Call Type{" "}
                                          <span
                                            style={{ fontWeight: "lighter" }}
                                            className="pl-5"
                                          >
                                            {calltypeID}
                                          </span>{" "}
                                          <br />
                                          Hardware <br />
                                          Software <br />
                                          Antivirus <br />
                                          Other
                                        </span>{" "}
                                      </td>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          System{" "}
                                          <span
                                            style={{ fontWeight: "lighter" }}
                                            className="pl-5"
                                          >
                                            {modelId}
                                          </span>{" "}
                                          <br />
                                          Model <br />
                                          Assemble <br />
                                          or <br />
                                          Branded
                                        </span>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          Company
                                        </span>{" "}
                                        <span className="pl-5">{makeId}</span>
                                      </td>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          System{" "}
                                          <span
                                            style={{ fontWeight: "lighter" }}
                                            className="pl-5"
                                          >
                                            {serialnoId}
                                          </span>{" "}
                                          <br />
                                          Serial <br />
                                          Number
                                        </span>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          Problem Nature
                                        </span>{" "}
                                        <div className="pt-2">
                                          {problemStatement}
                                        </div>
                                      </td>
                                      <td>
                                        <span style={{ fontWeight: "bold" }}>
                                          Action Taken
                                        </span>{" "}
                                        <div className="pt-2">{callAction}</div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <button
                                  onClick={() => {
                                    downloadPdf();
                                  }}
                                  class="btn btn-primary"
                                >
                                  <i class="bi bi-printer"></i> Print Report
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="col-xl-12 col-lg-12">
                      <div class="dash-content px-3">
                        <div class="container">
                          <div class="table-container">
                            <div class="row">
                              <div class="col-lg-10 col-sm-12 mx-auto table-responsive">
                                <div class="card">
                                  <div class="card-body">
                                    <h5 class="card-title text-center">
                                      System Support Report
                                    </h5>
                                    <table
                                      id="my-table"
                                      class="table table-bordered"
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Date
                                            </span>{" "}
                                            <span className="pl-5">
                                              {callDate}
                                            </span>
                                          </td>
                                          <td>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Call ID
                                            </span>{" "}
                                            <span className="pl-5">
                                              {callId}
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Institute Name
                                            </span>{" "}
                                            <div className="pt-2">
                                              {instituteId}
                                            </div>
                                          </td>
                                          <td>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Department Name
                                            </span>{" "}
                                            <div className="pt-2">
                                              {departmentId}
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Call Type
                                            </span>{" "}
                                            <span
                                              style={{ fontWeight: "lighter" }}
                                              className="pl-5"
                                            >
                                              {calltypeID}
                                            </span>{" "}
                                            <br />
                                            Hardware <br />
                                            Software <br />
                                            Antivirus <br />
                                            Other
                                          </td>
                                          <td>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              System
                                            </span>{" "}
                                            <span
                                              style={{ fontWeight: "lighter" }}
                                              className="pl-5"
                                            >
                                              {modelId}
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
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Company
                                            </span>{" "}
                                            <span className="pl-5">
                                              {makeId}
                                            </span>
                                          </td>
                                          <td>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              System
                                            </span>{" "}
                                            <span
                                              style={{ fontWeight: "lighter" }}
                                              className="pl-5"
                                            >
                                              {serialnoId}
                                            </span>{" "}
                                            <br />
                                            Serial <br />
                                            Number
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Problem Nature
                                            </span>{" "}
                                            <div className="pt-2">
                                              {problemStatement}
                                            </div>
                                          </td>
                                          <td>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Action Taken
                                            </span>{" "}
                                            <div className="pt-2">
                                              {callAction}
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <button
                                      onClick={() => {
                                        downloadPdf();
                                      }}
                                      class="btn btn-primary"
                                    >
                                      <i class="bi bi-printer"></i> Print Report
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
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

export default GenerateReport;
