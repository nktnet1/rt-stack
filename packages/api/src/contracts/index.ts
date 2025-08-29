import { oc } from '@orpc/contract';
import postContract from './posts';

export const appContract = oc
  .errors({
    UNAUTHORIZED: {
      status: 401,
    },
    FORBIDDEN: {
      status: 403,
    },
  })
  .router({
    posts: postContract,
  });
