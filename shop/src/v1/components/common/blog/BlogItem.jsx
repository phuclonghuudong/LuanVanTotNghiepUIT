import {useState} from "react";

const BlogItem = ({
  href = "#",
  image = "/images/blog/blog-default-1.jpg",
  title = "The Ultimate Guide to the Top 5 Fashion Trends for Summer 2024",
  excerpt = "Discover the top fashion trends for Summer 2024, from vibrant colors to bohemian styles. We'll help you update your wardrobe with the hottest items of the season.",
  date = "February 28, 2024",
  author = "Themesflat",
  comments = 12,
  views = "260.2K",
  ratio = "aspect-[6/3.5]", // hoặc 'aspect-video' / 'aspect-square'
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="group">
      {/* Image */}
      <div className={`relative overflow-hidden rounded-xl ${ratio} `}>
        {!loaded && <div className="absolute inset-0 bg-neutral-200 animate-pulse" />}
        <img
          src={image}
          alt={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-neutral-600">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
              <path
                d="M8 2v2M16 2v2M3 9h18M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            {date}
          </span>
          <span className="inline-flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            by{" "}
            <a href="#" className="ml-1 underline-offset-4 hover:underline">
              {author}
            </a>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
              <path
                d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            {comments}
          </span>
          <span className="inline-flex items-center gap-1">
            <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
              <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            {views}
          </span>
        </div>
      </div>

      {/* Title */}
      <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-snug">
        <a href={href} className="underline-offset-[6px] hover:underline decoration-2">
          {title}
        </a>
      </h2>

      {/* Excerpt */}
      <p className="mt-3 text-neutral-600">{excerpt}</p>
    </article>
  );
};
export default BlogItem;
