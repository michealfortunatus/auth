// app/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginPage from '@/components/Login';
import RegisterPage from '@/components/SignUp';
import Dashboard from '@/app/dashboard/page';

const HomePage: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Dashboard />;
  }

  if (showRegister) {
    return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />;
  }

  return <LoginPage onSwitchToRegister={() => setShowRegister(true)} />;
};

export default HomePage;