import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check for existing session
    const isLoggedIn = sessionStorage.getItem("email");
    if (isLoggedIn) {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered email and password match the hardcoded values
    if (email === "admin@gmail.com" && password === "admin") {
      // Store the email in session
      sessionStorage.setItem("email", email);
      navigate("/admin-dashboard", { replace: true });
    } else {
      setMessage("Invalid email or password");
      window.alert("Invalid email or password");
    }
  };

  // Password Show or Not Process

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 col-sm-8">
            <div class="card mt-5">
              <div class="card-body">
                <h5 class="card-title text-center">Admin Login</h5>
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="email">email</label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    Login
                  </button>
                </form>
                {message && (
                  <p className="text-center text-danger pt-3">{message}</p>
                )}
              </div>
            </div>
            <div className="pt-2 text-center">
              Are you an <NavLink to={"/"}>User ?</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
