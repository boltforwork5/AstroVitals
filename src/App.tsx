import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileTabBar from '@/components/layout/MobileTabBar';
import Dashboard from '@/pages/Dashboard';
import BodyMap from '@/pages/BodyMap';
import CheckIn from '@/pages/CheckIn';
import Trends from '@/pages/Trends';
import Radiation from '@/pages/Radiation';
import Mind from '@/pages/Mind';
import Training from '@/pages/Training';
import Assistant from '@/pages/Assistant';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-space-bg">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-10">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/body-map" element={<BodyMap />} />
              <Route path="/check-in" element={<CheckIn />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/radiation" element={<Radiation />} />
              <Route path="/mind" element={<Mind />} />
              <Route path="/training" element={<Training />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <MobileTabBar />
      </div>
    </HashRouter>
  );
}
