import React from "react";
import { Card, Col, Row, Statistic, Tabs } from "antd";
import ReactECharts from 'echarts-for-react'; // Correct import
import "./ManagerDashboard.scss";

const { TabPane } = Tabs;

const ManagerDashboard = () => {
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
      type: 'category',
      data: revenueData.map(item => item.date),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: revenueData.map(item => item.revenue),
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#2196F3',
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  });

  const getDoughnutOptions = () => ({
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        data: customersData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          formatter: '{c}', // Display only the value
        },
      },
    ],
  });

  return (
    <div className="manager-dashboard">
      <Row gutter={16} className="manager-dashboard__container">
        <Col span={6}>
          <Card>
            <Statistic title="Profit" value={23523} prefix="$" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Growth" value={17.21} suffix="%" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Orders" value={3685} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Customers" value={1832} />
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
