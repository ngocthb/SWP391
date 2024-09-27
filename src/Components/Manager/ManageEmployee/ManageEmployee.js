/* eslint-disable jsx-a11y/img-redundant-alt */
import { React } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { HiTrash } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa";
import staffs from "../../../data/staff";
import "./ManageEmployee.scss";

export default function ManageEmployee({ buttonLabel }) {
  const employees = staffs;
  return (
    <>
      <div className="ManageEmployee">
        <div className="ManageEmployee__header">
          <div className="ManageEmployee__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            {/* <i class="fas fa-search"></i> */}
            <input placeholder="Search here..." type="text" />
          </div>
          <div className="ManageEmployee__header-filter">
            <select>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <button> {buttonLabel}</button>
          </div>
        </div>
        <div className="container">
          {(employees || []).map((employee) => (
            <div key={employee.id} className="container__card">
              <img
                alt="Profile picture"
                height="50"
                src={employee.imgSrc}
                width="50"
              />
              <h3>{employee.name}</h3>
              <p>Stylist at {employee.location}</p>
              <div className="container__card-info">
                <p>
                  <FaLocationDot />
                  {/* <i class="fas fa-map-marker-alt"></i>*/}
                  Jakarta, Indonesia
                </p>
                <p>
                  <FaPhone /> {employee.phone}
                </p>
                <p>
                  <IoMail />
                  {employee.email}
                </p>
              </div>
              <div className="container__card-actions">
                <button className="delete btn">
                  <HiTrash />
                </button>
                <button className="update btn">
                  <FaUserEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="ManageEmployee__pagination">
          <p>Showing 1-6 from {employees.length} data</p>
          <div className="ManageEmployee__pagination-pages">
            <span>
              {/* <i class="fas fa-chevron-left"></i> */}
              <FaAngleLeft className="pagination-icon" />
            </span>
            <span className="active">1</span>
            <span>2</span>
            <span>3</span>
            <span>
              {/* <i class="fas fa-chevron-right"></i> */}
              <FaChevronRight className="pagination-icon" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}