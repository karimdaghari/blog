import { Layout } from '~/components/layout';
import { getAllPosts } from '~/lib/api';
import type Post from '~/interfaces/post';
import { PostPreview } from '~/components/post-preview';
import type { GetStaticProps } from 'next';

interface Props {
  allPosts: Post[];
}

export default function BlogIndex({ allPosts }: Props) {
  return (
    <Layout
      title='Blog'
      description='Thoughts, ideas, and ramblings.'
      className='space-y-4'
      intro={{
        title: 'Blog',
        description: 'Thoughts, ideas, and ramblings.'
      }}>
      <div className='space-y-8 md:space-y-10'>
        {allPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts({
    fields: ['title', 'date', 'slug', 'excerpt']
  });

  return {
    props: { allPosts },
    revalidate: 10
  };
};
