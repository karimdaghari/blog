import { Layout } from '~/components/layout';
import { getAllPosts, getAllTags } from '~/lib/api';
import type Post from '~/interfaces/post';
import { PostPreview } from '~/components/post-preview';

interface Props {
  allPosts: Post[];
  allTags?: ReturnType<typeof getAllTags>;
  selectedTags?: string[];
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

export async function getStaticProps() {
  const allPosts = getAllPosts({
    fields: ['title', 'date', 'slug', 'excerpt']
  });

  const allTags = getAllTags('blog');

  return {
    props: { allPosts, allTags }
  };
}
