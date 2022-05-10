import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62642ce498095dcbf92c71ce.mockapi.io/api/',
  }),
  tagTypes: ['Role'],

  endpoints: (builder) => ({
    getRole: builder.query({
      query: () => '/roles',
      providesTags: ['Role'],
    }),

    addRole: builder.mutation({
      query: (role) => ({
        url: '/roles',
        method: 'POST',
        body: { name: role },
      }),
      invalidatesTags: ['Role'],
    }),

    updateRole: builder.mutation({
      query: (role, id) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        body: role,
      }),
      invalidatesTags: ['Role'],
    }),

    deleteRoleByID: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
  }),
});

export const {
  useGetRoleQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleByIDMutation,
} = roleApi;
