export function ShelfCard({
  selected,
  name,
  onClick,
}: {
  selected?: boolean;
  name: string;
  onClick?: () => void;
}) {
  // replace dashes with spaces
  const label = name.replace(/-/g, ' ');

  return (
    <button className={`btn-secondary ${selected && 'bg-amber-300'}`} onClick={onClick}>
      {label}
    </button>
  );
}
