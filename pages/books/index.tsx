import { Layout } from '~/components/layout';
import { getAllBooks } from '~/lib/api';
import type Post from '~/interfaces/post';
import { BookPreview } from '~/components/book-preview';

interface Props {
  allPosts: Post[];
}

export default function BookIndex({ allPosts }: Props) {
  return (
    <Layout
      title='Readings'
      className='space-y-4'
      intro={{
        title: 'Readings',
        description: "Notes from books I've read."
      }}>
      <div className='space-y-8 md:space-y-10'>
        {allPosts.map((post) => (
          <BookPreview
            key={post.slug}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            coverImage={post.coverImage}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllBooks({
    fields: ['title', 'date', 'slug', 'excerpt', 'coverImage']
  });

  return {
    props: { allPosts }
  };
}
