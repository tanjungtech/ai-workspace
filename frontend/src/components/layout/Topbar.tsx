import { Search, Bell, CircleUserRound } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <div className="flex items-center gap-3 rounded-lg border bg-slate-50 px-4 py-2">
        <Search size={18} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell />

        <CircleUserRound />

        <span>Farid</span>
      </div>
    </header>
  )
}