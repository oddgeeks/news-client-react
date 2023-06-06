import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/dashboard';
import WelcomePage from './pages/welcome';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import Layout from './Layout';

const App = () => {
  return (
    <div className="App bg-slate-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
