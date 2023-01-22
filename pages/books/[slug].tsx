import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { PostBody } from '~/components/post-body';
import { Layout } from '~/components/layout';
import markdownToHtml from '~/lib/markdownToHtml';
import type PostType from '~/interfaces/post';
import { getBookBySlug, getAllBooks } from '~/lib/api';
import Link from 'next/link';
import { DateFormatter } from '~/components/date-formatter';

interface Props {
  book: PostType;
}

export default function Book({ book }: Props) {
  const router = useRouter();
  if (!router.isFallback && !book?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout title={book.title} description={book.excerpt}>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article className='flex flex-col pt-20 pb-32 lg:flex-row lg:space-x-5'>
            <div className='hidden space-y-2 lg:inline-block lg:w-1/4'>
              <div className='w-full bg-gray-200 rounded-lg h-[25rem]' />
              <span className='inline-block'>
                <DateFormatter dateString={book.date} />
              </span>
            </div>
            <div className='w-full lg:w-3/4'>
              <div className='-space-y-0.5'>
                <Link
                  href='/books'
                  className='inline-block hover:underline underline-offset-2'>
                  Books / {book.title}
                </Link>
                <h1>{book.title}</h1>
              </div>

              <div className='py-4 space-y-2 lg:py-0 lg:hidden lg:w-1/4'>
                <div className='w-full bg-gray-200 rounded-lg h-[25rem]' />
                <span className='inline-block'>
                  <DateFormatter dateString={book.date} />
                </span>
              </div>

              <PostBody content={book.content} />
            </div>
          </article>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({
  params
}: {
  params: {
    slug: string;
  };
}) {
  const book = getBookBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'coverImage'
  ]);
  const content = await markdownToHtml(book.content || '');

  return {
    props: {
      book: {
        ...book,
        content
      }
    }
  };
}

export async function getStaticPaths() {
  const books = getAllBooks({ fields: ['slug'] });

  return {
    paths: books.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      };
    }),
    fallback: false
  };
}
