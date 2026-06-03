export function ShelfCard({ selected, name }: { selected: boolean; name: string }) {
  return <button className={`btn-secondary ${selected && 'bg-amber-300'}`}> {name} </button>;
}
