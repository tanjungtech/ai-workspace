import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <section className="p-8">
          <Outlet />
        </section>
      </main>
    </div>
  )
}