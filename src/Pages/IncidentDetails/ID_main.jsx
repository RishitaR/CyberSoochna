import React from "react";
import "./ID_main.css";
import Em from "../../components/Emergency/Em";
import UFP_red from "../UserDetails/UserForm/UFP_red";
import IDX from "./IDX";
import { Link } from "react-router-dom";
import { useState } from "react";

const ID_main = () => {
  const [count, setCount] = useState(1500);
  const [complaintCategory, setComplaintCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [other, setOther] = useState("");

  const complaintCategories = [
    { name: "Category A", subcategories: ["Subcategory A1", "Subcategory A2"] },
    { name: "Category B", subcategories: ["Subcategory B1", "Subcategory B2"] },
    { name: "Category C", subcategories: ["Subcategory C1", "Subcategory C2"] }
  ];

  const otherOptions = ["Option 1", "Option 2", "Option 3"];

  const handleChooseFile = () => {
    // Implement file selection logic here
    // This function will be called when the "Choose" input is clicked
  };


  return (
    <div className="ISD_component">
      <div className="ISD_innercomponent">
        <Em />
        <div className="UD_up_bar"></div>
        <UFP_red />
        <div className="UD_up_bar"></div>
        <IDX />
        <div className="ISD_innerComp2">
          <div className="ISD_susdetail_bar">
            <p className="ISD_sus_text">Complaint/ Incident Details</p>
          </div>
          <div className="ISD_formComp_1">
          <div className="ISD_vertical_input">
              <p className="ISD_vi_text">Complaint Category :</p>
              <select
                className="ISD_vi_input"
                value={complaintCategory}
                onChange={(e) => {
                  setComplaintCategory(e.target.value);
                  setSubCategory("");
                }}
              >
                <option value="">Select Category</option>
                {complaintCategories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {complaintCategory === "Category A" && (
              <div className="ISD_vertical_input">
                <p className="ISD_vi_text">Sub Category :</p>
                <select
                  className="ISD_vi_input"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {complaintCategories
                    .find((cat) => cat.name === "Category A")
                    .subcategories.map((sub, index) => (
                      <option key={index} value={sub}>
                        {sub}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className="ISD_block"></div>
          </div>
        
          <div className="ISDL_formComp_1">
          <div className="ISD_vertical_input">
              <p className="ISD_vi_text">Other :</p>
              <select
                className="ISD_vi_input"
                value={other}
                onChange={(e) => setOther(e.target.value)}
              >
                <option value="">Select Option</option>
                {otherOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="ISD_block"></div>
          <div className="ISDL2_formComp_1">
            <div className="ISD_vertical_input">
              <p id="ISDT" className="ISD_vi_text">
                Appropriate date and time for incident/ <br /> receiving/
                viewing of content: :
              </p>
              <input
                type="datetime-local"
                className="ISD_vi_input"
                id="ISDI"
                placeholder="time"
              />
              <input
                type="text"
                className="ISD_vi_input"
                id="ISDI"
                placeholder="Am/Pm"
              />
            </div>
            <div className="ISD_vertical_input">
              <p className="ISD_vi_text" id="ISD_vi_text_id">
                Delay in reporting? :
              </p>
              <div className="radio_isd"></div>
              <input type="radio" placeholder="yes" className="radio_isd" />
              <label className="radio_text_isd" htmlFor="yes">
                Yes
              </label>
              <input type="radio" placeholder="no" className="radio_isd" />
              <label className="radio_text_isd" htmlFor="no">
                No
              </label>
            </div>
            <div className="ISD_vertical_input">
              <p className="ISD_vi_text">Where did the incident occur? :</p>
              <input type="text" className="ISD_vi_input" placeholder="Place" />
            </div>
            <div className="ISD_vertical_input">
              <p className="ISD_vi_text">Email ID: :</p>
              <input
                type="email"
                className="ISD_vi_input"
                placeholder="Enter your E-mail ID"
              />
            </div>
            <div className="ISD_vertical_input">
              <p className="ISD_vi_text">
                Supporting Evidence <br /> (upload Image/ Media/ Pdf):
              </p>
              <input
                type="file"
                className="ISD_vi_input-file"
                onClick={handleChooseFile}
                style={{ display: "none" }}
              />
              <input
                type="text"
                className="ISD_vi_input-text"
                placeholder="No file Chosen"
                onClick={() =>
                  document.querySelector(".ISD_vi_input-file").click()
                }
                readOnly
              />
               <Link className="SS_button">Upload</Link>
            </div>
            <div className="ISD_block"></div>
            <div className="ISD_vertical_input" id="ISD_VI">
              <p className="ISD_vi_text">Please provide any additional <br /> information about the incident: :</p>
              <input
                type="email"
                className="ISD_vi_input"
                id="ISDVII"
                placeholder="Enter your E-mail ID"
              />
              <Link  className="ss_save_btn2" id="ss_b">Save and Submit</Link>
              
            </div>
            <p className="ISD_lasttext">Maximum of 1500 characters: {count} characters left</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ID_main;