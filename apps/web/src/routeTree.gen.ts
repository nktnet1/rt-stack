/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as noauthNoauthImport } from './routes/(noauth)/_noauth'
import { Route as authPostsIndexImport } from './routes/(auth)/posts/index'

// Create Virtual Routes

const noauthImport = createFileRoute('/(noauth)')()
const IndexLazyImport = createFileRoute('/')()
const noauthNoauthRegisterLazyImport = createFileRoute(
  '/(noauth)/_noauth/register',
)()
const noauthNoauthLoginLazyImport = createFileRoute('/(noauth)/_noauth/login')()

// Create/Update Routes

const noauthRoute = noauthImport.update({
  id: '/(noauth)',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const noauthNoauthRoute = noauthNoauthImport.update({
  id: '/_noauth',
  getParentRoute: () => noauthRoute,
} as any)

const authPostsIndexRoute = authPostsIndexImport.update({
  id: '/(auth)/posts/',
  path: '/posts/',
  getParentRoute: () => rootRoute,
} as any)

const noauthNoauthRegisterLazyRoute = noauthNoauthRegisterLazyImport
  .update({
    id: '/register',
    path: '/register',
    getParentRoute: () => noauthNoauthRoute,
  } as any)
  .lazy(() =>
    import('./routes/(noauth)/_noauth.register.lazy').then((d) => d.Route),
  )

const noauthNoauthLoginLazyRoute = noauthNoauthLoginLazyImport
  .update({
    id: '/login',
    path: '/login',
    getParentRoute: () => noauthNoauthRoute,
  } as any)
  .lazy(() =>
    import('./routes/(noauth)/_noauth.login.lazy').then((d) => d.Route),
  )

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
    '/(noauth)': {
      id: '/(noauth)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof noauthImport
      parentRoute: typeof rootRoute
    }
    '/(noauth)/_noauth': {
      id: '/(noauth)/_noauth'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof noauthNoauthImport
      parentRoute: typeof noauthRoute
    }
    '/(noauth)/_noauth/login': {
      id: '/(noauth)/_noauth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof noauthNoauthLoginLazyImport
      parentRoute: typeof noauthNoauthImport
    }
    '/(noauth)/_noauth/register': {
      id: '/(noauth)/_noauth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof noauthNoauthRegisterLazyImport
      parentRoute: typeof noauthNoauthImport
    }
    '/(auth)/posts/': {
      id: '/(auth)/posts/'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof authPostsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface noauthNoauthRouteChildren {
  noauthNoauthLoginLazyRoute: typeof noauthNoauthLoginLazyRoute
  noauthNoauthRegisterLazyRoute: typeof noauthNoauthRegisterLazyRoute
}

const noauthNoauthRouteChildren: noauthNoauthRouteChildren = {
  noauthNoauthLoginLazyRoute: noauthNoauthLoginLazyRoute,
  noauthNoauthRegisterLazyRoute: noauthNoauthRegisterLazyRoute,
}

const noauthNoauthRouteWithChildren = noauthNoauthRoute._addFileChildren(
  noauthNoauthRouteChildren,
)

interface noauthRouteChildren {
  noauthNoauthRoute: typeof noauthNoauthRouteWithChildren
}

const noauthRouteChildren: noauthRouteChildren = {
  noauthNoauthRoute: noauthNoauthRouteWithChildren,
}

const noauthRouteWithChildren =
  noauthRoute._addFileChildren(noauthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof noauthNoauthRouteWithChildren
  '/login': typeof noauthNoauthLoginLazyRoute
  '/register': typeof noauthNoauthRegisterLazyRoute
  '/posts': typeof authPostsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof noauthNoauthRouteWithChildren
  '/login': typeof noauthNoauthLoginLazyRoute
  '/register': typeof noauthNoauthRegisterLazyRoute
  '/posts': typeof authPostsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/(noauth)': typeof noauthRouteWithChildren
  '/(noauth)/_noauth': typeof noauthNoauthRouteWithChildren
  '/(noauth)/_noauth/login': typeof noauthNoauthLoginLazyRoute
  '/(noauth)/_noauth/register': typeof noauthNoauthRegisterLazyRoute
  '/(auth)/posts/': typeof authPostsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/register' | '/posts'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/register' | '/posts'
  id:
    | '__root__'
    | '/'
    | '/(noauth)'
    | '/(noauth)/_noauth'
    | '/(noauth)/_noauth/login'
    | '/(noauth)/_noauth/register'
    | '/(auth)/posts/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  noauthRoute: typeof noauthRouteWithChildren
  authPostsIndexRoute: typeof authPostsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  noauthRoute: noauthRouteWithChildren,
  authPostsIndexRoute: authPostsIndexRoute,
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
        "/(noauth)",
        "/(auth)/posts/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/(noauth)": {
      "filePath": "(noauth)",
      "children": [
        "/(noauth)/_noauth"
      ]
    },
    "/(noauth)/_noauth": {
      "filePath": "(noauth)/_noauth.tsx",
      "parent": "/(noauth)",
      "children": [
        "/(noauth)/_noauth/login",
        "/(noauth)/_noauth/register"
      ]
    },
    "/(noauth)/_noauth/login": {
      "filePath": "(noauth)/_noauth.login.lazy.tsx",
      "parent": "/(noauth)/_noauth"
    },
    "/(noauth)/_noauth/register": {
      "filePath": "(noauth)/_noauth.register.lazy.tsx",
      "parent": "/(noauth)/_noauth"
    },
    "/(auth)/posts/": {
      "filePath": "(auth)/posts/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
