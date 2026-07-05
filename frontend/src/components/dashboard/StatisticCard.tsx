import Card from "../ui/Card";

type StatisticCardProps = {
  title: string;
  value: number;
};

export default function StatisticCard({
  title,
  value,
}: StatisticCardProps) {
  return (
    <Card>
      <p className="text-sm text-slate-500">
        {title}
      </p>
      <h2 className="mt-3 text-4xl font-bold">
        {value}
      </h2>
    </Card>
  );
}