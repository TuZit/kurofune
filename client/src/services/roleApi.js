import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roleApi = createApi({
  reducerPath: 'roleApi',

  // baseQuery: fetchBaseQuery({
  //   baseUrl,
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = localStorage.getItem('currentUser')
  //       ? JSON.parse(localStorage.getItem('currentUser')).access_token
  //       : null;
  //     if (token) {
  //       headers.set('authorization', `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }),

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/post' }),
  tagTypes: ['Role'],
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => `/all`,
      providesTags: ['Role'],
    }),

    addRole: builder.mutation({
      query: (role) => ({
        url: '/create',
        method: 'POST',
        body: role,
      }),
      invalidatesTags: ['Role'],
    }),

    updateRole: builder.mutation({
      query: (role, id) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: role,
      }),
      invalidatesTags: ['Role'],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
