import StatisticCard from "../../components/dashboard/StatisticCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticCard title="Users" value={245} />
        <StatisticCard title="Projects" value={18} />
        <StatisticCard title="Revenue" value={25000} />
        <StatisticCard title="Messages" value={84} />
      </div>
    </div>
  );
}
