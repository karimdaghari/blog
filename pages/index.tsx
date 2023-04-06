import { Layout } from '~/components/layout';
import { getAllPosts } from '~/lib/api';
import type Post from '~/interfaces/post';
import { PostPreview } from '~/components/post-preview';
import type { GetStaticProps } from 'next';

interface Props {
  posts: Post[];
  books: Post[];
}

export default function Index({ posts }: Props) {
  return (
    <Layout title='Hello' className='space-y-8 md:space-y-10'>
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          date={post.date}
          slug={post.slug}
        />
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts({
    fields: ['title', 'date', 'slug']
  });

  return {
    props: { posts },
    revalidate: 30
  };
};
