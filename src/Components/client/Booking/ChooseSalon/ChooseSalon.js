import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ChooseSalon.scss";

const salonLocations = [
  { id: "addr1", first_name: "123 Elm St, Springfield, IL 62701" },
  { id: "addr2", first_name: "456 Maple Ave, Lincoln, NE 68508" },
  { id: "addr3", first_name: "789 Oak Dr, Denver, CO 80203" },
  { id: "addr4", first_name: "101 Pine St, Seattle, WA 98101" },
  { id: "addr5", first_name: "202 Birch Blvd, Austin, TX 73301" },
  { id: "addr6", first_name: "303 Cedar Ct, Nashville, TN 37201" },
  { id: "addr7", first_name: "404 Spruce Rd, Orlando, FL 32801" },
  { id: "addr8", first_name: "505 Willow Way, Boston, MA 02108" },
  { id: "addr9", first_name: "606 Ash Ln, Miami, FL 33101" },
  { id: "addr10", first_name: "707 Cherry Pl, San Francisco, CA 94101" },
];

export default function ChooseSalon() {
  const [searchValue, setSearchValue] = useState("");

  //set data là các chi nhánh
  const [searchRst, setSearchRst] = useState(salonLocations);

  const inputRef = useRef();
  console.log(searchRst);
  // lấy data sau khi search
  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchRst(salonLocations);
      return;
    }

    axios
      .get(`https://tiktok.fullstack.edu.vn/api/users/search`, {
        params: {
          q: searchValue,
          type: "less",
        },
      })
      .then((res) => {
        setSearchRst(res.data.data);
      });
  }, [searchValue]);

  //
  const handleClick = () => {
    setSearchValue(" ");
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className="chooseSalon">
        {/* thanh vertical nha cái nào đang chọn thì thêm active vô ko đc chọn thì thêm class disable */}
        <div className="tagNavigation">
          <ul class="tagNavigation__item">
            <li class="tagNavigation__item-content">
              <Link to="/booking/step1">
                <div class="filled"></div>

                <CiHome />
              </Link>
              <div class="tooltip">Salon</div>
            </li>
            <li class="tagNavigation__item-content active">
              <Link to="/booking/step1">
                <div class="filled"></div>

                <PiScissors />
              </Link>
              <div class="tooltip">Service</div>
            </li>
            <li class="tagNavigation__item-content">
              <Link to="/booking/step1">
                <div class="filled"></div>

                <RiCalendarScheduleLine />
              </Link>
              <div class="tooltip">Time</div>
            </li>
            <li class="tagNavigation__item-content disable">
              <Link to="/booking/step1">
                <div class="filled"></div>

                <SlPeople />
              </Link>
              <div class="tooltip">Stylist</div>
            </li>
          </ul>
        </div>

        <div
          className="chooseSalon__container
          "
        >
          <div className="chooseSalon__container-header">
            <Link to="/booking">
              <FaArrowLeft className="chooseSalon-icon" />
            </Link>
            <h1>Choose salon </h1>
          </div>
          <div className="chooseSalon__container-search">
            <IoSearchOutline className="chooseSalon-icon" />
            <input
              ref={inputRef}
              placeholder="Search for salons by address..."
              value={searchValue}
              onChange={handleChange}
            />
            <IoCloseCircle
              className="chooseSalon-closeIcon"
              onClick={handleClick}
            />
          </div>

          <div className="chooseSalon__container-locations">
            F-salon is available in the following :
          </div>
          <div className="chooseSalon__container-lists">
            {searchRst.map((branch) => (
              <Link to="/booking/step2" key={branch.id}>
                {branch.first_name}
              </Link>
            ))}
          </div>
          {/* <button className="chooseSalon__container-btn btn flex">
            Next Step
            <FaArrowRight className="chooseSalon-icon" />
          </button> */}
        </div>
      </div>
    </>
  );
}
