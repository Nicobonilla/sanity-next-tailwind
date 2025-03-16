import React from 'react';
import BreadcrumbsSkeleton from './BreadcrumbsSkeleton';
import { IoIosArrowDown } from 'react-icons/io';

export default function PortableTextAndTocSkeleton() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <article>
        <BreadcrumbsSkeleton />
        <h1 className="h2 mb-2 ml-2 lg:mb-6"></h1>

        <div className="relative mx-2 flex w-full flex-col gap-2 md:flex-row">
          <div className="sticky left-0 top-16 z-40 w-full md:hidden">
            <nav className="sticky top-24 z-40 mb-5 w-full border-b-2 border-gray-200 bg-gray-100">
              <div className="flex cursor-pointer items-center justify-between p-1">
                <h2 className="border-l-4 border-red-500 py-1 pl-4 font-semibold"></h2>
                <div className="pr-20 md:hidden">
                  <div
                    className={`inline-block rotate-0 transition-transform duration-300`}
                  >
                    <IoIosArrowDown size={20} />
                  </div>
                </div>
              </div>
              <ul
                className={`max-h-0 overflow-auto bg-gray-100 pl-4 opacity-0 transition-all duration-300 md:max-h-full md:opacity-100`}
              >
                <li className={`ml-1 cursor-pointer pt-2 leading-extra-tight`}>
                  <a
                    className="p3 text-sm hover:text-red-500"
                    aria-hidden="true"
                  ></a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="order-2 mx-2 mb-10 md:order-1 md:w-3/4">
          </div>

          <aside className="hidden md:sticky md:top-[88px] md:order-2 md:block md:w-1/4"></aside>
        </div>
      </article>
    </div>
  );
}
