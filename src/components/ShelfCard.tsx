export function ShelfCard({ selected }: { selected: boolean }) {
  return <button className={`btn-secondary ${selected && 'bg-amber-300'}`}></button>;
}
