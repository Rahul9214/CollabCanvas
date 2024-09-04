import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { StyleOptionsProvider } from "./context/StyleOptionsContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleOptionsProvider>
      <App />
    </StyleOptionsProvider>
  </StrictMode>,
);
