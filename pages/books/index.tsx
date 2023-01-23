import { Layout } from '~/components/layout';
import { getAllBooks } from '~/lib/api';
import type Post from '~/interfaces/post';
import { BookPreview } from '~/components/book-preview';
import type { GetStaticProps } from 'next';

interface Props {
  allBooks: Post[];
}

export default function BookIndex({ allBooks }: Props) {
  return (
    <Layout
      title='Readings'
      className='space-y-4'
      intro={{
        title: 'Readings',
        description: "Notes from books I've read."
      }}>
      <div className='space-y-8 md:space-y-10'>
        {allBooks.length ? (
          allBooks.map((post) => (
            <BookPreview
              key={post.slug}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              coverImage={post?.coverImage}
            />
          ))
        ) : (
          <p className='text-center'>
            {"There's"} nothing in here... <i>Yet</i>.
          </p>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allBooks = await getAllBooks({
    fields: ['title', 'date', 'slug', 'excerpt', 'coverImage']
  });

  return {
    props: { allBooks },
    revalidate: 10
  };
};
