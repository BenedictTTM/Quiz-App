import React from "react";
import EnergyGemsComponent from "./EnergyGemsComponent";
import BasicDateCalendar from "./BasicDateCalendar";

function RightBar() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100vh",
        width: "20rem", // Adjust width as needed
        backgroundColor: "rgba(236, 236, 232, 0.2)", // Light yellow background
        borderLeft: "4.4px solid rgba(128, 177, 208, 0.2)", // Left border
        padding: "10px",
        zIndex: 3000,
        opacity: 0.99, // Adjust opacity between 0 and 1
        color : "red",
        marginTop:"-143px"
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
  );
}

export default RightBar;
