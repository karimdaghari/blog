import { unified } from 'unified';
import html from 'remark-html';
import gfm from 'remark-gfm';
import parser from 'remark-parse';

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(parser)
    .use(gfm)
    .use(html)
    .process(markdown);
  return result.toString();
}
