import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import api from "../../../config/axios";
import "./ServiceDetails.scss";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ServicesDetails() {
  const [serviceData, setServiceData] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const serviceId = state.serviceId;
  useEffect(() => {
    const fetchServiceData = async (page) => {
      try {
        const response = await api.get(`service/${serviceId}`);
        console.log(response);
        const data = response.data.result;

        if (data) {
          setServiceData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchServiceData();
  }, []);

  function convertTimeFormat(time) {
    if (!time) return "";
    const [hours, minutes] = time.split(":");

    return `${hours}h${minutes}`;
  }

  function removePTags(input) {
    if (!input) return "";
    return input.replace(/<\/?p>/g, "");
  }
  const formatCurrency = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };
  const handleClick = (serviceId) => {
    sessionStorage.setItem("selectedServicesId", JSON.stringify([serviceId]));
    navigate("/booking/step1");
  };

  return (
    <>
      <div className="servicesDetails">
        <div className="servicesDetails__header">
          <h1>SERVICES DETAILS</h1>
        </div>

        <div className="servicesDetails__main">
          <div className="servicesDetails__main-left">
            <img alt={serviceData.serviceName} src={serviceData.image} />
          </div>
          <div className="servicesDetails__main-right">
            <h1>
              <span>{serviceData.serviceName}</span>
            </h1>
            <h2>
              ✂️ <span>{serviceData.skillName}</span>
            </h2>
            <h2>
              ⏰<span>{convertTimeFormat(serviceData.duration)}</span>
            </h2>
            <h2>
              💸<span>{formatCurrency(serviceData.price)}</span>
            </h2>
            <h3>{removePTags(serviceData.description)}</h3>

            <div className="servicesDetails-btn">
              <button onClick={() => handleClick(serviceData.id)}>
                🛒 Booking Now
              </button>
            </div>
          </div>
        </div>

        <div className="servicesDetails__list">
          <ImageList
            sx={{ width: 500, height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {(serviceData.collectionsImage || []).map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    </>
  );
}
