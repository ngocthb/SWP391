/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { BiSearchAlt } from "react-icons/bi";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Calendar, theme, Spin } from "antd";
import api from "../../../config/axios";
import "./ManagerCalculateSalary.scss";
import Swal from "sweetalert2";

export default function ManagerCalculateSalary() {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectDay, setSelectedDay] = useState(dayjs().format("YYYY-MM"));
  const [manager, setManager] = useState({});
  const navigate = useNavigate();

  const CalendarDropdown = () => {
    const { token } = theme.useToken();
    const wrapperStyle = {
      width: 330,
      borderRadius: token.borderRadiusLG,
      padding: "10px",
      backgroundColor: "#fff",
    };

    const onSelect = (value) => {
      const formattedDate = value.format("YYYY-MM");
      setSelectedDay(formattedDate);
    };

    const disabledDate = (current) => current && current < dayjs().startOf("day");

    return (
      <div style={wrapperStyle}>
        <Calendar
          fullscreen={false}
          onSelect={onSelect}
          value={dayjs(selectDay)}
          disabledDate={disabledDate}
          mode="year"
        />
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: <CalendarDropdown />,
    },
  ];

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const response = await api.get(`manager/profile`);
        const data = response.data.result;
        if (data) {
          setManager(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchManagerData();
  }, []);

  useEffect(() => {
    if (manager.salonId) {
      const fetchSalaries = async () => {
        try {
          const response = await api.get(`stylist/salaries/${manager.salonId}/${selectDay}`);
          const data = response.data.result;
          if (data) {
            setSalaries(data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchSalaries();
    }
  }, [manager, selectDay]);

  const calculateSalary = async () => {
    const salaryRecords = salaries.map(salary => ({
      bonusSalary: parseInt(salary.bonus || 0, 10),
      monthAndYear: selectDay,
      totalSalary: parseInt(salary.totalSalary || 0, 10),
      stylistId: salary.stylistId,
    }));

    try {
      setLoading(true);
      const response = await api.post("stylist/salaryRecords/save", salaryRecords);
      const data = response.data.result;
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Calculate salary successfully",
          showCloseButton: true,
          confirmButtonText: "OK",
          willClose: () => {
            navigate("/manager/salary");
          },
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/manager/salary");
          }
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateSalary();
  };

  const formatPrice = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <>
      <div className="manager-create-salary__breadcrumb">
        <Link to="/manager/salary" className="manager-create-salary__breadcrumb-link">Salary</Link>
        &gt;
        <span className="manager-create-salary__breadcrumb-current">Calculate Salary</span>
      </div>

      <div className="manager-create-salary">
        <form onSubmit={handleSubmit}>
          <div className="manager-create-salary__header">
            <div className="manager-create-salary__header-searchBar">
              <BiSearchAlt className="searchBar-icon" />
              <input
                placeholder="Search stylist name here..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="manager-create-salary__header-filter">
              <Dropdown menu={{ items }} trigger={["hover"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {selectDay}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>

          <div className="manager-create-salary__content">
            <table className="manager-create-salary__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Stylist</th>
                  <th>Base Salary</th>
                  <th>Bonus</th>
                  <th>Total Salary</th>
                </tr>
              </thead>

              <tbody>
                {(salaries || []).map((salary, index) => (
                  <tr key={index}>
                    <td className="manager-create-salary__id">{salary.stylistId}</td>
                    <td>
                      <span className="manager-create-salary__stylist-name">{salary.stylistName}</span>
                    </td>
                    <td>
                      <input
                        className="manager-create-salary__input"
                        type="text"
                        defaultValue={salary.salary && formatPrice(salary.salary)}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        className="manager-create-salary__input"
                        type="text"
                        defaultValue={salary.bonus && formatPrice(salary.bonus)}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        className="manager-create-salary__input"
                        defaultValue={salary.totalSalary && formatPrice(salary.totalSalary)}
                        disabled
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="manager-create-salary__button-container">
              <button
                type="submit"
                className="manager-create-salary__button"
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
