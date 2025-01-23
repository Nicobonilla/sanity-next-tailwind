'use client';
import {
  GetPostListQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';
import { useState } from 'react';
import ItemPostList from './ItemPostList';
import { OpenstackOriginal } from 'devicons-react';

export default function Posts({
  posts,
  unitBusiness,
}: {
  posts: GetPostListQueryResult;
  unitBusiness: GetUnitBusinessListQueryResult;
}) {
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] =
    useState<GetPostListQueryResult>(posts);

  const handleTagClick = (tagSlug: string | null): void => {
    setCurrentTag(tagSlug);
    setFilteredPosts(
      tagSlug
        ? posts.filter((post) => post?.unitBusiness?.slug === tagSlug)
        : posts
    );
  };

  // Filtrar unitBusiness para solo incluir aquellos que tengan publicaciones asociadas
  const filteredUnitBusiness = unitBusiness.filter((tag) =>
    posts.some((post) => post.unitBusiness?.slug === tag.slug)
  );

  console.log('filteredUnitBusiness: ', filteredUnitBusiness);
  console.log('unitBusiness: ', unitBusiness);
  return (
    <main>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => handleTagClick(null)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            currentTag === null
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todos
        </button>
        {filteredUnitBusiness.length > 0 &&
          filteredUnitBusiness.map(
            (tag: GetUnitBusinessListQueryResult[number], index: number) => {
              return (
                tag?.slug &&
                tag?.title && (
                  <button
                    key={tag?.slug || index || 'slug-default'}
                    onClick={() => handleTagClick(tag?.slug)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      tag.color || 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag?.title}
                  </button>
                )
              );
            }
          )}
      </div>
      <div className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index}>
              <ItemPostList post={post} />
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-600 dark:text-gray-400">
            No se encontraron posts para esta categoría.
          </div>
        )}
      </div>
    </main>
  );
}
