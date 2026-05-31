import { Skeleton } from "@/components/ui/skeleton";

export function LoadingGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-[30px] border border-white/10 bg-white/[0.04] p-4">
          <Skeleton className="aspect-[4/5] w-full rounded-[24px] bg-white/10" />
          <div className="mt-4 space-y-3">
            <Skeleton className="h-6 w-3/4 rounded-full bg-white/10" />
            <Skeleton className="h-4 w-1/2 rounded-full bg-white/10" />
            <Skeleton className="h-20 w-full rounded-[24px] bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
