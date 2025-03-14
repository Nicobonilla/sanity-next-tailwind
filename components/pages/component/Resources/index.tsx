import { type ComponentProps } from '@/components/types';
import type { ResourceItem } from '@/sanity.types';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function Resources(data: ComponentProps) {
  return (
    <aside className="space-y-6">
      <div className="overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            {data?.PTextBanner && data?.PTextBanner}
          </h2>
          <div className="space-y-4">
            {data?.resources &&
              data?.resources.map(
                (
                  resource: ResourceItem,
                  index: number
                ) => (
                  <div key={index} className="space-y-1">
                    <Link
                      href={{ pathname: resource.url }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-pretty font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <span className="max-w-[calc(100%-1.5rem)] flex-1">
                        {resource.title}
                      </span>
                      <ExternalLinkIcon
                        className="size-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                    <p className="text-justify text-sm text-gray-600 dark:text-gray-400">
                      {resource.description}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </aside>
  );
}
