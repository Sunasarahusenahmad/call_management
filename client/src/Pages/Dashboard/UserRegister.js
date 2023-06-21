import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = () => {
  const navigate = useNavigate();

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
      toast.error("please fill-up all fields");
    } else {
      try {
        // Check if username exists
        const response = await axios.post("/checkuserlogin", {
          username: username,
        });
        if (response.data.exists) {
          toast.error(`${username} Username is already exists!`);
        } else {
          await axios
            .post("/adduser", group)
            .then((res) => {
              navigate("/", { replace: true });
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

  useEffect(() => {
    if (instituteId) {
      getSelectedDepartments();
    }
    getInstitute();
  }, [instituteId]);

  // Password Show or Not Process

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 col-sm-8 mb-5">
            <div class="card mt-5">
              <div class="card-body">
                <h5 class="card-title text-center">User Registration</h5>

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
                    <label for="email">Email</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Email"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                    />
                  </div>

                  <div class="form-group">
                    <label for="mobile">Mobile</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Mobile No"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="institute">Select Institute</label>
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
                          <option value={item.id}>{item.institute_name}</option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Select Department</label>
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
                    <label for="username">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          onClick={handlePasswordToggle}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <i
                              className="fa fa-eye-slash"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary btn-block">
                    Register
                  </button>
                </form>
              </div>
            </div>
            <div className="pt-2 text-center">
              Already have an Account ? <NavLink to={"/"}>Login Now</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
