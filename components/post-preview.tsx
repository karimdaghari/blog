import { DateFormatter } from './date-formatter';
import { ItemPreview } from './item-preview';

interface Props {
  title: string;
  date: string;
  slug: string;
}

export function PostPreview({ title, date, slug }: Props) {
  return (
    <ItemPreview
      slug={slug}
      title={title}
      aside={<DateFormatter dateString={date} />}
    />
  );
}
