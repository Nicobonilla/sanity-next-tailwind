import {
  GetPostListByUnitBusinessQueryResult,
  GetPostListQueryResult,
  GetPostDetailQueryResult,
} from '@/sanity.types';
import {
  getPostDetailQuery,
  getPostListByUnitBusinessQuery,
  getPostListQuery,
} from '../queries/post.query';
import { sanityFetch } from '../fetch';
import { cache } from 'react';

export const getPostListFetch = cache(
  async function getPostListFetch(): Promise<GetPostListQueryResult | null> {
    // Remove extra quotes if any
    const query = getPostListQuery;
    try {
      const posts = (await sanityFetch({
        query,
        tag: 'posts-list',
      })) as GetPostListQueryResult | null;

      // Si service es null, retornamos null
      if (!posts) return null;
      return posts;
    } catch (error) {
      console.error('Error fetching list of posts:', error);
      throw error;
    }
  }
);

export const getPostListByUnitBusinessFetch = cache(
  async function getPostListByUnitBusinessFetch(
    slug: string
  ): Promise<GetPostListByUnitBusinessQueryResult | null> {
    // Remove extra quotes if any
    const sanitizedSlug = slug.replace(/"/g, '');
    const query = getPostListByUnitBusinessQuery;
    const params = { slug: sanitizedSlug };
    try {
      const posts = (await sanityFetch({
        query,
        params,
        tag: 'posts-unit',
      })) as GetPostListByUnitBusinessQueryResult | null;

      // Si service es null, retornamos null
      if (!posts) return null;
      return posts;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw error;
    }
  }
);

export const getPostBySlugFetch = cache(async function getPostBySlugFetch({
  slug,
}: {
  slug: string;
}): Promise<GetPostDetailQueryResult | null> {
  // Remove extra quotes if any
  const sanitizedSlug = slug.replace(/"/g, ''); // This ensures the slug has no quotes
  const query = getPostDetailQuery;
  const params = { slug: sanitizedSlug }; // Pass the sanitized slug

  try {
    const post = (await sanityFetch({
      query,
      params,
        tag: 'post-detail',
    })) as GetPostDetailQueryResult | null;

    if (!post) return null;
    return post;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
});
