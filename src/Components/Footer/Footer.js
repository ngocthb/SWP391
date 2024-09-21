/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from "react";

import { Bs0CircleFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import "./Footer.scss";
export default function Footer() {
  return (
    <div className="footer ">
      <div className="footer__container container grid">
        <div>
          <div className="footer__Logo">
            <a href="#" className=" flex">
              <h1 className="flex">
                <Bs0CircleFill className="footer__Logo-icon" />
                F-Salon
              </h1>
            </a>
          </div>
          <div className="footer__socials flex">
            <FaFacebookF className="footer__socials-icon" />
            <AiFillInstagram className="footer__socials-icon" />
            <FaTwitter className="footer__socials-icon" />
          </div>
        </div>

        <div className="footer__Links">
          <span className="footer__Links-linkTitle">Information</span>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Explore</a>
          </li>
          <li>
            <a href="#">Service</a>
          </li>
          <li>
            <a href="#">Blogs</a>
          </li>
        </div>
        <div className="footer__Links">
          <span className="footer__Links-linkTitle">Helpful Links</span>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Service & Conditions</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </div>
        <div className="footer__Links">
          <span className="footer__Links-linkTitle">Contact Us</span>
          <span className="phone">+444 555 666</span>
          <span className="email">abcd@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
