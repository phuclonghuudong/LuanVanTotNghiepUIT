import {useState} from "react";

const CollectCard = ({item}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-4xl">
      {/* ảnh */}
      <div className="aspect-[4/5] overflow-hidden">
        {/* skeleton khi ảnh chưa onLoad */}
        {!imgLoaded && <div className="h-full w-full bg-zinc-200 animate-pulse" />}
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* overlay content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-center">
        <a
          href={item.href || "#"}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-md ring-1 ring-zinc-200 transition hover:bg-white"
        >
          <h6 className="font-semibold">{item.title}</h6>
          <span className="text-sm text-zinc-500">{item.count} items</span>
          <span className="ml-1 text-zinc-900">↗</span>
        </a>
      </div>
    </article>
  );
};
export default CollectCard;
