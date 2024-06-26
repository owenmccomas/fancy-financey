import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
      <div className="relative">
        <div className="w-20 h-20 border-gray-400 border-2 rounded-full"></div>
        <div className="w-20 h-20 border-gray-900 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
      <div className="ml-4 text-2xl font-semibold text-gray-900">Loading...</div>
    </div>
  );
};

export default LoadingSpinner;