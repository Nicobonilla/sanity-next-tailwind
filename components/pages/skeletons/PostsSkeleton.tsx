import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function PostsSkeleton() {
  const path = usePathname();
  return (
    <main>
      {/* Botones de filtrado */}
      <div className="mb-8 flex flex-wrap gap-2">
        {/* Botón "Todos" */}
        <button
          className={clsx(
            'rounded-full px-3 py-1 text-sm font-medium transition-colors'
          )}
        ></button>

        {/* Botones de categorías */}
        <button
          className={clsx(
            'rounded-full px-3 py-1 text-sm font-medium transition-all ease-in',
            'duration-300 hover:-translate-y-1 hover:scale-105'
          )}
        ></button>
      </div>

      {/* Lista de posts */}
      <div className="grid gap-6">
        <div>
          <div className="group">
            <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
              <div className="grid gap-4 md:grid-cols-[300px_1fr]">
                <div className="relative h-48 overflow-hidden md:h-full"></div>
                <div className="flex flex-col gap-4 p-4">
                  {path == '/blog' ||
                    (path == '/' && (
                      <div>
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-sm font-medium`}
                        ></span>
                      </div>
                    ))}
                  <h3 className="text-lg font-semibold text-gray-700 group-hover:underline"></h3>
                  <p className="font-robotoslab text-sm font-light text-gray-900"></p>
                  <div>
                    <span
                      className={`mr-2 inline-block rounded-full px-3 py-1 text-sm font-medium`}
                    ></span>
                    <time className="text-sm text-gray-500 dark:text-gray-400"></time>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
