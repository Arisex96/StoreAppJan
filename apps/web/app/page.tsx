"use client";

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Welcome back! Here’s an overview of your account.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-sm text-gray-500">Total Logins</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            12
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-sm text-gray-500">Account Status</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            Active
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-sm text-gray-500">Member Since</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            2024
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>✅ Logged in successfully</li>
          <li>🔐 Password verified</li>
          <li>📅 Account accessed today</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
