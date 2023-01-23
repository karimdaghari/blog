import { Intro } from '~/components/intro';
import { Layout } from '~/components/layout';
import { getAllBooks, getAllPosts } from '~/lib/api';
import type Post from '~/interfaces/post';
import { PostPreview } from '~/components/post-preview';
import Link from 'next/link';
import { BookPreview } from '~/components/book-preview';
import type { GetStaticProps } from 'next';

interface Props {
  posts: Post[];
  books: Post[];
}

export default function Index({ posts, books }: Props) {
  return (
    <Layout title='Hello'>
      <Intro
        title='Hello 👋🏼'
        description={
          <p>
            {"I'm"} <strong>Karim Daghari</strong>, a full-stack developer and a
            startup co-founder. I write about things I find interesting and I
            hope you do too!
          </p>
        }
      />
      <div className='space-y-32'>
        {posts.length > 0 && (
          <section className='space-y-4'>
            <div className='flex items-baseline justify-between'>
              <h5>Recent posts</h5>
              <Link href='/blog'>Read more</Link>
            </div>
            <div className='space-y-8 md:space-y-10'>
              {posts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  date={post.date}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              ))}
            </div>
          </section>
        )}
        {books.length > 0 && (
          <section className='space-y-4'>
            <div className='flex items-baseline justify-between'>
              <h5>Recent readings</h5>
              <Link href='/books'>Read more</Link>
            </div>
            <div className='space-y-8 md:space-y-10'>
              {books.map((book) => (
                <BookPreview
                  coverImage={book.coverImage}
                  key={book.slug}
                  title={book.title}
                  slug={book.slug}
                  excerpt={book.excerpt}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts({
    fields: ['title', 'date', 'slug', 'excerpt'],
    limit: 3
  });

  const books = await getAllBooks({
    fields: ['title', 'date', 'slug', 'excerpt', 'coverImage'],
    limit: 3
  });

  return {
    props: { posts, books },
    revalidate: 10
  };
};
