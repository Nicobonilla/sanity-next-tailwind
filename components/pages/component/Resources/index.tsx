import Link from 'next/link';

export interface Resource {
  title: string;
  url: string;
  description: string;
}

export default function Resources({ resources }: { resources: Resource[] }) {
  return (
    <div className="space-y-4">
      {resources &&
        resources.slice(0, 10).map((resource) => (
          <div key={resource.title} className="space-y-1">
            <Link
              href={{ pathname: resource.url }}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {resource.title}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {resource.description}
            </p>
          </div>
        ))}
    </div>
  );
}
