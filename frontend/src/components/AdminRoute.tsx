import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../hooks';

const AdminRoute = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' />;
};

export default AdminRoute;
