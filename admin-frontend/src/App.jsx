import { Routes, Route, Navigate, useLocation } from 'react-router';
import './App.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Horses from './pages/Horses';
import MedicalRecords from './pages/MedicalRecords';
import RidingLogs from './pages/RidingLogs';
import { useGetProfileQuery, useLazyGetProfileQuery } from './slices/apiSlice';
import Layout from './components/Layout';
import HorseDetails from './pages/HorseDetails';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AuthenticateRoute = ({ children }) => {
  const [fetchUser] = useLazyGetProfileQuery();
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    const res = await fetchUser();
    setUser(res?.data);
  }, [fetchUser]);

  useEffect(() => {
    if (token) {
      getUser()

    }
  }, [token])

  return (
    <>
      {isAuthenticated && token && user ? children : <LoginPage from={location.path} />}
    </>
  )
}


function App() {
  return (
    <>
      <Routes>
        <Route path="/qwerty">
          <Route element={<AuthenticateRoute><Layout /></AuthenticateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="horses" element={<Horses />} />
            <Route path="horses/:id" element={<HorseDetails />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="riding-logs" element={<RidingLogs />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
