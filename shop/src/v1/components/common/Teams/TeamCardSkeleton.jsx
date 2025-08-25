import React from "react";

const TeamCardSkeleton = () => {
  return (
    <article className="min-w-[260px] lg:min-w-0 snap-center rounded-2xl overflow-hidden border border-zinc-200">
      <div className="aspect-[4/5] bg-zinc-200 animate-pulse" />
      <div className="p-4 flex items-center justify-between">
        <div className="w-40 space-y-2">
          <div className="h-4 bg-zinc-200 rounded animate-pulse" />
          <div className="h-3 w-24 bg-zinc-200 rounded animate-pulse" />
        </div>
        <div className="h-9 w-9 rounded-full border border-zinc-200 bg-zinc-100 animate-pulse" />
      </div>
    </article>
  );
};

export default TeamCardSkeleton;
