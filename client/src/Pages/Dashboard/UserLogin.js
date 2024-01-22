import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import AlertBox from "../../Components/AlertBox";

const UserLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check for existing session
    const isLoggedIn =
      sessionStorage.getItem("user") && sessionStorage.getItem("userId");
    if (isLoggedIn) {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(""); // Reset the error message

    axios
      .post(`${process.env.REACT_APP_PROXY_URL}/userlogin`, {
        username,
        password,
      })
      .then((response) => {
        const { userId } = response.data;
        sessionStorage.setItem("userId", userId);

        // Store the username and it's ID in session
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("user", username);
        navigate("/admin-dashboard", { replace: true });
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("An error occurred. Please try again later.");
        }
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
                {message && <AlertBox severity="error" message={message} />}
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
