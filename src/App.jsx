import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Landing from './pages/Landing';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['citizen']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/owner"
              element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect old routes to landing */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
