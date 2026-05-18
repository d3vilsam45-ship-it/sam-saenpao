import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import AdminApp from './admin/AdminApp.tsx';
import ServicesPage from './ServicesPage.tsx';
import './index.css';

const path = window.location.pathname;
const isAdmin = path.startsWith('/admin');
const isServices = path.startsWith('/services');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminApp /> : isServices ? <ServicesPage /> : <App />}
  </StrictMode>,
);
