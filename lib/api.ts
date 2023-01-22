import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

type TDir = 'blog' | 'books';

function getDocsDirectory(dir: TDir) {
  return join(process.cwd(), `_posts/${dir}`);
}

interface IGetAllDocs<T> {
  dir: TDir;
  fields: T[];
  limit?: number;
  tags?: string[];
}

interface IGetDocBySlug extends Omit<IGetAllDocs<string>, 'limit' | 'tags'> {
  slug: string;
}

function getDocBySlug({ dir, fields = [], slug }: IGetDocBySlug) {
  const realSlug = slug.replace(/\.md(x?)$/, '');
  const docsDirectory = getDocsDirectory(dir);
  const fullPath = join(docsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Record<string, string | undefined> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

function getAllDocs({ dir, fields = [], limit, tags }: IGetAllDocs<string>) {
  const directory = getDocsDirectory(dir);
  const slugs = fs.readdirSync(directory);
  const docs = slugs
    .map((slug) => getDocBySlug({ slug, fields, dir }))
    .filter((post) =>
      !tags?.length ? true : tags.some((tag) => post.tags?.includes(tag))
    )
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .slice(0, limit);
  return docs;
}

type TField =
  | 'slug'
  | 'content'
  | 'title'
  | 'date'
  | 'excerpt'
  | 'coverImage'
  | 'tags';

export const getPostBySlug = (slug: string, fields: TField[] = []) =>
  getDocBySlug({ dir: 'blog', slug, fields });

export const getBookBySlug = (slug: string, fields: TField[] = []) =>
  getDocBySlug({ dir: 'books', slug, fields });

type IGetAllPosts = Omit<IGetAllDocs<TField>, 'dir'>;

export const getAllPosts = (params: IGetAllPosts) =>
  getAllDocs({ dir: 'blog', ...params });

export const getAllBooks = (params: IGetAllPosts) =>
  getAllDocs({ dir: 'books', ...params });

export const getAllTags = (dir: TDir) => {
  const docs = getAllDocs({ dir, fields: ['tags'] });
  const tags: Record<string, number> = docs
    .flatMap((doc) => doc.tags)
    .filter((tag) => tag)
    .reduce((a, b) => (a[b] = a[b] + 1 || 1) && a, {});

  return tags;
};
