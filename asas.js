import React from 'react';
import MainLayout from './layout/main';
import { BrowserRouter as Router } from "react-router-dom";
import CustomRoute from './Route';

function App() {
  return (
    <Router>
        <MainLayout>
          <CustomRoute />
        </MainLayout>
    </Router>
  );
}

export default App;
