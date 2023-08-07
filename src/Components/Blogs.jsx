import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    try {
      if (image === "") {
        setError("Image not uploaded, please upload the image");
        console.log(error);
      } else {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("author", author);
        formData.append("content", content);
        formData.append("blogimage", image);

        await fetch("http://localhost:3100/blogs", {
          method: "POST",
          body: formData,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-container-wrapper">
        <div className="form-container" style={{ maxWidth: "50rem" }}>
          <h2>Upload Blog</h2>
          <form action="#">
            <div className="k-input-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="k-input-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                name="author"
                id="author"
                placeholder="Enter Author"
                autoComplete="off"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="k-input-group">
              <label htmlFor="shortDescription">Short Description</label>
              <input
                name="shortDescription"
                id="shortDescription"
                cols="30"
                rows="5"
                placeholder="Enter Short Description"
                onChange={(e) => setDescription(e.target.value)}
              />
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

            <div className="k-input-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="blogimage"
                id="blogimage"
                onChange={(e) => setImage(e.target.files[0])}
              />
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

export default Blogs;
