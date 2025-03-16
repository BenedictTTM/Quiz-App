import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../Styles/Styles.css';
import App from './App';
import TopNavBar from "./TopNavBar"; // Import the navbar
import '../Styles/main.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <TopNavBar /> {/* Navbar at the top */}
<App styles={{ backgroundColor: "black" }} />
  </StrictMode>
);



