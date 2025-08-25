import React from "react";

const TestimonialSkeleton = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 p-6 animate-pulse space-y-4">
      <div className="w-10 h-10 bg-zinc-200 rounded-full" />
      <div className="h-4 w-32 bg-zinc-200 rounded" />
      <div className="h-3 w-full bg-zinc-200 rounded" />
      <div className="h-3 w-5/6 bg-zinc-200 rounded" />
      <div className="h-3 w-4/6 bg-zinc-200 rounded" />
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 w-24 bg-zinc-200 rounded" />
        <div className="flex gap-1">
          {Array.from({length: 5}).map((_, i) => (
            <div key={i} className="h-3 w-3 bg-zinc-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSkeleton;
