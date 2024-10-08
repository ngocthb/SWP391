import { FiTrash2 } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import { RiTimeLine } from "react-icons/ri";
import { LiaUserEditSolid } from "react-icons/lia";

import React, { useState } from "react";

import { Modal } from "antd";

import * as UpdateMyBooking from "./UpdateMyBooking/UpdateMyBooking";

import "./MyBooking.scss";
import services from "../../../data/services";

export default function MyBooking() {
  const { confirm } = Modal;
  const [activeTab, setActiveTab] = useState("finish");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showConfirm = () => {
    confirm({
      title: "Do you want to cancel this booking?",

      content: "Some descriptions",
      onOk() {
        // console.log("OK");
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };
  const [currentStep, setCurrentStep] = useState("salon"); // Start with salon selection

  const handleNextStep = () => {
    if (currentStep === "salon") {
      setCurrentStep("service");
    } else if (currentStep === "service") {
      setCurrentStep("stylist");
    } else if (currentStep === "stylist") {
      setCurrentStep("dateTime");
    } else if (currentStep === "dateTime") {
      setCurrentStep("dateTime");
    }
  };
  return (
    <>
      <div className="myBooking">
        <div className="myBooking__tabs">
          <label
            onClick={() => setActiveTab("finish")}
            htmlFor="tab1"
            className={activeTab === "finish" ? "label-active" : ""}
          >
            Finish
          </label>

          <label
            onClick={() => setActiveTab("coming")}
            htmlFor="tab2"
            className={activeTab === "coming" ? "label-active" : ""}
          >
            Coming
          </label>

          <div className="myBooking__tabs-panels">
            {/* xem lịch sử giao dịch và thêm feedback */}
            {activeTab === "finish" && (
              <section className="tab-panel">
                <h2>Booking history </h2>
                <div className="panel">
                  {(services || []).map((service) => (
                    <div key={service.id} className="panel__card">
                      {/* <img alt="Service Img" src={service.image} /> */}
                      <div className="panel__card-info">
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>

                        <div className="panel-action" onClick={showModal}>
                          <button className="panel-btn btn">
                            <VscFeedback className="myBooking-icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Modal
                  title="Feedback"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  okText="Send"
                  className="myBooking__model"
                >
                  <div className="model__rating">
                    <input id="rating-5" type="radio" name="rating" value="5" />
                    <label htmlFor="rating-5" title="5 stars">
                      <svg
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                      </svg>
                    </label>

                    <input id="rating-4" type="radio" name="rating" value="4" />
                    <label htmlFor="rating-4" title="4 stars">
                      <svg
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                      </svg>
                    </label>

                    <input id="rating-3" type="radio" name="rating" value="3" />
                    <label htmlFor="rating-3" title="3 stars">
                      <svg
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                      </svg>
                    </label>

                    <input id="rating-2" type="radio" name="rating" value="2" />
                    <label htmlFor="rating-2" title="2 stars">
                      <svg
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                      </svg>
                    </label>

                    <input id="rating-1" type="radio" name="rating" value="1" />
                    <label htmlFor="rating-1" title="1 star">
                      <svg
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                      </svg>
                    </label>
                  </div>

                  <div className="model__feedback">
                    <label htmlFor="input" className="text">
                      Write feedback here:
                    </label>
                    <textarea
                      type="text"
                      placeholder="Write here..."
                      name="input"
                      className="input"
                      rows={5}
                    />
                  </div>
                </Modal>
              </section>
            )}

            {/* update và xóa booking */}
            {activeTab === "coming" && (
              <section className="tab-panel">
                <h2>Booking upcoming </h2>
                <div className="panel">
                  {(services || []).map((service) => (
                    <div key={service.id} className="panel__card">
                      <div className="panel__card-items">
                        <div
                          className="panel__card-item"
                          // onClick={() => showModal(<chooseSalon />)}
                        >
                          <label>Salon</label>
                          <div className="form-input">
                            <CiHome className="form-icon" />
                            <input
                              type="text"
                              placeholder="View All Salons"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="panel__card-item">
                          <label>Service</label>
                          <div className="form-input">
                            <PiScissors className="form-icon" />
                            <input placeholder="View all  services" readOnly />
                          </div>
                        </div>

                        <div className="panel__card-item">
                          <label>Date</label>
                          <div className="form-input">
                            <RiCalendarScheduleLine className="form-icon" />
                            <input
                              type="text"
                              placeholder="View Selected Date"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="panel__card-item">
                          <label>Time</label>
                          <div className="form-input">
                            <RiTimeLine className="form-icon" />
                            <input
                              type="text"
                              placeholder="View Selected Time"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="panel__card-item">
                          <label>Stylist</label>
                          <div className="form-input">
                            <SlPeople className="form-icon" />
                            <input
                              type="text"
                              placeholder="View All Stylists"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="panel-actions">
                          <button
                            className="panel-btn btn"
                            onClick={() =>
                              showModal(<UpdateMyBooking.ChooseSalon />)
                            }
                          >
                            <LiaUserEditSolid className="myBooking-icon" />
                          </button>
                          <button
                            className="panel-btn btn"
                            onClick={showConfirm}
                          >
                            <FiTrash2 className="myBooking-icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Modal
                  open={isModalOpen}
                  onCancel={() => setIsModalOpen(false)}
                  footer={null} // We will provide our own footer
                >
                  {currentStep === "salon" ? (
                    <UpdateMyBooking.ChooseSalon onNext={handleNextStep} />
                  ) : currentStep === "service" ? (
                    <UpdateMyBooking.ChooseService onNext={handleNextStep} />
                  ) : currentStep === "stylist" ? (
                    <UpdateMyBooking.ChooseStylist onNext={handleNextStep} />
                  ) : currentStep === "dateTime" ? (
                    <UpdateMyBooking.ChooseDateTime />
                  ) : null}
                </Modal>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
