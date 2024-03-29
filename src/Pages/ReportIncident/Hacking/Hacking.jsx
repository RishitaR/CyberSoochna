import React from 'react';
import '../ReportIncident.css';
import Em from '../../../components/Emergency/Em';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

const Hacking = () => {
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
                        <Link to="/hacking" className="ReportButton">
                            <span className="IncidentHeader">Hacking</span>
                        </Link>
                        
                    </div>
                    <div className="AlignmentForVictimReport">
                        <Link to="/reportbutton" className="BoxVictimReport">
                            <span className="TextVictimReport">I report</span>
                        </Link>
                        <Link to="/hacking" className="BoxVictimReport">
                            <span className="TextVictimReport">hacking scams that include Ethical Hacking, Malware Attacks,Password Attacks etc</span>
                        </Link>
                    </div>

                </div>
            </div>

{/* 
            <div className="CSSForSmallerButton">
                <Link to="/cyberbullying" className="SmallerButtonCSS">
                    <span className="SmallerTextButton">Financial Frauds</span>
                </Link>
                
                <Link to="/reportbutton" className="SmallerButtonCSS">
                    <span className="SmallerTextButton">Tech Support Scams</span>
                </Link>
                <Link to="/reportbutton" className="SmallerButtonCSS">
                    <span className="SmallerTextButton">Privacy Violations</span>
                </Link>
                
            </div> */}

        </div>
    )
}

export default Hacking;