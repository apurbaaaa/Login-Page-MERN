import React from 'react';

const CompanyDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Company Dashboard</h1>
      <p>Welcome to your company dashboard. Here you can manage your projects, view analytics, and update your profile.</p>

      {/* Example content */}
      <div className="content">
        <h2>Recent Projects</h2>
        <ul>
          <li>Project A</li>
          <li>Project B</li>
          <li>Project C</li>
        </ul>

        <h2>Performance Metrics</h2>
        <p>Analytics and key performance indicators (KPIs) would be displayed here.</p>
      </div>
    </div>
  );
};

export default CompanyDashboard;
