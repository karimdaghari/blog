import matter from 'gray-matter';
import { Octokit } from 'octokit';
import slugify from 'slugify';
import { GITHUB_REPO_NAME, GITHUB_USERNAME } from './constants';

type TLabel = 'blog' | 'book';

interface IGetAllDocs<T> {
  label: TLabel;
  fields: T[];
  limit?: number;
}

interface IGetDocBySlug extends Omit<IGetAllDocs<string>, 'limit' | 'tags'> {
  slug: string;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const REPO = `${GITHUB_USERNAME}/${GITHUB_REPO_NAME}`;

async function getDocBySlug({ label, fields = [], slug }: IGetDocBySlug) {
  const {
    data: {
      items: [{ body, title, created_at: date }]
    }
  } = await octokit.rest.search.issuesAndPullRequests({
    q: `repo:${REPO} is:issue is:open label:${label} in:title ${slug.replaceAll(
      '-',
      ' '
    )}`
  });
  const { data, content } = matter(body);

  const items: Record<string, string | undefined> = {
    title
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }

    if (field === 'content') {
      items[field] = content;
    }

    if (field === 'date' && typeof data[field] === 'undefined') {
      items[field] = date;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

async function getAllDocs({ label, fields = [], limit }: IGetAllDocs<string>) {
  const { data: ghData } = await octokit.rest.issues.listForRepo({
    owner: GITHUB_USERNAME,
    repo: GITHUB_REPO_NAME,
    creator: GITHUB_USERNAME,
    labels: label,
    per_page: limit,
    sort: 'created',
    direction: 'desc',
    state: 'open'
  });
  const slugs = ghData.map(({ title }) =>
    slugify(title, { lower: true, replacement: '-' })
  );
  const docs = await Promise.all(
    slugs.map((slug) => getDocBySlug({ slug, fields, label }))
  );
  return docs;
}

type TField = 'slug' | 'content' | 'title' | 'date' | 'excerpt' | 'coverImage';

export const getPostBySlug = async (slug: string, fields: TField[] = []) =>
  await getDocBySlug({ label: 'blog', slug, fields });

export const getBookBySlug = async (slug: string, fields: TField[] = []) =>
  await getDocBySlug({ label: 'book', slug, fields });

type IGetAllPosts = Omit<IGetAllDocs<TField>, 'label'>;

export const getAllPosts = async (params: IGetAllPosts) =>
  await getAllDocs({ label: 'blog', ...params });

export const getAllBooks = async (params: IGetAllPosts) =>
  await getAllDocs({ label: 'book', ...params });
