import React, { useState } from "react";
import "./Reports.css";

const Reports = () => {
  const [reportType, setReportType] = useState("sales");

  const dummySalesData = [
    { rep: "John Doe", territory: "Colombo", sales: 120 },
    { rep: "Jane Smith", territory: "Kandy", sales: 90 },
    { rep: "Alex Perera", territory: "Galle", sales: 110 },
  ];

  const handleExport = (format) => {
    alert(`Exporting ${reportType} report as ${format.toUpperCase()} (Coming soon!)`);
  };

  return (
    <div className="reports-page">
      <h2>Reports</h2>

      <div className="report-controls">
        <label>Select Report Type:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="sales">Sales Performance</option>
          <option value="territory">Territory Coverage</option>
          <option value="engagement">Customer Engagement</option>
        </select>

        <div className="export-buttons">
          <button onClick={() => handleExport("pdf")}>Export as PDF</button>
          <button onClick={() => handleExport("excel")}>Export as Excel</button>
        </div>
      </div>

      {reportType === "sales" && (
        <div className="report-table">
          <h3>Sales Performance Report</h3>
          <table>
            <thead>
              <tr>
                <th>Rep Name</th>
                <th>Territory</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {dummySalesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.rep}</td>
                  <td>{item.territory}</td>
                  <td>{item.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* You can add more reportType views here like territory, engagement etc. */}
    </div>
  );
};

export default Reports;
