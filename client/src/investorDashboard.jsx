import React from 'react';

const InvestorDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Investor Dashboard</h1>
      <p>Welcome to your investor dashboard. Here you can view your investment portfolio, track market trends, and explore new investment opportunities.</p>

      {/* Example content */}
      <div className="content">
        <h2>Your Investments</h2>
        <ul>
          <li>Investment in Startup A</li>
          <li>Investment in Tech Firm B</li>
          <li>Investment in Renewable Energy C</li>
        </ul>

        <h2>Market Trends</h2>
        <p>Graphs and charts displaying recent market trends and forecasts.</p>
      </div>
    </div>
  );
};

export default InvestorDashboard;
