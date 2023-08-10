import Link from "next/link";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdOutlineSubject } from "react-icons/md";
import { useConfiguration } from "./hook/useConfiguration";
import { Formik, Field, Form, ErrorMessage } from "formik";
const Configuration = () => {
  const {
    listForms,
    initialValues,
    newFormSchema,
    handleForm,
    handleDomain,
    handleHoneyPot,
    handleRecaptcha,
    handleFormFill,
    handleBlockMail,
  } = useConfiguration();
  const [copyStatus, setCopyStatus] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const copyUrl = listForms.formLink;
  const handleCopy = () => {
    console.log("i am call copy");
    setCopyStatus(true);
  };

  const handleCheckboxChange = (e) => {
    setEnabled(e.target.checked);
  };

  console.log(
    "i am confirrtyrtyrty :=",
    listForms.allowDomain?.enableAllowDomain
  );

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-10 text-blue-darker">
        <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
          <div className="flex flex-col items-start w-full">
            <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
              <h1>Form Endpoint</h1>
            </div>

            <div className="p-2 w-full">
              <pre className="bg-gray-darker classic-pre mb-4">{copyUrl}</pre>
            </div>

            <div className="flex  justify-end  item-end p-4 w-full">
              <CopyToClipboard text={copyUrl}>
                <button
                  onClick={() => {
                    handleCopy();
                  }}
                >
                  COPY EMBED CODE
                </button>
              </CopyToClipboard>

              <h1 className="text-red-500"> {!copyStatus ? "" : "copied"}</h1>
            </div>
          </div>
        </div>

        {/* /////i am Form Details */}

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={newFormSchema}
          onSubmit={handleForm}
        >
          <Form className="w-full">
            <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
              <div className="flex flex-col items-start w-full">
                <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
                  <h1>Form Details</h1>
                </div>
                <div className="flex flex-col w-full items-start p-2 gap-3">
                  <label>Name</label>
                  <Field
                    type="text"
                    name="formName"
                    className="w-full classic-typing-input-on-white"
                  />
                  <ErrorMessage
                    name="formName"
                    component="div"
                    className="font-normal text-blue-darker"
                  />
                </div>
                <div className="flex flex-col w-full items-start p-2 gap-3 h-auto">
                  <label>Forward to</label>
                  <Field
                    type="text"
                    name="forwardTo"
                    className="w-full h-40  classic-typing-input-on-white"
                  />
                  <ErrorMessage
                    name="forwardTo"
                    component="div"
                    className="font-normal text-blue-darker"
                  />
                </div>
                <div className="flex flex-col w-full items-start p-2 gap-3 h-auto">
                  <label>New Submissions Email Theme</label>
                  <Field
                    as="select"
                    name="submissionEmailTheme"
                    id="new_submission_email_theme"
                    className="classic-select-on-white"
                    dusk="submission_email_theme"
                  >
                    <option value="default">
                      Use default theme (with styles)
                    </option>
                    <option value="minimal">
                      Use minimal theme (fewer styles)
                    </option>
                  </Field>
                </div>
                <div className="flex  justify-end  item-end p-4 w-full">
                  <button className="p-4 btn btn-indigo " type="submit">
                    UPDATE DETAILS
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>

        {/* ///Submission Actions */}

        <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
          <div className="flex flex-col items-start w-full">
            <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
              <h1>Submission Actions</h1>
            </div>
            <div className="flex  w-full items-start p-2 gap-3">
              <label>
                Configure what should happen when a form submission succeeds or
                when it fails.
              </label>
            </div>
            <div className="flex flex-col w-full items-start p-2 gap-3 h-auto">
              <label>What happens when a form submission succeeds?</label>
              <select
                id="new_submission_email_theme"
                className="classic-select-on-white"
                dusk="submission_email_theme"
              >
                <option value="default">Use Default Thank You Page</option>
                <option value="redirect">
                  Redirect to Custom Thank You Page
                </option>
                <option value="branded">Use Branded Thank You Page</option>
              </select>
            </div>
            <div className="flex flex-col w-full items-start p-2 gap-3 h-auto">
              <label>What happens when a form submission fails?</label>
              <select
                id="new_submission_email_theme"
                className="classic-select-on-white"
                dusk="submission_email_theme"
              >
                <option value="default">Use Default Error Pages</option>
                <option value="redirect">Redirect to Custom URL</option>
              </select>
            </div>
            <div className="flex  justify-end  item-end p-4 w-full">
              <button className="p-4 btn btn-indigo ">
                UPDATE SUBMISSION ACTIONS
              </button>
            </div>
          </div>
        </div>

        {/* Submission Actions */}

        {/* ///Logo */}

        <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
          <div className="flex flex-col items-start w-full">
            <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
              <h1>Logo</h1>
            </div>
            <div className="flex  w-full items-start p-2 gap-3">
              <label>
                The logo will be used on your emails, the thank-you page
                branding, and custom error pages.
              </label>
            </div>
            <div className="flex justify-center  w-full items-center p-2 gap-3 h-auto">
              <Link
                className="flex flex-col items-center gap-2 leading-none"
                href="#"
              >
                <MdOutlineSubject className="text-xl lg:text-5xl bg-[#047756] text-white rounded-md" />
              </Link>
              <input
                id="form_logo"
                name="image"
                type="file"
                className="block w-full text-sm text-blue-darker
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-gray file:shadow-sm file:text-blue-darker
                hover:file:bg-violet-100 file:cursor-pointer"
              />
            </div>

            <div className="flex  justify-end  item-end p-4 w-full">
              <button className="p-4 btn btn-indigo ">UPDATE LOGO</button>
            </div>
          </div>
        </div>

        {/* ///logo */}

        {/* ///AllowDomain */}
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleDomain}
        >
          <Form>
            <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
              <div className="flex flex-col items-start w-full">
                <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
                  <h1>Allowed Domains</h1>
                </div>
                <div className="flex  w-full items-start text-start p-2 gap-3">
                  <label>
                    FieldGoal allows you to restrict which domains can create
                    submissions for your form. This uses the Referer HTTP
                    header. When enabling this feature, make sure your sending
                    this header in the request (should be default for regular
                    HTML forms).
                  </label>
                </div>
                <div className="flex justify-start items-center p-2 gap-3">
                  <Field
                    type="checkbox"
                    name="enableAllowDomain"
                    checked={enabled}
                    onChange={handleCheckboxChange}
                  />
                  <label>Enable Allowed Domains</label>
                </div>
                {enabled && (
                  <div className="flex flex-col w-full items-start p-2 gap-3 allowDome">
                    <label>Allowed Domains</label>
                    <Field
                      type="text"
                      name="allowDomainValue"
                      className="w-full classic-typing-input-on-white"
                      placeholder="a@gmail.com"
                    />
                  </div>
                )}
                <div className="flex  justify-end  item-end p-4 w-full">
                  <button className="p-4 btn btn-indigo " type="submit">
                    UPDATE ALLOWED DOMAINS
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
        {/* ///AllowDomain */}

        {/* ///Honeypot */}
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleHoneyPot}
        >
          <Form>
            <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
              <div className="flex flex-col items-start w-full">
                <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
                  <h1>Honeypot</h1>
                </div>
                <div className="flex  w-full items-start text-start p-2 gap-3">
                  <label>
                    Honeypot may help prevent submission made by spam bots
                    filling your forms. Add a CSS hidden field to your form and
                    let us know its input name. When we receive a submission
                    with that field filled, well reject it.
                  </label>
                </div>
                <div className="flex flex-col w-full items-start p-2 gap-3">
                  <label>Honeypot Field Name</label>
                  <Field
                    type="text"
                    name="honeypot"
                    className="w-full classic-typing-input-on-white"
                  />
                </div>

                <div className="flex  justify-end  item-end p-4 w-full">
                  <button className="p-4 btn btn-indigo " type="submit">
                    UPDATE HONEYPOT
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
        {/* ///Honeypot */}

        {/* ///reCAPTCHA */}

        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleRecaptcha}
        >
          <Form>
            <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
              <div className="flex flex-col items-start w-full">
                <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
                  <h1>reCAPTCHA</h1>
                </div>
                <div className="flex  w-full items-start text-start p-2 gap-3">
                  <label>Place your valid reCAPTCHA v2 secret key here.</label>
                </div>

                <div className="flex justify-start items-start p-2 gap-3">
                  <Field
                    type="checkbox"
                    name="enablereCaptcha"
                    checked={enabled}
                    onChange={handleCheckboxChange}
                  />
                  <div className="flex  justify-start flex-col items-start text-start">
                    <label>Enable reCAPTCHA</label>
                    <label>
                      Selecting this will require submissions to your form to
                      contain a valid reCAPTCHA v2 response. Because FieldGoal
                      does not generate your form HTML you are responsible for
                      adding the reCAPTCHA to your forms markup.
                    </label>
                  </div>
                </div>
                {enabled && (
                  <div className="flex flex-col w-full items-start p-2 gap-3 allowDome">
                    <label>Secret</label>
                    <Field
                      type="text"
                      name="reCaptchaSecretValue"
                      className="w-full classic-typing-input-on-white"
                    />
                  </div>
                )}

                <div className="flex  justify-end  item-end p-4 w-full">
                  <button className="p-4 btn btn-indigo " type="submit">
                    UPDATE RECAPTCHA
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
        {/* ///reCAPTCHA */}

        {/* ///File Uploads */}
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleFormFill}
        >
          <Form className="w-full">
            <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
              <div className="flex flex-col items-start w-full">
                <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
                  <h1>File Uploads</h1>
                </div>
                <div className="flex  w-full items-start text-start p-2 gap-3">
                  <label>
                    FieldGoal allows you to connect to Amazon S3 to store files
                    uploaded to your forms.
                  </label>
                </div>

                <div className="flex justify-start items-center p-2 gap-3">
                  <Field
                    type="checkbox"
                    checked={enabled}
                    onChange={handleCheckboxChange}
                  />
                  <label>Enable File Uploads</label>
                </div>
                {enabled && (
                  <div className="flex flex-col w-full items-start p-2 gap-3 allowDome">
                    <div className="flex flex-col w-full items-start p-2 gap-3">
                      <label className="font-bold">Access Key ID</label>
                      <Field
                        type="text"
                        name="accessKeyID"
                        className="w-full classic-typing-input-on-white"
                      />
                    </div>
                    <div className="flex flex-col w-full items-start p-2 gap-3">
                      <label className="font-bold">Secret Access Key</label>
                      <Field
                        type="text"
                        name="secretAccessKey"
                        className="w-full classic-typing-input-on-white"
                      />
                    </div>
                    <div className="flex flex-col w-full items-start p-2 gap-3">
                      <label className="font-bold">Region</label>
                      <Field
                        type="text"
                        name="region"
                        className="w-full classic-typing-input-on-white"
                      />
                    </div>
                    <div className="flex flex-col w-full items-start p-2 gap-3">
                      <label className="font-bold">Bucket</label>
                      <Field
                        type="text"
                        name="bucket"
                        className="w-full classic-typing-input-on-white"
                      />
                    </div>
                    <div className="flex flex-col w-full items-start p-2 gap-3">
                      <label className="font-bold">Directory</label>
                      <Field
                        type="text"
                        name="directory"
                        className="w-full classic-typing-input-on-white"
                      />
                      <span>
                        Directory files should be uploaded to (e.g.
                        path/to/folder). Defaults to the root directory.
                      </span>
                    </div>
                    <div className="flex flex-col w-full items-start p-2 gap-3">
                      <label className="font-bold">Allowed Mimes</label>
                      <Field
                        type="text"
                        name="allowedMimes"
                        className="w-full classic-typing-input-on-white"
                      />
                      <span>
                        A comma separated list of allowed extensions (e.g.
                        pdf,doc,txt).
                      </span>
                    </div>

                    <div className="flex flex-col w-full items-start p-2 gap-3">
                      <label className="font-bold">
                        Max File Upload Size (in Kilobytes):
                      </label>
                      <Field
                        type="text"
                        name="uploadFileSize"
                        className="w-full classic-typing-input-on-white"
                      />
                      <span>
                        The default max file upload size is 25000KB (25MB).
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex  justify-end  item-end p-4 w-full">
                  <button className="p-4 btn btn-indigo ">
                    UPDATE FILE UPLOADS
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
        {/* ///File Uploads */}

        {/* ////Blocked Emails */}

        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleBlockMail}
        >
          <Form className="w-full">
            <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
              <div className="flex flex-col items-start w-full">
                <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
                  <h1>Blocked Emails</h1>
                </div>
                <div className="flex  w-full items-start text-start p-2 gap-3">
                  <label>
                    You may block submission based on a predefined set of
                    emails. For this to work, your form must have a field named
                    `email`.
                  </label>
                </div>
                <div className="flex flex-col w-full items-start p-2 gap-3">
                  <label>Email</label>
                  <Field
                    type="text"
                    name="blockedMails"
                    className="w-full classic-typing-input-on-white"
                  />
                </div>

                <div className="flex  justify-end  item-end p-4 w-full">
                  <button className="p-4 btn btn-indigo " type="submit">
                    ADD BLOCKED EMAIL
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
        {/* ////Blocked Emails */}

        {/* Delete Form */}

        <div className="flex items-center justify-center  w-full text-center  bg-white py-10 px-4">
          <div className="flex flex-col items-start w-full gap-3">
            <div className="flex  justify-start items-start p-2 text-xl font-bold border-b-2 w-full">
              <h1>Delete Form</h1>
            </div>
            <div className="flex  bg-gray w-full items-start text-start p-3 gap-3">
              <svg
                class="w-6 h-6 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <p>
                This will delete this form and all its submissions.{" "}
                <strong>This cannot be undone.</strong>
              </p>
            </div>

            <div className="flex  justify-end  item-end p-4 w-full">
              <button className="p-4 btn btn-lg btn-red uppercase  ">
                Delete Form
              </button>
            </div>
          </div>
        </div>
        {/* Delete Form */}
      </div>
    </>
  );
};

export default Configuration;
