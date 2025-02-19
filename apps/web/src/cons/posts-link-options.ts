import { linkOptions } from '@tanstack/react-router';
import * as v from 'valibot';

export const postsSearchSchema = v.object({
  searchString: v.fallback(v.string(), ''),
  sortDirection: v.fallback(v.picklist(['asc', 'desc']), 'asc'),
});

export const postsSearchDefaults = v.getFallbacks(postsSearchSchema);

export const postsLinkOptions = linkOptions({
  to: '/posts',
  search: postsSearchDefaults,
});
