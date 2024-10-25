import { Link } from "react-router-dom";

import { MdArrowOutward } from "react-icons/md";

import "./Services.scss";

export default function Services() {
  return (
    <>
      <div className="services">
        <div className="services__header">
          <h1>OUR SERVICES</h1>
        </div>
        <div className="services__container">
          <div className="services__container-header">
            <h1>Leading Companies Have Trusted Us</h1>
          </div>
          <div className="services__container-cards">
            {/* <div className="card">
              <div className="card-image">
                <img
                  alt="Image of Trust & Co. product in a desert setting"
                  height="200"
                  src="https://storage.googleapis.com/a1aa/image/1mqUEZG5VQbRGZ7NeepF9BlS7rNi23uInhms2OyjQua3DXpTA.jpg"
                  width="300"
                  className="card-image"
                />
                <div className="icon">
                  <GoArrowUpRight />
                </div>
              </div>
              <div className="card-content">
                <h3>Trust & Co.</h3>
                <p>
                  Fill out the form and the algorithm will offer the right team
                  of experts
                </p>
                <div className="tags">
 
                </div>
              </div>
            </div> */}

            <div className="card-list">
              <div class="card">
                <div class="top-section">
                  <img
                    src="https://i.pinimg.com/736x/2e/3d/68/2e3d6845011de0d24c13dd1e1028a2ff.jpg"
                    alt="a"
                  />

                  <div class="icons">
                    <div class="logo">
                      <MdArrowOutward />
                    </div>
                  </div>
                </div>
                <div class="bottom-section">
                  <span class="title">UNIVERSE OF UI</span>
                  <div class="row row1">
                    <div class="item">
                      <span class="big-text">2626</span>
                      <span class="regular-text">UI elements</span>
                    </div>
                    <div class="item">
                      <span class="big-text">100%</span>
                      <span class="regular-text">Free for use</span>
                    </div>
                    <div class="item">
                      <span class="big-text">38,631</span>
                      <span class="regular-text">Contributers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="services__footer">
          <div className="grid-item item1">
            <h2>Hottest news</h2>
            <p>#auray</p>
          </div>
          <div className="grid-item item2">
            <h2>Summer Essentials</h2>
            <p>Discover</p>
          </div>
          <div className="grid-item item3">
            <h2>Explore great</h2>
            <p>saving</p>
          </div>
          <div className="grid-item item4">
            <h2>Discounts</h2>
            <p>& offers</p>
          </div>
          <div className="grid-item item5">
            <h2>Attention</h2>
            <p>to Details</p>
          </div>
        </div>
      </div>
    </>
  );
}
