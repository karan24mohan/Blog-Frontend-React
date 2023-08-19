import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [blogs, setBlogs] = useState([]);
  let auth = JSON.parse(localStorage.getItem("user"));

  async function fetchBlogs() {
    const result = await fetch("http://localhost:3100/blogs", {
      method: "GET",
    });
    const data = await result.json();
    const filterData = data.filter((item) => {
      return item.author === auth.name;
    });
    setBlogs(filterData);
  }

  useEffect(() => {
    if (auth) {
      fetchBlogs();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class="d-flex align-items-center justify-content-center flex-column profileWrapper me-auto ms-auto mt-5">
      <div class="w-75 d-flex align-items-center user-info flex-column flex-sm-row align-self-center align-self-md-center justify-content-between gap-3 gap-sm-0">
        <div class="text pe-0 pe-sm-5 borderEnd">
          <h2>{auth.name}</h2>
          <p>{auth.email}</p>
        </div>

        <div class="text pe-0 pe-sm-5">
          <h2>{blogs.length}</h2>
          <p>Blogs Posted</p>
        </div>
      </div>
      <div class="user-bio d-flex mt-3 gap-3 flex-column align-items-center justify-content-center">
        <img
          src="./assets/images/edit_icon.svg"
          alt="Edit Icon"
          data-bs-toggle="modal"
          data-bs-target="#aboutUser"
        />
        <div class="user_bio_info">
          <p>I am a writer at kockpit community.</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
