import { linkOptions } from '@tanstack/react-router';
import * as v from 'valibot';

export const postsSearchSchema = v.object({
  searchString: v.fallback(v.string(), ''),
  sortDirection: v.fallback(v.picklist(['asc', 'desc']), 'desc'),
});

export type PostSearchSchema = v.InferOutput<typeof postsSearchSchema>;

export const postsSearchDefaults = v.getFallbacks(postsSearchSchema);

export const postsLinkOptions = linkOptions({
  to: '/posts',

  /**
   * If we want links to contain default values in the URL
   */
  // search: postsSearchDefaults,
});
