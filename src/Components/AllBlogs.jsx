import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  async function fetchAllBlogs() {
    const result = await fetch("http://localhost:3100/blogs", {
      method: "GET",
    });
    const data = await result.json();
    setBlogs(data);
  }

  useEffect(() => {
    fetchAllBlogs();
  });

  async function deleteBlog(id) {
    console.log(id);
    await fetch(`http://localhost:3100/delete/${id}`, {
      method: "DELETE",
    });
    fetchAllBlogs();
  }
  return (
    <div className="container">
      <h1 className="mt-3 fw-bold text-center text-decoration-underline">
        All Blogs
      </h1>
      <div className="row">
        {blogs.map((blog, index) => {
          return (
            <div className="col-12 col-sm-4 my-3" key={index}>
              <div className="card h-100" key={index}>
                <Link to={`/SingleBlog/${blog._id}`}>
                  <img
                    src={`http://localhost:3100/${blog?.image}`}
                    className="card-img-top"
                    style={{ height: "100%" }}
                    alt={blog?.image}
                  />
                </Link>
                <div className="card-body d-flex flex-column justify-content-between">
                  <p className="author-name">{blog.author}</p>
                  <h5 className="card-title fw-bold">{blog.title}</h5>
                  <p className="card-text cutoff-text">{blog.description}</p>
                  <div className="d-flex gap-2 justify-content-end">
                    <Link
                      to={`/getSingleBlog/${blog._id}`}
                      className="btn btn-primary"
                      style={{ width: "fit-content" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        deleteBlog(blog._id);
                      }}
                      className="btn btn-danger"
                      style={{ width: "fit-content" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBlogs;
