import React, {useState} from "react";
import PageTitle from "./../../../components/common/PageTitle";
import BlogItem from "../../../components/common/blog/BlogItem";
import {Link} from "react-router-dom";
import IconComponent from "./../../../components/ui/IconComponent";
import {FaAlignRight} from "react-icons/fa";
import {MdKeyboardArrowRight} from "react-icons/md";

const Blog = () => {
  const [loaded, setLoaded] = useState(false);
  const smallPosts = [
    {
      img: "/images/blog/sidebar-2.jpg",
      date: "February 28, 2024",
      author: "Themesflat",
      title: "10 Must-Have Wardrobe Staples for Every Season",
      href: "#",
    },
    {
      img: "/images/blog/sidebar-3.jpg",
      date: "February 28, 2024",
      author: "Themesflat",
      title: "How to Transition Your Wardrobe from Day to Night",
      href: "#",
    },
    {
      img: "/images/blog/sidebar-1.jpg",
      date: "February 28, 2024",
      author: "Themesflat",
      title: "How to Incorporate Classic Pieces into Modern Outfits",
      href: "#",
    },
    {
      img: "/images/blog/sidebar-4.jpg",
      date: "February 28, 2024",
      author: "Themesflat",
      title: "How to Wear the Latest Fashion Trends Every Day",
      href: "#",
    },
  ];
  return (
    <div>
      <PageTitle
        title="Blog Default"
        withBackground={true}
        breadcrumbAlign="center"
        breadcrumb={[{label: "Homepage", href: "/"}, {label: "Blog", href: "/"}, {label: "blog default"}]}
      />
      {/* <!-- blog-default --> */}
      <div data-aos="fade-up" className="w-full py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* <!-- Main Content --> */}
            <div className="lg:col-span-2 space-y-10">
              {/* <!-- Blog item --> */}
              <BlogItem />

              <hr className="border-gray-200" />

              {/* <!-- Blog item --> */}
              <BlogItem
                href="/blog/the-ultimate-guide"
                image="/images/blog/blog-default-1.jpg"
                title="The Ultimate Guide to the Top 5 Fashion Trends for Summer 2024"
                excerpt="Discover the top fashion trends for Summer 2024, from vibrant colors to bohemian styles. We'll help you update your wardrobe with the hottest items of the season."
                date="February 28, 2024"
                author="Themesflat"
                comments={12}
                views="260.2K"
              />

              <hr className="border-gray-200" />

              {/* <!-- Blog item --> */}
              <BlogItem
                href="/blog/the-ultimate-guide"
                image="/images/blog/blog-default-1.jpg"
                title="The Ultimate Guide to the Top 5 Fashion Trends for Summer 2024"
                excerpt="Discover the top fashion trends for Summer 2024, from vibrant colors to bohemian styles. We'll help you update your wardrobe with the hottest items of the season."
                date="February 28, 2024"
                author="Themesflat"
                comments={12}
                views="260.2K"
              />

              {/* <!-- Pagination --> */}
              <ul className="flex gap-2 justify-center mt-8">
                <Link href="#" className="px-3 py-1 border rounded hover:bg-amber-500 hover:text-white">
                  1
                </Link>
                <Link className="px-3 py-1 border rounded hover:bg-amber-500 hover:text-white">2</Link>
                <Link href="#" className="px-3 py-1 border rounded hover:bg-amber-500 hover:text-white">
                  3
                </Link>
              </ul>
            </div>

            {/* <!-- Sidebar --> */}
            <aside className="w-full lg:w-[360px] lg:sticky lg:top-24 lg:self-start space-y-8">
              {/* Search */}
              <div className="rounded-xl border border-neutral-200 p-3">
                <form className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-lg border border-neutral-300 py-2.5 pl-3 pr-10 text-sm placeholder:text-neutral-400 focus:border-black focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-neutral-100"
                    aria-label="Search"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path
                        d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path d="M21.35 21L17 16.65" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Relatest Post */}
              <section className="space-y-4">
                <h5 className="text-base font-semibold">Relatest Post</h5>

                {/* Big item */}
                <article className="group">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/images/blog/sidebar-1.jpg"
                      alt=""
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      <i className="icon-calendar" />
                      February 28, 2024
                    </span>
                    <span className="h-3 w-px bg-neutral-300" />
                    <span className="inline-flex items-center gap-1">
                      <i className="icon-user" />
                      by{" "}
                      <a href="#" className="underline-offset-2 hover:underline">
                        Themesflat
                      </a>
                    </span>
                  </div>
                  <h6 className="mt-2 text-sm font-semibold leading-snug">
                    <a href="#" className="underline-offset-4 hover:underline">
                      The Ultimate Guide: Dressing Stylishly with Minimal Effort
                    </a>
                  </h6>
                </article>

                {/* List items (row) */}
                <div className="space-y-4">
                  {smallPosts.map((p, i) => (
                    <article key={i} className="group flex gap-3">
                      <div className=" relative w-16 overflow-hidden rounded-lg aspect-square">
                        {!loaded && <div className="absolute inset-0 bg-neutral-200 animate-pulse" />}
                        <img
                          src={p.img}
                          alt=""
                          className="overflow-hidden absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-2 text-[11px] text-neutral-600">
                          <span>{p.date}</span>
                          <span className="h-3 w-px bg-neutral-300" />
                          <span>
                            by{" "}
                            <a href="#" className="underline-offset-2 hover:underline">
                              {p.author}
                            </a>
                          </span>
                        </div>
                        <a
                          href={p.href}
                          className="mt-1 block text-sm leading-snug line-clamp-2 underline-offset-4 hover:underline"
                          title={p.title}
                        >
                          {p.title}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Categories */}
              <section>
                <h5 className="mb-3 text-base font-semibold">Categories</h5>
                <ul className="space-y-2">
                  {["Trending", "Fashion", "Outfit", "Accessories", "Beauty"].map((c) => (
                    <li key={c}>
                      <a href="#" className="text-sm hover:underline underline-offset-4">
                        {c}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Popular Tag */}
              <section>
                <h5 className="mb-3 text-base font-semibold">Popular Tag</h5>
                <ul className="flex flex-wrap gap-2">
                  {[
                    "Fashion Trends",
                    "Sustainable Fashion",
                    "Street Style",
                    "Beauty Tips",
                    "Vintage Fashion",
                    "Eco Friendly",
                    "Tips",
                  ].map((t) => (
                    <li key={t}>
                      <a
                        href="#"
                        className="inline-block rounded-md border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-100"
                      >
                        {t}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </div>
      {/*  /blog-default  */}
    </div>
  );
};

export default Blog;
