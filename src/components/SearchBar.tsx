import { Search } from 'lucide-react';

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-1 card items-center">
      <input
        type="search"
        placeholder="Search by title, author, or description..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="form-input"
      ></input>
      <Search />
    </div>
  );
}
