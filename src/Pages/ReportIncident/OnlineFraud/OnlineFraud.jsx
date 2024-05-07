import React from 'react';
import '../ReportIncident.css';
import Em from '../../../components/Emergency/Em';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { GrLinkPrevious } from "react-icons/gr";
import { getDatabase, ref, push,remove  } from "firebase/database";

const OnlineFrauds = () => {
    const db = getDatabase();

    const handleClick = (category) => {
        const reportsRef = ref(db, 'victim/subcategory/');

        // Clear existing data in the temporary_reports node
        remove(reportsRef)
            .then(() => {
                // Add the new category to the database
                push(reportsRef, category)
                    
                    .catch((error) => {
                        console.error("Error writing to database:", error.message);
                        alert("Error in adding report");
                    });
            })
            .catch((error) => {
                console.error("Error removing data from database:", error.message);
                alert("Error in removing existing report data");
            });
    };
    return (
        <div className='ReportContainer'>
            <Em />
            <div className="Reporttheblock">
                <div className="FinalAlign">
                    <div className="Report-An-Incident-Immediately">Report An Incident Immediately</div>
                    <div className="ReportLine"></div>
                </div>
                <div className="TextBoxText">
                    <div className="forLinks">
                        <Link to="/" className="Home">
                            <span className="IncidentHeader">HomePage</span>
                        </Link>
                        <FaArrowRightLong className='ArrowIcon' />
                        <Link to="/reportincident" className="ReportIncident">
                            <span className="IncidentHeader">ReportIncident</span>
                        </Link>
                        <FaArrowRightLong className='ArrowIcon' />
                        <Link to="/reportbutton" className="ReportButton">
                            <span className="IncidentHeader">Report</span>
                        </Link>
                        <FaArrowRightLong className='ArrowIcon' />
                        <Link to="/onlinefrauds" className="ReportButton">
                            <span className="IncidentHeader">Online Frauds</span>
                        </Link>
                    </div>
                    <div className="AlignmentForVictimReport">
                        <Link to="/reportbutton" className="BoxVictimReport">
                            <span className="TextVictimReport">I report</span>
                        </Link>
                        <Link to="/onlinefrauds" className="BoxVictimReport">
                            <span className="TextVictimReport">online fraud against</span>
                        </Link>
                    </div>

                </div>
                <div className="NormalPagePrev">
                <Link to="/reportbutton" className="PreviousButton">
                <GrLinkPrevious className='ArrowIcon' />
                <div>Previous</div>
                </Link>
                </div>
            </div>


            <div className="CSSForSmallerButton">
                <Link to="/financialfrauds" className="SmallerButtonCSS" onClick={() => handleClick("Financial Frauds")}>
                    <span className="SmallerTextButton">Financial Frauds</span>
                </Link>
                
                <Link to="/technical" className="SmallerButtonCSS" onClick={() => handleClick("Tech Support Scams")}>
                    <span className="SmallerTextButton">Tech Support Scams</span>
                </Link>
                <Link to="/pv" className="SmallerButtonCSS" onClick={() => handleClick("Privacy Violations")}>
                    <span className="SmallerTextButton">Privacy Violations</span>
                </Link>
                
            </div>

        </div>
    )
}

export default OnlineFrauds