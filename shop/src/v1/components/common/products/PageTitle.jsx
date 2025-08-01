import { Link } from "react-router-dom";
import ImageTitle from "../../../assets/section/page-title.jpg";
const PageTitle = ({ title, breadcrumb = [] }) => {
  return (
    <div className='bg-cover bg-center py-8' style={{ backgroundImage: `url(${ImageTitle})` }}>
      <div className='max-w-screen-xl mx-auto px-4 text-center'>
        <h1 className='text-3xl font-semibold mb-2'>{title}</h1>
        <ul className='flex items-center justify-center text-sm text-gray-600 gap-2'>
          {breadcrumb.map((item, index) => (
            <li key={index} className='flex items-center gap-1'>
              {index > 0 && <span className='icon icon-arrRight' />}
              {item.href ? (
                <Link to={item.href} className='underline hover:text-black'>
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
