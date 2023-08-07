import React, { useState, useEffect, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBlogDetails = async () => {
    const result = await fetch(
      `http://localhost:3100/getSingleBlog/${params.id}`
    );
    const data = await result.json();
    setTitle(data.title);
    setAuthor(data.author);
    setImage(data.image);
    setDescription(data.description);
    setContent(data.content);
  };

  const editor = useRef(null);

  const config = useMemo(
    () => ({
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "center",
        "left",
        "right",
        "justify",
        "|",
        "link",
        "image",
      ],
      uploader: { insertImageAsBase64URI: true },
      removeButtons: ["brush", "file"],
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: false,
      readonly: false,
    }),
    []
  );

  const handleSubmit = async () => {
    const result = await fetch(
      `http://localhost:3100/getSingleBlog/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
          image,
          author,
          content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result.status);
    navigate("/");
  };

  return (
    <>
      <div className="form-container-wrapper">
        <div className="form-container" style={{ maxWidth: "50rem" }}>
          <h2>Update Blog</h2>
          <form action="#">
            <div className="k-input-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="k-input-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                name="author"
                id="author"
                value={author}
                placeholder="Enter Author"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="k-input-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                name="image"
                id="image"
                value={image}
                placeholder="Enter Image URL"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="k-input-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="k-input-group p-0">
              <label htmlFor="description">Description</label>

              <JoditEditor
                value={content}
                ref={editor}
                config={config}
                onChange={(content) => setContent(content)}
              />

              {/* <ReactQuill
                theme="snow"
                value={content}
                onChange={onChange}
                modules={modules}
              /> */}
            </div>

            <button
              type="button"
              className="k-btn-primary mb-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
