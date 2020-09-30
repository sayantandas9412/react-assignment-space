import React from "react";
import { AiFillGithub, AiOutlineInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Footer.styles.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <Link className="Story-link" to="/story">
          The Story
        </Link>
        <a
          href="https://github.com/sayantandas9412"
          className="link-github link"
        >
          <AiFillGithub />
        </a>
        <a
          href="https://www.instagram.com/sayantandas9412/"
          className="link-instagram link"
        >
          <AiOutlineInstagram />
        </a>
      </div>
      <p>&#169;King Shan</p>
    </div>
  );
};
export default Footer;
