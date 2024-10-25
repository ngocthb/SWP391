/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Tabs } from "antd";
import ReactECharts from "echarts-for-react";
import "./ManagerDashboard.scss";

const { TabPane } = Tabs;

const ManagerDashboard = () => {
  const [profit, setProfit] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);

  const finalValues = {
    profit: 23523,
    growth: 17.21,
    orders: 3685,
    customers: 1832,
  };

  useEffect(() => {
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
        setProfit(Math.round(currentProfit));
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
  }, []);

  const revenueData = [
    { date: "16th", revenue: 20 },
    { date: "17th", revenue: 60 },
    { date: "18th", revenue: 40 },
    { date: "19th", revenue: 40 },
    { date: "20th", revenue: 60 },
    { date: "21th", revenue: 40 },
    { date: "22th", revenue: 80 },
    { date: "23th", revenue: 60 },
    { date: "24th", revenue: 40 },
    { date: "25th", revenue: 60 },
    { date: "26th", revenue: 40 },
  ];

  const customersData = [
    { name: "New", value: 350 },
    { name: "Returning", value: 450 },
    { name: "Others", value: 100 },
  ];

  const getLineOptions = () => ({
    xAxis: {
      type: "category",
      data: revenueData.map((item) => item.date),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: revenueData.map((item) => item.revenue),
        type: "line",
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
        type: "pie",
        radius: ["50%", "70%"],
        data: customersData,
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

  return (
    <div className="manager-dashboard">
      <Row gutter={16} className="manager-dashboard__container">
        <Col span={6}>
          <Card>
            <Statistic title="Profit" value={profit} prefix="$" />
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
          <Card title="Total Revenue">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Month" key="1">
                <ReactECharts option={getLineOptions()} />
              </TabPane>
              <TabPane tab="Year" key="2">
                <ReactECharts option={getLineOptions()} />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Customers">
            <ReactECharts option={getDoughnutOptions()} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerDashboard;
