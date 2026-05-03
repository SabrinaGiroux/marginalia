export function AddBookCard({ onClick }: { onClick: () => void }) {
  return (
    <li
      className="flex flex-col h-full min-h-[350px] min-w-[220px] rounded-lg border-2 border-dashed border-[#3a3530] p-4 bg-[#1a1a1a] justify-center items-center gap-3 hover:border-[#c8a96e] hover:cursor-pointer transition duration-200"
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full border-2 border-[#6b6560] text-[#6b6560] flex items-center justify-center text-2xl">
        +
      </div>

      <span className="text-xs tracking-widest text-[#6b6560]">ADD BOOK</span>
    </li>
  );
}
