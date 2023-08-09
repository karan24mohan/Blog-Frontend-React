import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  // const [authName, setAuthName] = useState([]);
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

  const deleteBlog = async (id) => {
    console.log(id);
    await fetch(`http://localhost:3100/delete/${id}`, {
      method: "DELETE",
    });
    fetchBlogs();
  };
  return (
    <>
      <div className="container">
        <h1 className="mt-3 fw-bold">Your Articles</h1>
        {blogs.length > 0 ? (
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
                      <p className="card-text cutoff-text">
                        {blog.description}
                      </p>
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
        ) : (
          <h2 className="noBlog">No blog right now</h2>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOffHover
        theme="light"
      />
    </>
  );
};

export default Home;
