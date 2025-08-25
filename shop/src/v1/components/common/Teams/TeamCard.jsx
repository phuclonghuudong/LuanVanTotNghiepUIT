import React from "react";

const TeamCard = ({member}) => {
  return (
    <article className="min-w-[260px] lg:min-w-0 snap-center rounded-2xl overflow-hidden border border-zinc-200 group">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={member.img}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <h6 className="font-semibold leading-tight">
            <a href={member.profile ?? "#"} className="hover:underline">
              {member.name}
            </a>
          </h6>
          <p className="text-xs text-zinc-500">{member.role}</p>
        </div>
        <a
          href={member.social ?? "#"}
          aria-label={`Facebook of ${member.name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-900 hover:text-white transition"
        >
          {/* thay icon tuỳ bộ icon của bạn */}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M13.5 9H15V6h-2a3 3 0 0 0-3 3v2H8v3h2v7h3v-7h2.1l.4-3H13V9.5c0-.3.2-.5.5-.5Z" />
          </svg>
        </a>
      </div>
    </article>
  );
};

export default TeamCard;
