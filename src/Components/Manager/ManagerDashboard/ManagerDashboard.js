/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Calendar, Card, Col, Dropdown, Row, Space, Statistic, Tabs } from "antd";
import ReactECharts from 'echarts-for-react';
import "./ManagerDashboard.scss";
import dayjs from "dayjs";
import { DownOutlined } from "@ant-design/icons";
import api from "../../../config/axios";

const { TabPane } = Tabs;

const ManagerDashboard = () => {
  const [totalProfit, setTotalProfit] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [selectDay, setSelectedDay] = useState(dayjs().format("YYYY-MM"));
  const [manager, setManager] = useState([]);
  const [profit, setProfit] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);
   

  const [finalValues, setFinalValues] = useState({
    profit: 0,
    growth: 17.21,
    orders: 3685,
    customers: 1832,
  });

  function formatDateToOrdinal(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }

    return day + suffix;
}

  useEffect(() => {
    if (finalValues.profit === 0) {
      setTotalProfit(0);
      return;
    }

    const duration = 2000;
    const intervalTime = 50;
    const steps = duration / intervalTime;

    const incrementProfit = finalValues.profit / steps;
    const incrementGrowth = finalValues.growth / steps;
    const incrementOrders = finalValues.orders / steps;
    const incrementCustomers = finalValues.customers / steps;

    let currentProfit = 0;
    let currentGrowth = 0;
    let currentOrders = 0;
    let currentCustomers = 0;

    const interval = setInterval(() => {
      if (currentProfit < finalValues.profit) {
        currentProfit += incrementProfit;
        setTotalProfit(Math.round(currentProfit));
      }
      if (currentGrowth < finalValues.growth) {
        currentGrowth += incrementGrowth;
        setGrowth(Math.round(currentGrowth * 100) / 100);
      }
      if (currentOrders < finalValues.orders) {
        currentOrders += incrementOrders;
        setOrders(Math.round(currentOrders));
      }
      if (currentCustomers < finalValues.customers) {
        currentCustomers += incrementCustomers;
        setCustomers(Math.round(currentCustomers));
      }

      if (
        currentProfit >= finalValues.profit &&
        currentGrowth >= finalValues.growth &&
        currentOrders >= finalValues.orders &&
        currentCustomers >= finalValues.customers
      ) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [finalValues]);


  const getLineOptions = () => ({
    xAxis: {
      type: 'category',
      data: profit.map(item => formatDateToOrdinal(item.day)),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: profit.map(item => item.totalMoney),
        type: 'line',
        smooth: true,
        itemStyle: {
          color: "#2196F3",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  });

  const getDoughnutOptions = () => ({
    legend: {
      orient: "vertical",
      left: "right",
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        data: employeesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          formatter: "{c}",
        },
      },
    ],
  });

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
      } finally {
      }
    };
    fetchManagerData();
  }, []);


  const CalendarDropdown = () => {
    const wrapperStyle = {
      width: 320,
      padding: "10px",
      backgroundColor: "#fff",
    };

    const onSelect = (value) => {
      const formattedDate = value.format("YYYY-MM");
      setSelectedDay(formattedDate);
    };

    return (
      <div style={wrapperStyle}>
        <Calendar
          fullscreen={false}
          onSelect={onSelect}
          value={dayjs(selectDay)}
          mode="year"
        />
      </div>
    );
  };

  useEffect(() => {
    console.log(selectDay)
    if (manager.salonId !== undefined) {
      const fetchTotalProfit = async () => {
        const month = selectDay.split("-")[1];
        try {
          const response = await api.get(`booking/total-money/month/${month}/salon/${manager.salonId}`);
          const data = response.data.result;
          if (data) {
            setFinalValues(prev => ({
              ...prev,
              profit: data.totalMoney,
            }));
          } else {
            setFinalValues(prev => ({
              ...prev,
              profit: 0,
            }));
          }
        } catch (error) {
          console.log(error);
          setFinalValues(prev => ({
            ...prev,
            profit: 0,
          }));
        }
       
      }

      const fetchProfit = async () => {
        const month = selectDay.split("-")[1];
        try {
          const response = await api.get(`booking/total-money/day/month/${month}/salon/${manager.salonId}`);
          const data = response.data.result;
          if (data) {
           setProfit(data);
          }
        } catch (error) {
          console.log(error)
        }
      }

      const fetchEmployeeData = async () => {
        try {
         const response = await api.get(`manager/chart/${manager.salonId}`);
         const data = response.data.result;
         if (data) {
          setEmployeesData(data);
         }
        } catch (error) {
         
        }
       }

      fetchTotalProfit();
      fetchProfit();
      fetchEmployeeData();
    }

  
  }, [selectDay, manager]);


  const items = [
    {
      key: "1",
      label: <CalendarDropdown />,
    },
  ];

  return (
    <div className="manager-dashboard">
       <div className="manager-salary__header-filter">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["hover"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {selectDay}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

          </div>
      <Row gutter={16} className="manager-dashboard__container">
     
        <Col span={6}>
          <Card>
            <Statistic title="Profit" value={totalProfit} suffix="VND" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Growth" value={growth} suffix="%" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Orders" value={orders} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Customers" value={customers} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="manager-dashboard__chart-container">
        <Col span={16}>
          <Card title="Total Profit">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Month" key="1">
                <ReactECharts option={getLineOptions()} />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Employees">
            <ReactECharts option={getDoughnutOptions()} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerDashboard;
