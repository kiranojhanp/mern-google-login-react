import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

const SocialLogin = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("data"))
  );

  const handleLogin = async (googleData) => {
    const res = await axios.post("/api/auth/google", {
      token: googleData.tokenId,
    });

    localStorage.setItem("data", JSON.stringify(res.data));
    const data = localStorage.getItem("data");

    setUserData(JSON.parse(data));
    console.log(res.data);
  };

  const handleLogout = async () => {
    localStorage.removeItem("data");
    window.location.reload(false);
  };

  return (
    <>
      <form>
        <div className="row">
          <h2 style={{ textAlign: "center" }}>
            Login with Social Media or Manually
          </h2>
          <div className="vl">
            <span className="vl-innertext">or</span>
          </div>

          <div className="col">
            <button href="#" className="fb btn">
              <i className="fa fa-facebook fa-fw"></i> Login with Facebook
            </button>
            <button href="#" className="twitter btn">
              <i className="fa fa-twitter fa-fw"></i> Login with Twitter
            </button>

            <GoogleLogin
              clientId="262658563971-25m2is7t0qfl54cr5bna4j207qa1ii0c.apps.googleusercontent.com"
              buttonText="Log in with Google"
              render={(renderProps) => (
                <button
                  className="google btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <i className="fa fa-google fa-fw"></i> Login with Google
                </button>
              )}
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={"single_host_origin"}
            />
          </div>

          <div className="col">
            <div className="hide-md-lg">
              <p>Or sign in manually:</p>
            </div>

            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <input type="submit" value="Login" />
          </div>
        </div>
      </form>
      <hr />
      <div className="row">
        <h2 style={{ textAlign: "center" }}>
          {userData?.token ? (
            <div>
              <pre>{`Name: ${userData.name} \n Email: ${userData.email} \n `}</pre>
              <img
                width="50px"
                alt="profile"
                height="50px"
                src={userData.picture}
              />
              <button href="#" className="twitter btn" onClick={handleLogout}>
                <i className="fa fa-sign-out fa-fw"></i> Logout
              </button>
            </div>
          ) : (
            "Login"
          )}
        </h2>
      </div>
    </>
  );
};

export default SocialLogin;
