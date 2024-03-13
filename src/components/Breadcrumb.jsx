"use Client"
import Link from 'next/link';

const Breadcrumbs = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex text-gray-500">
        {crumbs.map((crumb, index) => (
          <li key={index} className={`flex items-center${index === 0? ' pl-[50px]':''}`}>
            {index === crumbs.length - 1 ? (
              <span className="text-gray-800 font-bold text-2xl">{crumb.text}</span>
            ) : (
              <Link href={crumb.path}>
                <div className="text-gray-800 font-bold text-2xl underline">{crumb.text}</div>
              </Link>
            )}
            {index !== crumbs.length - 1 && (
              <svg className="h-4 w-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M9 5l7 7-7 7"></path>
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
