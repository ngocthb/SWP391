import { React } from "react";

import { RiScissorsFill } from "react-icons/ri";
import { FiDroplet } from "react-icons/fi";
import { PiHairDryerBold } from "react-icons/pi";
import { GiComb } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa6";
import "./PopularService.scss";
import services from "../../../data/services";
const Data = services;
export default function PopularService() {
  return (
    <section className="service container section">
      <div className="service__container">
        <div className="service__container-title">
          <h2>Popular Combo</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            esse consequatur veniam quis fugit?
          </p>
        </div>

        <div className="mainContent grid">
          {Data.map((item) => (
            <div key={item.id} className="service__combo">
              <div className="service__combo-img">
                <img src={item.imgSrc} alt={item.nameService} />
                <span className="service__combo-discount">{item.discount}</span>
              </div>

              <div className="service__details">
                <div className="service__details-price flex">
                  <h4>{item.price}</h4>
                  <span>Hot</span>
                </div>
                <div className="service__name flex">
                  <div className="service__name-single flex">
                    <RiScissorsFill className="icon" />
                    <small>Haircuts</small>
                  </div>
                  <div className="service__name-single flex">
                    <PiHairDryerBold className="icon" />
                    <small>Hair dryer</small>
                  </div>
                  <div className="service__name-single flex">
                    <FiDroplet className="icon" />
                    <small>Hair dye</small>
                  </div>
                  <div className="service__name-single  flex">
                    <GiComb className="icon" />
                    <small>Hair combing</small>
                  </div>
                </div>

                <small>{item.description}</small>

                <button className="service__details-btn btn flex">
                  Booking Now
                  <FaArrowRight className="service__details-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
