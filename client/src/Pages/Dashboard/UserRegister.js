import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import AlertBox from "../../Components/AlertBox";

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
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Name Validation

    if (name.trim() === "") {
      errors.name = "Name is required";
      isValid = false;
    } else if (name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
      isValid = false;
    }

    // Email Validation

    if (userEmail.trim() === "") {
      errors.userEmail = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      errors.userEmail = "Email is not valid";
      isValid = false;
    }

    // Mobile Validation
    const mobileRegex = /^\d{10}$/;
    if (mobile.trim() === "") {
      errors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!mobileRegex.test(mobile)) {
      errors.mobile = "Invalid Mobile Number. Text Can't be Accept";
      isValid = false;
    }

    // Institute Validation
    if (instituteId === "") {
      errors.instituteId = "Select an institute";
      isValid = false;
    }

    // Department Validation
    if (departmentId === "") {
      errors.departmentId = "Select a department";
      isValid = false;
    }

    // Username Validation

    if (username.trim() === "") {
      errors.username = "Username is required";
      isValid = false;
    } else if (username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    // Password Validation

    if (password.trim() === "") {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else if (
      !/[0-9]/.test(password) ||
      !/[a-zA-Z]/.test(password) ||
      !/[^a-zA-Z0-9]/.test(password)
    ) {
      errors.password =
        "Password must contain at least one number, one letter, and one special character";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Add or Edit Institute
  const savedata = async (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      const group = {
        username: username,
        password: password,
        name: name,
        userEmail: userEmail,
        mobile: mobile,
        instituteId: instituteId,
        departmentId: departmentId,
      };

      try {
        if (validateForm()) {
          const response = await axios.post(
            `${process.env.REACT_APP_PROXY_URL}/checkuserlogin`,
            {
              username: username,
            }
          );
          if (response.data.exists) {
            setMessage("");
            setMessage(
              <p>
                <strong>{username}</strong> Username already exists!
              </p>
            );
            return;
          } else {
            await axios
              .post(`${process.env.REACT_APP_PROXY_URL}/adduser`, group)
              .then((res) => {
                navigate("/", { replace: true });
              })
              .catch((err) => {
                console.log(err);
              });
          }
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
                {message && <AlertBox severity="error" message={message} />}
                <form onSubmit={savedata}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.name
                          ? "is-invalid"
                          : name !== ""
                          ? "is-valid"
                          : ""
                      }`}
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    {formErrors.name && (
                      <div className="invalid-feedback">{formErrors.name}</div>
                    )}
                  </div>

                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.userEmail
                          ? "is-invalid"
                          : userEmail !== ""
                          ? "is-valid"
                          : ""
                      }`}
                      placeholder="Enter Email"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                    />
                    {formErrors.userEmail && (
                      <div className="invalid-feedback">
                        {formErrors.userEmail}
                      </div>
                    )}
                  </div>

                  <div class="form-group">
                    <label for="mobile">Mobile</label>
                    <input
                      type="text"
                      maxLength={10}
                      className={`form-control ${
                        formErrors.mobile
                          ? "is-invalid"
                          : mobile !== ""
                          ? "is-valid"
                          : ""
                      }`}
                      placeholder="Enter Mobile No"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                    />
                    {formErrors.mobile && (
                      <div className="invalid-feedback">
                        {formErrors.mobile}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="institute">Select Institute</label>
                    <select
                      className={`form-control ${
                        formErrors.instituteId
                          ? "is-invalid"
                          : instituteId !== ""
                          ? "is-valid"
                          : ""
                      }`}
                      value={instituteId}
                      onChange={(e) => {
                        setInstituteId(e.target.value);
                      }}
                      aria-label="Select option"
                    >
                      <option disabled value="">
                        Select Institute
                      </option>
                      {institute.map((item) => {
                        return (
                          <option value={item.id}>{item.institute_name}</option>
                        );
                      })}
                    </select>
                    {formErrors.instituteId && (
                      <div className="invalid-feedback">
                        {formErrors.instituteId}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Select Department</label>
                    <select
                      className={`form-control ${
                        formErrors.departmentId
                          ? "is-invalid"
                          : departmentId !== ""
                          ? "is-valid"
                          : ""
                      }`}
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
                    {formErrors.departmentId && (
                      <div className="invalid-feedback">
                        {formErrors.departmentId}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.username
                          ? "is-invalid"
                          : username !== ""
                          ? "is-valid"
                          : ""
                      }`}
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    {formErrors.username && (
                      <div className="invalid-feedback">
                        {formErrors.username}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          formErrors.password
                            ? "is-invalid"
                            : password !== ""
                            ? "is-valid"
                            : ""
                        }`}
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
                      {formErrors.password && (
                        <div className="invalid-feedback">
                          {formErrors.password}
                        </div>
                      )}
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
