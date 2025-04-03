import React, { useEffect } from 'react';
import "./Contact.css"
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import { Footer1 } from './Footer1';


function Contact() {
  useEffect(() => {
    // Initialize Dropzone

    const myDropzone = new Dropzone('#request-attachments', {
      url: '/upload', // Replace with your server's upload URL
      addRemoveLinks: true, // Display remove links for uploaded files
    });
    

    // Optional: Add event listeners for success and error handling
    myDropzone.on('success', (file, response) => {
      // Handle successful uploads
      console.log('File uploaded:', file, 'Response:', response);
    });

    myDropzone.on('error', (file, errorMessage) => {
      // Handle upload errors
      console.error('File upload error:', file, 'Error:', errorMessage);
    });

    // Clean up Dropzone instance when the component unmounts
    return () => {
      myDropzone.destroy();
    };
  }, []);



  return (
    <div>
      <div className='contactpage'>
      <head className="head">
        <div className="logo">
          <button1
            className="menu-button"
            aria-controls="user-nav"
            aria-expanded="false"
            aria-label="Toggle navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              focusable="false"
              viewBox="0 0 16 16"
              className="icon-menu"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                d="M1.5 3.5h13m-13 4h13m-13 4h13"
              />
            </svg>
          </button1>
          <a href="#"></a>
        </div>
      </head>
      <main role="main">
        <div className="container-divider"></div>
        <div className="container">
          <nav1 className="sub-nav">
            <ol className="breadcrumbs">
              <li title="LearnMate Help Center">
                <a href="/hc/en-us">LearnMate Help Center</a>
              </li>
            </ol>
            <div className="search-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                focusable="false"
                viewBox="0 0 12 12"
                className="search-icon"
              >
                <circle cx="4.5" cy="4.5" r="4" fill="none" stroke="currentColor" />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  d="M11 11L7.5 7.5"
                />
              </svg>
              <form
                role="search"
                className="search"
                data-search=""
                action="/hc/en-us/search"
                accept-charset="UTF-8"
                method="get"
              >
                <input
                  name="utf8"
                  type="hidden"
                  value="&#x2713;"
                  autoComplete="off"
                />
                <input
                  type="search"
                  name="query"
                  id="query"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </nav1>
          <h-contact>
            Submit a request
            <span className="follow-up-hint"></span>
          </h-contact>
          <div id="main-content" className="form">
            <form
              id="new_request"
              className="request-form"
              data-form=""
              data-form-type="request"
              action="/hc/en-us/requests"
              accept-charset="UTF-8"
              method="post"
            >
              <input
                name="utf8"
                type="hidden"
                value="&#x2713;"
                autoComplete="off"
              />
              <div className="form-field string required request_anonymous_requester_email">
                <label htmlFor="request_anonymous_requester_email">
                  Your email address
                </label>
                <input
                  type="text"
                  name="request[anonymous_requester_email]"
                  id="request_anonymous_requester_email"
                  aria-required="true"
                />
              </div>
              <div className="form-field string required request_subject">
                <label id="request_subject_label" htmlFor="request_subject">
                  Subject
                </label>
                <input
                  type="text"
                  name="request[subject]"
                  id="request_subject"
                  maxLength="150"
                  size="150"
                  aria-required="true"
                  aria-labelledby="request_subject_label"
                />
              </div>
              <div
                className="suggestion-list"
                data-hc-class="searchbox"
                data-hc-suggestion-list="true"
              ></div>
              <div className="form-field text required request_description">
                <label
                  id="request_description_label"
                  htmlFor="request_description"
                >
                  Description
                </label>
                <textarea
                  name="request[description]"
                  id="request_description"
                  aria-required="true"
                  aria-labelledby="request_description_label"
                  data-helper="wysiwyg"
                ></textarea>
                <input
                  type="hidden"
                  name="request[description_mimetype]"
                  id="request_description_mimetype"
                  value="text/html"
                  style={{ display: 'none' }}
                  autoComplete="off"
                />
              </div>

                  <div className="form-field string optional request_custom_fields_900010437003">
                    <label
                      id="request_custom_fields_900010437003_label"
                      htmlFor="request_custom_fields_900010437003"
                    >
                      Question Type<span className="optional">(optional)</span>
                    </label>
                    <select
                      name="request[custom_fields][900010437003]"
                      id="request_custom_fields_900010437003"
                      autoComplete="off"
                      aria-required="false"
                      aria-describedby="request_custom_fields_900010437003_hint"
                      aria-labelledby="request_custom_fields_900010437003_label"
                    >
                      <option value="">Select a Question Type</option>
                      <option value="delete">Delete Account</option>
                      <option value="refund">Request a Refund</option>
                      <option value="cancel">Cancel Subscription</option>
                      <option value="subscription">Subscription Issues</option>
                      <option value="payment">Payment Issues</option>
                      <option value="product">Product Questions</option>
                      <option value="account">Account Issues</option>
                      <option value="other">Others</option>
                    </select>
                    <p id="request_custom_fields_900010437003_hint">
                      Please choose the correct question type so we can resolve your issue quickly and efficiently.
                    </p>
                  </div>


              <div className="form-field">
                <label htmlFor="request-attachments">
                  Attachments<span className="optional">(optional)</span>
                </label>
                <div id="upload-dropzone" className="upload-dropzone">
                  <input
                    type="file"
                    multiple="true"
                    id="request-attachments"
                    data-fileupload="true"
                    data-dropzone="upload-dropzone"
                    data-error="upload-error"
                    data-create-url="/hc/en-us/request_uploads"
                    data-name="request[attachments][]"
                    data-pool="request-attachments-pool"
                    data-delete-confirm-msg=""
                    aria-describedby="upload-error"
                    />
                    <p>
                        Add file or drop files here
                    </p>
                  
                </div>
              
                <ul id="request-attachments-pool" className="upload-pool" data-template="upload-template"></ul>
                <script type="text/html" id="upload-template">
                  <li className="upload-item" data-upload-item>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      focusable="false"
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className="upload-item-icon"
                    >
                      <path fill="none" stroke="currentColor" strokeLinecap="round" d="M2.5 4v4.5c0 1.7 1.3 3 3 3s3-1.3 3-3v-6c0-1.1-.9-2-2-2s-2 .9-2 2v6c0 .6.4 1 1 1s1-.4 1-1V4" />
                    </svg>
                    <div aria-hidden="true" className="upload-item-icon-spacer"></div>
                    <a className="upload-link" target="_blank" data-upload-link></a>
                    <p className="upload-path" data-upload-path></p>
                    <p className="upload-path" data-upload-size></p>
                    <p data-upload-issue className="notification notification-alert notification-inline" aria-hidden="true"></p>
                    <span className="upload-remove" aria-label="Remove attachment" role="button" tabIndex="0" data-upload-remove>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" focusable="false" viewBox="0 0 12 12" className="upload-item-icon">
                        <path stroke="currentColor" strokeLinecap="round" d="M3 9l6-6m0 6L3 3" />
                      </svg>
                    </span>
                    <div className="upload-progress" data-upload-progress></div>
                    <input type="hidden" />
                  </li>
                </script>
              </div>
              <footer>
                <input type="submit" name="commit" value="Submit" />
              </footer>
            </form>
          </div>
        </div>
      </main>
     
    </div>
    <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /><br />
      
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
     <br />
      <Footer1 />
    </div>
    
  );
}

export default Contact;
