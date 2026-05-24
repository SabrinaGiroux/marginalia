import { Search } from 'lucide-react';
import { useState } from 'react';

export function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [input, setInput] = useState('');
  return (
    <div className="flex gap-1 card items-center">
      <input
        type="search"
        placeholder="Search by title, author, or description..."
        value={input}
        onChange={(e) => {
          if (e.target.value.trim().length === 0) {
            onSearch('');
          }
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch(input);
        }}
        className="form-input"
      ></input>
      <Search onClick={() => onSearch(input)} />
    </div>
  );
}
