import {
  GetPostDetailQueryResult,
  GetPostListByUnitBusinessQueryResult,
  GetPostListQueryResult,
} from '@/sanity.types';
import { getPostDetailQuery, getPostListQuery } from '../queries/post.query';
import { sanityFetch } from '../fetch';

export async function getPostBySlugFetch(
  slug: string
): Promise<GetPostDetailQueryResult | null> {
  // Remove extra quotes if any
  const sanitizedSlug = slug.replace(/"/g, ''); // This ensures the slug has no quotes
  const query = getPostDetailQuery;
  const params = { slug: sanitizedSlug }; // Pass the sanitized slug

  try {
    const post = (await sanityFetch({
      query,
      params,
    })) as GetPostDetailQueryResult | null;

    // Si service es null, retornamos null
    if (!post) return null;
    // Transformar table of contents
    const tableOfContents =
      post.tableOfContents?.map((block: any) => ({
        _key: block._key, // Asegúrate de usar _key aquí
        style: block.style, // Mantén el estilo tal como está
        children: block.children
          ? [{ text: block.children[0]?.text || null }]
          : null, // Asegúrate de que children sea un array
      })) || null; // Si es null, asignamos null

    return {
      title: post.title || null,
      content: post.content || null,
      unitBusiness: post.unitBusiness || null,
      tableOfContents: tableOfContents || null,
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}

export async function getPostListFetch(): Promise<GetPostListQueryResult | null> {
  // Remove extra quotes if any
  const query = getPostListQuery;
  try {
    const posts = (await sanityFetch({
      query,
    })) as GetPostListQueryResult | null;

    // Si service es null, retornamos null
    if (!posts) return null;
    return posts;
  } catch (error) {
    console.error('Error fetching list of posts:', error);
    throw error;
  }
}
export async function getPostListByUnitBusinessFetch({
  slug,
}: {
  slug: string;
}): Promise<GetPostListByUnitBusinessQueryResult | null> {
  // Remove extra quotes if any
  const sanitizedSlug = slug.replace(/"/g, '');
  const query = getPostListQuery;
  const params = { slug: sanitizedSlug };
  try {
    const posts = (await sanityFetch({
      query,
      params,
    })) as GetPostListByUnitBusinessQueryResult | null;

    // Si service es null, retornamos null
    if (!posts) return null;
    return posts;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}
