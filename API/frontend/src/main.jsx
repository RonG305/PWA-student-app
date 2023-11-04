import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js')
//     .then((registration) => {
//       console.log('Service worker registered within a scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service worker registration failed:', error);
//     });
// }

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
  })
}

