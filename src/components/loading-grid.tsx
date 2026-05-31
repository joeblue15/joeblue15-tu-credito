export function LoadingGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="surface min-h-[240px] animate-pulse p-5" />
      ))}
    </div>
  );
}
