export function AddBookCard({ onClick }: { onClick: () => void }) {
  return (
    <li
      className="card flex flex-col h-full min-h-[350px] min-w-[220px] justify-center items-center gap-3 hover:cursor-pointer border-[#2a2a2a] p-4 hover:border-slate-600 "
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full border-2 text-muted flex items-center justify-center text-2xl">
        +
      </div>

      <span className="text-xs tracking-widest text-muted">ADD BOOK</span>
    </li>
  );
}
