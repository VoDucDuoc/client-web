import React from "react";
import { IoCall, IoLocation, IoPhonePortrait } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./style.css";
const Footer = (props) => {
  return (
    <div className="footer">
      <div className="grid wide">
        <div className="row mt-32">
          <div className="col lg-4">
            <p className="footer__heading">CONTACT US</p>
            <ul className="footer__list">
              <li>
                <span className="footer__content">
                  <IoLocation className="footer__icon" />
                  99 Pham Van Dong, Thu Duc, Ho Chi Minh
                </span>
              </li>
              <li>
                <span className="footer__content">
                  <IoPhonePortrait className="footer__icon" />
                  (+84) 123456789
                </span>
              </li>
              <li>
                <span className="footer__content">
                  <IoCall className="footer__icon" />
                  (+84) 123456789
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
