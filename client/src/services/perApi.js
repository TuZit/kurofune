import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const perApi = createApi({
  reducerPath: 'perApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62642ce498095dcbf92c71ce.mockapi.io/api/',
  }),
  tagTypes: ['Per'],

  endpoints: (builder) => ({
    getPer: builder.query({
      query: () => '/permission',
      providesTags: ['Per'],
    }),

    addPer: builder.mutation({
      query: (role) => ({
        url: '/permission',
        method: 'POST',
        body: { name: role },
      }),
      invalidatesTags: ['Per'],
    }),

    updatePer: builder.mutation({
      query: (role, id) => ({
        url: `/permission/${id}`,
        method: 'PUT',
        body: role,
      }),
      invalidatesTags: ['Per'],
    }),

    deletePer: builder.mutation({
      query: (id) => ({
        url: `/permission/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Per'],
    }),
  }),
});

export const {
  useGetPerQuery,
  useAddPerMutation,
  useUpdatePerMutation,
  useDeletePerMutation,
} = perApi;
