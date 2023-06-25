import matter from 'gray-matter';
import { Octokit } from 'octokit';
import slugify from 'slugify';
import type Post from '~/interfaces/post';
import { GITHUB_REPO_NAME, GITHUB_USERNAME } from './constants';

type TLabel =
  | 'unlisted'
  | 'blog'
  | 'book'
  | 'draft'
  | 'project'
  | (string & {});

interface GetAllDocsParams<T> {
  labels: TLabel[];
  fields: T[];
  limit?: number;
}

interface GetDocBySlugParams
  extends Omit<GetAllDocsParams<string>, 'limit' | 'tags'> {
  slug: string;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const REPO = `${GITHUB_USERNAME}/${GITHUB_REPO_NAME}`;

async function getDocBySlug({
  labels: label,
  fields = [],
  slug
}: GetDocBySlugParams) {
  const {
    data: { items }
  } = await octokit.rest.search.issuesAndPullRequests({
    q: `repo:${REPO} is:issue is:open label:${label} in:title ${slug.replaceAll(
      '-',
      ' '
    )}`
  });
  const item = items[0];

  if (!item) return null;

  const { body, title, created_at: date } = item;

  const { data, content } = matter(body);

  const props: Record<string, string | undefined> = {
    title
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      props[field] = slug;
    }

    if (field === 'content') {
      props[field] = content;
    }

    if (field === 'date' && typeof data[field] === 'undefined') {
      props[field] = date;
    }

    if (typeof data[field] !== 'undefined') {
      props[field] = data[field];
    }
  });

  return props;
}

async function getAllDocs({
  labels,
  fields = [],
  limit
}: GetAllDocsParams<string>) {
  const data = await octokit.rest.issues
    .listForRepo({
      owner: GITHUB_USERNAME,
      repo: GITHUB_REPO_NAME,
      creator: GITHUB_USERNAME,
      labels: labels.join(','),
      per_page: limit,
      sort: 'created',
      direction: 'desc',
      state: 'open'
    })
    .then(({ data }) => data);
  const slugs = data.map(({ title }) =>
    slugify(title, { lower: true, replacement: '-' })
  );
  const docs = await Promise.all(
    slugs.map((slug) => getDocBySlug({ slug, fields, labels }))
  );
  return docs;
}

type TPostFields = keyof Post;

export const getPostBySlug = async (slug: string, fields: TPostFields[] = []) =>
  await getDocBySlug({ labels: ['blog', 'unlisted', 'draft'], slug, fields });

export const getAllPosts = async (params: GetAllDocsParams<TPostFields>) =>
  await getAllDocs({ labels: 'blog', ...params });
