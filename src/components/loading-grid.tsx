export function LoadingGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="min-h-[240px] border border-white/8 bg-[#080808] p-5 animate-pulse" />
      ))}
    </div>
  );
}
