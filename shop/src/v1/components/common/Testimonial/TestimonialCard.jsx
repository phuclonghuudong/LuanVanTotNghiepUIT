import React from "react";

const TestimonialCard = ({item}) => {
  return (
    <div className="rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition">
      <div className="mb-4 text-3xl text-zinc-400">❝</div>
      <h4 className="font-semibold mb-2">{item.title}</h4>
      <p className="text-zinc-600 text-sm mb-4">"{item.text}"</p>
      <div className="flex items-center justify-between">
        <span className="font-medium">{item.author}</span>
        <div className="flex gap-1 text-yellow-500">
          {Array.from({length: 5}).map((_, i) => (
            <i key={i} className="icon icon-star text-sm">
              ★
            </i>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
