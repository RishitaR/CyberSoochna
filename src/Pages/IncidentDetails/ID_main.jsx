import React from "react";
import "./ID_main.css";
import Em from "../../components/Emergency/Em";
import UFP_red from "../UserDetails/UserForm/UFP_red";
import IDX from "./IDX";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UP_bar from "../UserDetails/Userprofilebar/UP_bar";
import { useAuth } from "../../FirebaseCongfig/AuthContext"; // Import the useAuth hook
import { getDatabase, ref, push, set} from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

const ID_main = () => {
  const [complaintCategory, setComplaintCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [ICdob, setICdob] = useState("");
  const [ICplace, setICPlace] = useState("");
  const [ICemail, setICEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [other, setOther] = useState("");
  const [delayReporting, setDelayReporting] = useState("");
  const maxChars = 1500; // Maximum allowed characters
  const [inputValue, setInputValue] = useState(''); // State to hold the input field value
  const [charsLeft, setCharsLeft] = useState(maxChars); // State to hold the  of characters left
  const { currentUser } = useAuth(); // Get currentUser from the authentication context
  const db = getDatabase();
  const storage = getStorage();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChooseFile = (e) => {
    // Update selected file state when a file is chosen
    setSelectedFile(e.target.files[0]);
  };
  useEffect(() => {
    // Redirect unauthenticated users to login page or handle them accordingly
    if (!currentUser) {
      console.log("User not authenticated. Redirecting to login page...");
      // Navigate to login page or show a message
    } else {
      // User is authenticated, proceed with rendering the form
      console.log("User authenticated:", currentUser);
      setEmail(currentUser.email); // Set email directly from currentUser
    }
  }, [currentUser]);


  const generateIncidentID = () => {
    let categoryPrefix = "";
    let subCategoryPrefix = "";

    if (complaintCategory === "Financial Fraud") {
      categoryPrefix = "fn";
      if (subCategory === "UPI/Credit Card") {
        subCategoryPrefix = "upicc";
      } else if (subCategory === "Bank Scams") {
        subCategoryPrefix = "bksm";
      } else if (subCategory === "Website Scams") {
        subCategoryPrefix = "wbsm";
      }
    } else if (complaintCategory === "Non-Financial Fraud") {
      categoryPrefix = "nfn";
      if (subCategory === "Sexual Harassment") {
        subCategoryPrefix = "sxh";
      } else if (subCategory === "Cyber Terrorism") {
        subCategoryPrefix = "cbtm";
      } else if (subCategory === "Ransomware") {
        subCategoryPrefix = "rsmw";
      }
    }

    const incidentRef = ref(db, `users/${currentUser.uid}/incidentdetails`);
    const newIncidentRef = push(incidentRef);
    const newIncidentKey = newIncidentRef.key;
    // return `${categoryPrefix}${newIncidentKey}${subCategoryPrefix}`;
    const incidentsID = `${categoryPrefix}${newIncidentKey}${subCategoryPrefix}`;
    localStorage.setItem("incidentID", incidentsID); // Store incident ID in local storage
    return incidentsID;
  };

  const handleSaveAndSubmit = async () => {
    // Prepare data to store in Realtime Database
    const data = {
      complaintCategory: complaintCategory,
      subCategory: subCategory,
      other: other,
      DateTime: ICdob,
      Place: ICplace,
      Email: ICemail,
      Description: inputValue,
      delayReporting: delayReporting,
      // Add other form fields as needed
    };

    try {
      // Generate a unique ID for the incident
      // Store form data in Realtime Database with the unique ID
      const incidentID = generateIncidentID();
      await set(ref(db, `users/${currentUser.uid}/incidentdetails/${incidentID}`), data);
      await set(ref(db, `incidents/${currentUser.uid}/incidentdetails/${incidentID}`), data);
      console.log("Data saved successfully!");
      window.alert("Data added successfully!");
      navigate("/suspectdetails");
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  // const complaintCategories = [
  //   {
  //     name: "Financial Fraud",
  //     subcategories: ["UPI/Credit Card", "Bank Scams", "Website Scams"],
  //   },
  //   {
  //     name: "Non-Financial Fraud",
  //     subcategories: ["Sexual Harassment", "Cyber Terrorism", "Ransomware"],
  //   },
  // ];

  // const renderSubCategorySelect = () => {
  //   if (
  //     complaintCategory &&
  //     complaintCategories.some((cat) => cat.name === complaintCategory)
  //   ) {
  //     return (
  //       <div className="ISD_vertical_input">
  //         <p className="ISD_vi_text">Sub Category:</p>
  //         <select
  //           className={`ISD_vi_input ${subCategory ? "" : "change_color"}`}
  //           value={subCategory}
  //           onChange={(e) => setSubCategory(e.target.value)}
  //         >
  //           <option value="">Select Subcategory</option>
  //           {complaintCategories
  //             .find((cat) => cat.name === complaintCategory)
  //             .subcategories.map((sub, index) => (
  //               <option key={index} value={sub}>
  //                 {sub}
  //               </option>
  //             ))}
  //         </select>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  const handleInputChange = (e) => {
    const newValue = e.target.value; // The updated input value
    setInputValue(newValue); // Update the input field value
    setCharsLeft(maxChars - newValue.length); // Update the remaining characters 
  };

  return (
    <div className="ISD_component">
      <div className="ISD_innercomponent">
        <Em />
        <div className="UD_up_bar"></div>
        <UP_bar />
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
              <p className="ISD_vi_text">Complaint Category:</p>
              <input
                type="text"
                className="ISD_vi_input"
                placeholder="Complaint category"
                value={complaintCategory}
                onChange={(e) => setComplaintCategory(e.target.value)}
              />
              {/* <select
                // className="ISD_vi_input"
                className={`ISD_vi_input ${complaintCategory ? "" : "change_color"
                  }`}
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
              </select> */}
            </div>

            <div className="ISD_vertical_input">
              <p className="ISD_vi_text">Sub Category:</p>
              <input
                type="text"
                className="ISD_vi_input"
                placeholder="Complaint sub-category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>

            {/* {renderSubCategorySelect()} */}

            <div className="ISD_block"></div>
          </div>

          <div className="ISDL_formComp_1">
            <div className="ISD_vertical_input">
              <p className="ISD_vi_text">Other (if any):</p>
              <input
                type="text"
                className="ISD_vi_input"
                placeholder="Enter your specific complaint category"
                value={other}
                onChange={(e) => setOther(e.target.value)}
              />
            </div>
            <div className="ISD_block"></div>
          </div>

          <div className="ISDL2_formComp_1">
            <div className="ISD_vertical_input">
              <p id="ISDT" className="ISD_vi_text">
                Appropriate date and time for incident/ receiving/ viewing of
                content:
              </p>
              <input
                type="datetime-local"
                className="ISD_vi_input"
                id="ISDI"
                placeholder="time"
                value={ICdob}
                onChange={(e) => setICdob(e.target.value)}
              />
            </div>

            <div className="ISD_vertical_input">
              <p className="ISD_vi_text" id="ISD_vi_text_id">
                Delay in reporting?:
              </p>
              <div className="radio_id_btn">
                <div className="radio_isd"></div>
                <input
                  type="radio"
                  placeholder="yes"
                  className="radio_isd_btn"
                  checked={delayReporting === "yes"}
                  onChange={() => setDelayReporting("yes")}
                />
                <label className="radio_text_isd" htmlFor="yes">
                  Yes
                </label>
                <input
                  type="radio"
                  placeholder="no"
                  className="radio_isd_btn"
                  checked={delayReporting === "no"}
                  onChange={() => setDelayReporting("no")}
                />
                <label className="radio_text_isd" htmlFor="no">
                  No
                </label>
              </div>
            </div>
            <div className="ISD_vertical_input">
              <p className="ISD_vi_text">Where did the incident occur?:</p>
              <input
                type="text"
                className="ISD_vi_input"
                placeholder="Enter the place of incident occured"
                value={ICplace}
                onChange={(e) => setICPlace(e.target.value)}
              />
            </div>
            <div className="ISD_vertical_input">
              <p className="ISD_vi_text">Email ID:</p>
              <input
                type="email"
                className="ISD_vi_input"
                placeholder="Enter your E-mail ID"
                value={ICemail}
                onChange={(e) => setICEmail(e.target.value)}
              />
            </div>

            <div className="ISD_vertical_input">
              <p className="ISD_vi_text" id="ISDE">
                Supporting Evidence (upload Image/ Media/ Pdf):
              </p>

              <input type="file" className="input-file" />
              <Link className="SS_button" id="ss_upload">
                Upload
              </Link>
            </div>

            <div className="ISD_block"></div>

            <div className="ISD_vertical_input" id="ISD_VI">
              <p className="ISD_vi_text" id="ISDA">
                Please provide any additional <br /> information about the
                incident:
              </p>
              <input
                type="text" // Changed to 'text' since it's not for email
                className="ISD_vi_input"
                id="ISDVII"
                placeholder="Enter the information here"
                value={inputValue} // Bound to the state value
                onChange={handleInputChange} // Event handler for input change
              />
              <p className="ISD_lasttext">
                (Maximum of 1500 characters: {charsLeft} characters left)
              </p>
            </div>
            <Link
              className="ss_save_btn2"
              id="ss_b"
              onClick={handleSaveAndSubmit}
            >
              Save and Submit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ID_main;
