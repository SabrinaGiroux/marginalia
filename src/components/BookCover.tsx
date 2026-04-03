export function BookCover({ title, coverUrl }: { coverUrl?: string; title: string }) {
  return (
    <div className="w-full aspect-[2/3] overflow-hidden rounded-md border-slate-600">
      {coverUrl ? (
        <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4">
          <span className="text-sm text-[#6b6560] text-center">{title}</span>
        </div>
      )}
    </div>
  );
}
