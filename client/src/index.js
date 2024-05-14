import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutsContext'
import { AuthContextProvider } from './context/AuthContext'
import { AuthContext2Provider } from './context/AuthContext2';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthContextProvider>
      <AuthContext2Provider>
        <WorkoutsContextProvider>
          <App/>
        </WorkoutsContextProvider>
      </AuthContext2Provider>
    </AuthContextProvider>

  </React.StrictMode>
);
