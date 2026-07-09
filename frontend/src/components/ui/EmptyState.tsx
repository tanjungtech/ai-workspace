type Props = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="
      flex
      h-full
      flex-col
      items-center
      justify-center
      text-center
    ">
      <h2 className="
        text-xl
        font-semibold
      ">
        {title}
      </h2>
      <p className="
        mt-2
        text-gray-500
      ">
        {description}
      </p>
    </div>
  );
}
