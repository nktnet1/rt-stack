/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PostsIndexImport } from './routes/posts/index'
import { Route as authAuthImport } from './routes/(auth)/_auth'

// Create Virtual Routes

const authImport = createFileRoute('/(auth)')()
const IndexLazyImport = createFileRoute('/')()
const authAuthRegisterLazyImport = createFileRoute('/(auth)/_auth/register')()
const authAuthLoginLazyImport = createFileRoute('/(auth)/_auth/login')()

// Create/Update Routes

const authRoute = authImport.update({
  id: '/(auth)',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PostsIndexRoute = PostsIndexImport.update({
  id: '/posts/',
  path: '/posts/',
  getParentRoute: () => rootRoute,
} as any)

const authAuthRoute = authAuthImport.update({
  id: '/_auth',
  getParentRoute: () => authRoute,
} as any)

const authAuthRegisterLazyRoute = authAuthRegisterLazyImport
  .update({
    id: '/register',
    path: '/register',
    getParentRoute: () => authAuthRoute,
  } as any)
  .lazy(() =>
    import('./routes/(auth)/_auth.register.lazy').then((d) => d.Route),
  )

const authAuthLoginLazyRoute = authAuthLoginLazyImport
  .update({
    id: '/login',
    path: '/login',
    getParentRoute: () => authAuthRoute,
  } as any)
  .lazy(() => import('./routes/(auth)/_auth.login.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/(auth)': {
      id: '/(auth)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_auth': {
      id: '/(auth)/_auth'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authAuthImport
      parentRoute: typeof authRoute
    }
    '/posts/': {
      id: '/posts/'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof PostsIndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_auth/login': {
      id: '/(auth)/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authAuthLoginLazyImport
      parentRoute: typeof authAuthImport
    }
    '/(auth)/_auth/register': {
      id: '/(auth)/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof authAuthRegisterLazyImport
      parentRoute: typeof authAuthImport
    }
  }
}

// Create and export the route tree

interface authAuthRouteChildren {
  authAuthLoginLazyRoute: typeof authAuthLoginLazyRoute
  authAuthRegisterLazyRoute: typeof authAuthRegisterLazyRoute
}

const authAuthRouteChildren: authAuthRouteChildren = {
  authAuthLoginLazyRoute: authAuthLoginLazyRoute,
  authAuthRegisterLazyRoute: authAuthRegisterLazyRoute,
}

const authAuthRouteWithChildren = authAuthRoute._addFileChildren(
  authAuthRouteChildren,
)

interface authRouteChildren {
  authAuthRoute: typeof authAuthRouteWithChildren
}

const authRouteChildren: authRouteChildren = {
  authAuthRoute: authAuthRouteWithChildren,
}

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof authAuthRouteWithChildren
  '/posts': typeof PostsIndexRoute
  '/login': typeof authAuthLoginLazyRoute
  '/register': typeof authAuthRegisterLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof authAuthRouteWithChildren
  '/posts': typeof PostsIndexRoute
  '/login': typeof authAuthLoginLazyRoute
  '/register': typeof authAuthRegisterLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/(auth)': typeof authRouteWithChildren
  '/(auth)/_auth': typeof authAuthRouteWithChildren
  '/posts/': typeof PostsIndexRoute
  '/(auth)/_auth/login': typeof authAuthLoginLazyRoute
  '/(auth)/_auth/register': typeof authAuthRegisterLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/posts' | '/login' | '/register'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/posts' | '/login' | '/register'
  id:
    | '__root__'
    | '/'
    | '/(auth)'
    | '/(auth)/_auth'
    | '/posts/'
    | '/(auth)/_auth/login'
    | '/(auth)/_auth/register'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  authRoute: typeof authRouteWithChildren
  PostsIndexRoute: typeof PostsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  authRoute: authRouteWithChildren,
  PostsIndexRoute: PostsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(auth)",
        "/posts/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/(auth)": {
      "filePath": "(auth)",
      "children": [
        "/(auth)/_auth"
      ]
    },
    "/(auth)/_auth": {
      "filePath": "(auth)/_auth.tsx",
      "parent": "/(auth)",
      "children": [
        "/(auth)/_auth/login",
        "/(auth)/_auth/register"
      ]
    },
    "/posts/": {
      "filePath": "posts/index.tsx"
    },
    "/(auth)/_auth/login": {
      "filePath": "(auth)/_auth.login.lazy.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(auth)/_auth/register": {
      "filePath": "(auth)/_auth.register.lazy.tsx",
      "parent": "/(auth)/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
