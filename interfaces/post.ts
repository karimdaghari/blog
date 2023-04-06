import type { IShared } from './shared';

interface IPost extends IShared {
  date?: string;
  coverImage?: string;
  excerpt: string;
}

export default IPost;
