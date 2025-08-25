import React, {useMemo, useState} from "react";

const AboutContent = ({data, loading}) => {
  const isLoading = loading ?? !data;
  const tabs = useMemo(
    () =>
      data?.tabs ?? [
        {key: "intro", label: "Introduction"},
        {key: "vision", label: "Our Vision"},
        {key: "unique", label: "What Sets Us Apart"},
        {key: "commit", label: "Our Commitment"},
      ],
    [data]
  );

  const [active, setActive] = useState(tabs[0].key);
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* IMAGE */}
          <div className="overflow-hidden rounded-2xl">
            {isLoading ? (
              // skeleton ảnh
              <div className="w-full aspect-[16/11] bg-zinc-200 animate-pulse rounded-2xl" />
            ) : (
              <img
                src={data.imageSrc ?? "images/banner/about-us.jpg"}
                alt={data.imageAlt ?? "About us"}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            )}
          </div>

          {/* CONTENT */}
          <div>
            {/* Title */}
            {isLoading ? (
              <div className="mb-6 space-y-3">
                <div className="h-8 bg-zinc-200 rounded animate-pulse w-11/12" />
                <div className="h-8 bg-zinc-200 rounded animate-pulse w-9/12" />
              </div>
            ) : (
              <h3 className="text-[32px] lg:text-[44px] font-semibold leading-tight tracking-tight mb-6">
                {data.title ?? "Modave – Offering rare and beautiful items worldwide"}
              </h3>
            )}

            {/* Tabs */}
            <ul className="flex flex-wrap gap-6 mb-6 border-b border-zinc-200">
              {tabs.map((t) => {
                const selected = active === t.key;
                return (
                  <li key={t.key}>
                    <button
                      onClick={() => setActive(t.key)}
                      aria-selected={selected}
                      className="group relative pb-2 text-[15px] font-medium text-zinc-900/80 hover:text-zinc-900 transition-colors"
                      disabled={isLoading}
                    >
                      {/* nhãn */}
                      <span>{t.label}</span>
                      {/* gạch chân chạy trái→phải: active = full; hover = fill dần */}
                      <span
                        className={`pointer-events-none absolute left-0 -bottom-[1px] h-[2px] bg-black transition-all duration-300
                        ${selected ? "w-full" : "w-0 group-hover:w-full"}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Content panel */}
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-zinc-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-zinc-200 rounded animate-pulse w-11/12" />
                <div className="h-4 bg-zinc-200 rounded animate-pulse w-10/12" />
                <div className="h-4 bg-zinc-200 rounded animate-pulse w-9/12" />
              </div>
            ) : (
              <div className="space-y-4 text-[15px] leading-7 text-zinc-700">
                <p>{(data.contents && data.contents[active]) ?? data.defaultContent}</p>
              </div>
            )}

            {/* Read more */}
            <a
              href="#"
              className={`inline-flex items-center justify-center mt-6 rounded-full bg-black text-white px-6 py-3 text-sm font-medium
                ${isLoading ? "opacity-50 pointer-events-none" : "hover:opacity-90"}`}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
