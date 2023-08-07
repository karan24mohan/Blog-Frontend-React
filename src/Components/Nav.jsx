import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  let auth = localStorage.getItem("user");
  auth = JSON.parse(auth);
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
              <div className="dropdown">
                <div data-bs-toggle="dropdown" aria-expanded="false">
                  <h3 className="mb-0 navUserName">{auth.name}</h3>
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/blogs">
                      Upload Blog
                    </Link>
                  </li>
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
