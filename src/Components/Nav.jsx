import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      {auth ? (
        <nav>
          <Link to="/">
            <h1>Logo</h1>
          </Link>
          <ul className="navLinks">
            <li>
              <Link to="/blogs">Upload Blog</Link>
            </li>
            <li>
              <div className="dropdown">
                <div data-bs-toggle="dropdown" aria-expanded="false">
                  <img
                    src="https://gebbs-new.vercel.app/images/user.svg"
                    alt="User logo"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/userProfile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Nav;
