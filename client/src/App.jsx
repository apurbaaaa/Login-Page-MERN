import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './index';
import InvestorDashboard from './investorDashboard';
import CompanyDashboard from './companyDashboard';
import Login from './Login';
import Register from './register';

function App() {  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/investor-dashboard" element={<InvestorDashboard />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
  );
}

export default App;
