type Props = {
  page: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  onPrevious,
  onNext
}: Props) {
  return (
    <div className="
      flex
      items-center
      justify-center
      gap-4
      p-4
    ">
      <button onClick={onPrevious}>Previous</button>

      <span>
        Page {page}
      </span>

      <button onClick={onNext}>Next</button>
    </div>
  );
}
