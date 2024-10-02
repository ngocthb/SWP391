import React, { useRef } from "react";
import "./ManagerCreateService.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "@tinymce/tinymce-react";

const ManagerCreateService = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="manager-create-service">
      <h2 className="manager-create-service__header">Service Information</h2>
      <div className="manager-create-service__avatar-section">
        <div className="manager-create-service__avatar">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="manager-create-service__avatar-info">
          <h3 className="manager-create-service__avatar-title">Change image</h3>
          <p className="manager-create-service__avatar-description">
            Recommended Dimensions: 120x120 Max file size: 5MB
          </p>
          <button className="manager-create-service__upload-btn">Upload</button>
        </div>
      </div>
      <div className="manager-create-service__form-section">
        <div className="manager-create-service__form-grid">
          <div className="manager-create-service__form-group manager-create-service__form-group--full-width">
            <label
              htmlFor="nameService"
              className="manager-create-service__label"
            >
              Name service:
            </label>
            <input
              type="text"
              id="nameService"
              className="manager-create-service__input"
              placeholder="Name service"
            />
          </div>
          <div className="manager-create-service__form-group">
            <label htmlFor="email" className="manager-create-service__label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="manager-create-service__input"
              placeholder="Email"
            />
          </div>
          <div className="manager-create-service__form-grid manager-create-service__form-grid--half-width">
            <div className="manager-create-service__form-group">
              <label htmlFor="dos" className="manager-create-service__label">
                Date of insert:
              </label>
              <input
                type="date"
                id="dos"
                className="manager-create-service__input"
                placeholder="Date of insert"
              />
            </div>
            <div className="manager-create-service__form-group">
              <label htmlFor="dou" className="manager-create-service__label">
                Date of use:
              </label>
              <input
                type="date"
                id="dou"
                className="manager-create-service__input"
                placeholder="Date of use"
              />
            </div>
          </div>
          <div className="manager-create-service__form-group">
            <Editor
              apiKey="your-api-key"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <button onClick={log}>Log editor content</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerCreateService;
