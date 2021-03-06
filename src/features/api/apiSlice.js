import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  // Defines the expected top-level state slice field for the generated reducer.
  // The cache reducer expects to be added at `state.api` (already defualt - this is optional).
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  // Decaring an array of string tag names for data types such as "Post".
  tagTypes: ['Post'],
  // Endpoints: A set of operations that we've defined for interacting with this server(data fetching or changing).
  endpoints: (builder) => ({
    // Endpoints can be queries, which return data for caching, or mutaions, which send an update to the server.
    // /fakeApi/posts
    getPosts: builder.query({
      query: () => '/posts',
      // List a set of tags describing the data in that query.
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    // Send the updates to server.
    // Mutation hooks return an array with two values:
    // The first value is a 'trigger function'. When called, it makes the request to the server, with whatever argument you provide.
    // The second value is an object with metadata about the current in-progress request.
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        // Include the entire object as the body of the request.
        body: initialPost,
      }),
      // List a set of tags that are invalidated every time that mutaion runs.
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
    }),
  }),
})

// The React hook is generated by RTK Query's React integration for every endpoint we define.
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = apiSlice
