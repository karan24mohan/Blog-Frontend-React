import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const [blogData, setBlogData] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchSingleBlogData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSingleBlogData = async () => {
    const result = await fetch(
      `http://localhost:3100/getSingleBlog/${params.id}`
    );
    const data = await result.json();
    setBlogData(data);
  };
  return (
    <>
      <div className="singleBlogContainer">
        <h1>{blogData.title}</h1>
        <img
          src={`http://localhost:3100/${blogData?.image}`}
          alt="BlogImage"
          className="w-100"
        />
        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
      </div>
    </>
  );
};

export default SingleBlog;
