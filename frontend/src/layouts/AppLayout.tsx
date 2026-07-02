import { Outlet } from 'react-router-dom';

import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}