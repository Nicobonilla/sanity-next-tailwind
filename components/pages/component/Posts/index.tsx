'use client';

import type {
  GetPostListQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';
import { useState } from 'react';
import TagFilter from './TagFilter';
import PostList from './PostList';

export default function Posts({
  posts,
  unitBusiness,
}: {
  posts: GetPostListQueryResult;
  unitBusiness: GetUnitBusinessListQueryResult;
}) {
  const [currentTag, setCurrentTag] = useState<string | null>(null);

  // Filtrar posts según el tag seleccionado
  const filteredPosts = currentTag
    ? posts.filter((post) => post?.unitBusiness?.slug === currentTag)
    : posts;

  // Filtrar unitBusiness para solo incluir aquellos que tengan publicaciones asociadas
  const filteredUnitBusiness = unitBusiness.filter((tag) =>
    posts.some((post) => post.unitBusiness?.slug === tag.slug)
  );

  return (
    <main>
      {/* Botones de filtrado */}
      <TagFilter
        currentTag={currentTag}
        filteredUnitBusiness={filteredUnitBusiness}
        onTagClick={setCurrentTag}
      />

      {/* Lista de posts */}
      <PostList posts={filteredPosts} />
    </main>
  );
}
