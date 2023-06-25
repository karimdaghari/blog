import { PostBody } from '~/components/post-body';
import { PostHeader } from '~/components/post-header';
import { Layout } from '~/components/layout';
import { getPostBySlug, getAllPosts } from '~/lib/api';
import markdownToHtml from '~/lib/markdownToHtml';
import type PostType from '~/interfaces/post';
import Error from 'next/error';
import { useRouter } from 'next/router';
import type { GetStaticProps, GetStaticPaths } from 'next';

interface Props {
  post: PostType;
  morePosts: PostType[];
}

export default function Post({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <Error statusCode={404} />;
  }
  return (
    <Layout title={post.title} description={post.excerpt}>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article className='pb-10 lg:pb-32'>
            <PostHeader
              title={post.title}
              coverImage={post?.coverImage}
              date={post.date}
              excerpt={post?.excerpt}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params
}: {
  params: {
    slug: string;
  };
}) => {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'coverImage',
    'excerpt'
  ]);

  if (!post) {
    return {
      notFound: true
    };
  }

  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content
      }
    },
    revalidate: 10
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts({ fields: ['slug'], labels: ['blog'] });

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      };
    }),
    fallback: 'blocking'
  };
};
