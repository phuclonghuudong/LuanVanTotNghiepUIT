import {Link} from "react-router-dom";
import clsx from "clsx";
import ImageTitle from "../../assets/section/page-title.jpg";
import {FaChevronRight} from "react-icons/fa";

const PageTitle = ({title, breadcrumb = [], withBackground = true, breadcrumbAlign = "center"}) => {
  return (
    <div
      data-aos="fade-up"
      className={clsx(withBackground ? "bg-cover bg-center py-8" : "py-6", "w-full")}
      style={withBackground ? {backgroundImage: `url(${ImageTitle})`} : {}}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className={clsx("text-3xl font-semibold mb-2", breadcrumbAlign === "left" ? "text-left" : "text-center")}>
          {title}
        </h1>

        <ul
          className={clsx(
            "flex flex-wrap items-center text-sm text-gray-600 gap-2",
            breadcrumbAlign === "left" ? "justify-start" : "justify-center"
          )}
        >
          {breadcrumb.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && <FaChevronRight className="text-xs" />}
              {item.href ? (
                <Link to={item.href} className="hover:text-black underline underline-offset-2">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageTitle;
