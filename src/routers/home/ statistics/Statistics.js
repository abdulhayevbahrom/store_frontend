import React from "react";
import "./Statistics.css";

const Statistics = () => {
  return (
    <div className="statistics_page">
      <div className="container">
        <div className="statistics_container">
          <div className="box shadow">
            <div className="statistics_card">
              <b>000</b>
              <span>Dey</span>
            </div>
          </div>
          <div className="box shadow">
            <div className="statistics_card">
              <b>000</b>
              <span>Week</span>
            </div>
          </div>
          <div className="box shadow">
            <div className="statistics_card">
              <b>000</b>
              <span>Month</span>
            </div>
          </div>
          <div className="box shadow">
            <div className="statistics_card">
              <b>000</b>
              <span>Year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
