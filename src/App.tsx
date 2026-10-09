import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
const Simulator = lazy(() => import('./pages/Simulator'));
import Goals from './pages/Goals';
import Portfolio from './pages/Portfolio';
import Settings from './pages/Settings';
import { UserProvider, useUser } from './store/UserContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { hasCompletedOnboarding } = useUser();
  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
}

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<Layout />}>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
          <Route path="/simulator" element={
            <ProtectedRoute>
              <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading simulator...</div>}>
                <Simulator />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
