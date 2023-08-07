import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ShowNavBar = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/blogs") {
      setShowNav(false);
    } else if (location.pathname === "/getSingleBlog/:id") {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location]);

  return <div>{showNav && children}</div>;
};

export default ShowNavBar;
