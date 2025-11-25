// components/Dashboard.tsx
'use client';

import React from 'react';
import { LogOut, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome Back!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {user?.email}
            </p>
            <div className="inline-block bg-green-100 text-green-800 px-6 py-3 rounded-full font-medium">
              ✓ Successfully logged in
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Your Profile</h3>
              <p className="text-gray-600 text-sm">Manage your account settings and preferences</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Activity</h3>
              <p className="text-gray-600 text-sm">View your recent activity and history</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600 text-sm">Customize your experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;