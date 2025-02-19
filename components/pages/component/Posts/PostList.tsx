import { GetPostListQueryResult } from '@/sanity.types';
import ItemPostList from './ItemPostList';

interface PostListProps {
  posts: GetPostListQueryResult;
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid gap-6">
      {posts.length > 0 ? (
        posts.map((post, index) => (
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
  );
}
