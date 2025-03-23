import React from 'react';
import EnergyGemsComponent from './EnergyGemsComponent';
import BasicDateCalendar from './BasicDateCalendar';

function RightBar() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {/* Right Side Container */}
      <div
        style={{
          width: "30%", // Adjust width as needed
          height:"63rem",
          backgroundColor: "rgba(236, 236, 232, 0.2)", // Light yellow background
          borderLeft: "4.4px solid rgba(128, 177, 208, 0.2)", // Change border to left instead of right
          padding: "10px",
          maxWidth:"20rem",
          marginTop:"-6.3rem"
        
        }}
      >
       
        <div style={{ flex: 1, padding: "10px" }}>
          <div>
            <EnergyGemsComponent />
          </div>
         
          <div>
            <BasicDateCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
