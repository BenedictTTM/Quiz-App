import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../Styles/Styles.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<App styles={{ backgroundColor: "black" }} />
  </StrictMode>
);



