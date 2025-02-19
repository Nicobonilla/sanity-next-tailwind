import { GetUnitBusinessListQueryResult } from '@/sanity.types';
import clsx from 'clsx';

interface TagFilterProps {
  currentTag: string | null;
  filteredUnitBusiness: GetUnitBusinessListQueryResult;
  onTagClick: (tagSlug: string | null) => void;
}

export default function TagFilter({
  currentTag,
  filteredUnitBusiness,
  onTagClick,
}: TagFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {/* Botón "Todos" */}
      <button
        onClick={() => onTagClick(null)}
        className={clsx(
          'rounded-full px-3 py-1 text-sm font-medium transition-colors',
          {
            'bg-gray-800 text-white': currentTag === null,
            'bg-gray-100 text-gray-700 hover:bg-gray-200': currentTag !== null,
          }
        )}
      >
        Todos
      </button>

      {/* Botones de categorías */}
      {filteredUnitBusiness.map((tag, index) => (
        <button
          key={tag?.slug || index}
          onClick={() => onTagClick(tag?.slug || null)}
          className={clsx(
            'rounded-full px-3 py-1 text-sm font-medium transition-all ease-in',
            'duration-300 hover:-translate-y-1 hover:scale-105',
            currentTag == tag?.slug
              ? 'bg-gray-800 text-white'
              : tag.color || 'bg-gray-100 text-gray-700'
          )}
        >
          {tag?.title}
        </button>
      ))}
    </div>
  );
}
