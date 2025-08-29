import { oc } from '@orpc/contract';
import { CreatePostSchema } from '@repo/db/schema';
import * as v from 'valibot';

const postWithIdErrors = {
  MISSING_POST: {
    status: 404,
    data: v.object({
      postId: v.string(),
    }),
  },
} as const;

const postContract = oc
  .prefix('/posts')
  .tag('post')
  .router({
    all: oc
      .route({
        method: 'GET',
        path: '/',
        summary: 'List all posts',
        description: 'Retrieve all posts from all users',
      })
      .output(
        v.array(
          v.object({
            id: v.string(),
            title: v.string(),
            createdAt: v.string(),
          }),
        ),
      ),

    one: oc
      .route({
        method: 'GET',
        path: '/{id}',
        summary: 'Retrieve a post',
        description:
          'Retrieve the full details of a post using its unique identifier',
      })
      .errors(postWithIdErrors)
      .input(v.object({ id: v.pipe(v.string(), v.uuid()) }))
      .output(
        v.object({
          id: v.string(),
          title: v.string(),
          content: v.string(),
          createdAt: v.string(),
          author: v.object({
            id: v.string(),
            name: v.string(),
          }),
        }),
      ),

    create: oc
      .route({
        method: 'POST',
        path: '/',
        summary: 'Create a new post',
        description: 'Create a new post with title and content.',
      })
      .input(CreatePostSchema)
      .output(v.object({})),

    delete: oc
      .route({
        method: 'DELETE',
        path: '/{id}',
        summary: 'Delete a post',
        description: 'Permanently remove a post using its unique identifier',
      })
      .errors(postWithIdErrors)
      .input(v.object({ id: v.pipe(v.string(), v.uuid()) }))
      .output(v.object({})),
  });

export default postContract;
