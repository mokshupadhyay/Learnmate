import React from "react";
import "./About.css";
import { Footer1 } from "./Footer1";
import {
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiPython,
  DiMysql,
  DiJava,
  DiJavascript,
  DiCss3,
} from "react-icons/di";
import { SiFirebase } from "react-icons/si";
import laptopImg from "../Assets/about.png";

function About() {
  "";
  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    // alignItems: 'center',
    padding: "30px",
  };

  const linkStyle = {
    color: "black",
    textDecoration: "inherit",
  };

  const languageSelectorContainerStyle = {
    marginRight: "-150px",
    position: "relative", // Add position relative to enable positioning of the dropdown
  };

  const languageSelectorStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "2px solid #fff", // Add a border for better visibility
    backgroundColor: "#333", // Background color for the selector
    color: "#fff", // Text color
    cursor: "pointer",
    marginLeft: "30px",
  };

  const buttonContainerStyle = {
    marginLeft: "30px",
  };
  return (
    <div>
      <div className="about-section">
        <rowd>
          <cold md={6} className="home-about-description">
            <h1 className="heading">
              Let me <strong className="main-name purple">introduce</strong>
              {/* <br /> */}
              Myself
            </h1>
            <p>
              I am a software engineer with a passion for creating innovative
              software solutions. I have experience in a variety of technologies
              and enjoy working on both front-end and back-end development
              projects.
            </p>
            <p className="aboutpara">My tech stack includes:</p>

            <div className="tech-icons">
              <DiReact className="abouticon" />
              <DiNodejs className="abouticon" />
              <DiPython className="abouticon" />
              <DiMysql className="abouticon" />
              <DiJava className="abouticon" />
              <DiJavascript className="abouticon" />
              <DiMongodb className="abouticon" />
              <DiGit className="abouticon" />
              <DiCss3 className="abouticon" />
              <SiFirebase className="abouticon" />
            </div>
          </cold>

          <cold md={6} className="about-img">
            <img src={laptopImg} alt="about" className="img-fluid" />
          </cold>
        </rowd>
      </div>
      <div className="imagelmfooter"></div>

      <div>
       <Footer1/>
      </div>
    </div>
  );
}

export default About;
