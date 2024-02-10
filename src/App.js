import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/login';
//import DashBoard from './components/dashboard';
import Navbar from './components/navBar';
import { DataProvider } from './context/dataContext';


function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* route for dashboard (requires authentication) */}
              <Route path="/dashboard" element={<Navbar />} />
              {/* Redirect to login for any unknown routes */}
              {/* <Route path="/" exact render={() => <Navigate to="/login" />} /> */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </Router>
    </div> 
  );
}

export default App;
