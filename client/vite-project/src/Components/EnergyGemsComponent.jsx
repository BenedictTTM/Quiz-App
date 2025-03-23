import React from "react"; 
import { Bolt, Gem } from "lucide-react";
import "../Styles/EnergyGemsComponent.css";  // Import the CSS file

const EnergyGemsComponent = () => {
  return (
    <div className="container">
      {/* Energy Bars Section */}
      <div className="card">
        <div className="icon-text">
          <Bolt className="icon orange" />
          <h2>50 Energy Bars</h2>
        </div>
        <p className="description">1 energy bar gets you 10 questions</p>
        <button className="button">
          <Bolt className="small-icon" />
          <span>Refill energy</span>
        </button>
      </div>
<hr /> 
      {/* Gems Section */}
      <div className="card">
        <div className="icon-text">
          <Gem className="icon yellow" />
          <h2>40 Gems</h2>
        </div>
        <p className="description">Exchange 100 gems for 1 energy bar</p>
        <button className="button">Get energy bars</button>
      </div>
    </div>
  );
};

export default EnergyGemsComponent;
