const CollectSkeleton = () => (
  <div className="relative overflow-hidden rounded-4xl border border-zinc-200 animate-pulse">
    <div className="aspect-[4/5] bg-zinc-200" />
    <div className="absolute inset-x-0 bottom-0 p-4">
      <div className="h-8 w-40 bg-zinc-200 rounded-full" />
    </div>
  </div>
);

export default CollectSkeleton;
