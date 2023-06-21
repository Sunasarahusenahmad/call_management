import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check for existing session
    const isLoggedIn = sessionStorage.getItem("username");
    if (isLoggedIn) {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/userlogin", { username, password })
      .then((response) => {
        // Store the username in session
        sessionStorage.setItem("username", username);
        navigate("/admin-dashboard", { replace: true });
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        window.alert(error.response.data.message);
      });
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
                <h5 class="card-title text-center">User Login</h5>

                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
              Don't have an Account ?{" "}
              <NavLink to={"/user-register"}>Register Now</NavLink>
            </div>
            <div className="pt-2 text-center">
              Are you an <NavLink to={"/admin"}>Admin ?</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
