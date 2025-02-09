import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3002/api' : '/api';

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Horse', 'RidingLog', 'MedicalRecord'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    getProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),
    signout: builder.mutation({
      queryFn: () => {
        localStorage.removeItem('token');
        return { data: null };
      },
      invalidatesTags: ['User'],
    }),
    getHorses: builder.query({
      query: () => '/horses',
      providesTags: ['Horse'],
    }),
    getHorse: builder.query({
      query: (id) => `/horses/${id}`,
      providesTags: ['Horse'],
      transformResponse: (response) => {
        response.media.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return response;
      },
    }),
    addHorse: builder.mutation({
      query: (newHorse) => ({
        url: '/horses',
        method: 'POST',
        body: newHorse,
      }),
      invalidatesTags: ['Horse'],
    }),
    updateHorse: builder.mutation({
      query: ({ id, ...updatedHorse }) => ({
        url: `/horses/${id}`,
        method: 'PUT',
        body: updatedHorse,
      }),
      invalidatesTags: ['Horse'],
    }),
    deleteHorse: builder.mutation({
      query: (id) => ({
        url: `/horses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Horse'],
    }),
    addHorseMedia: builder.mutation({
      query: ({ id, media }) => ({
        url: `/horses/${id}/media`,
        method: 'POST',
        body: media,
      }),
      invalidatesTags: ['Horse'],
    }),
    deleteHorseMedia: builder.mutation({
      query: (mediaId) => ({
        url: `/horses/media/${mediaId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Horse'],
    }),
    getRidingLogs: builder.query({
      query: () => '/riding-logs',
      providesTags: ['RidingLog'],
    }),
    addRidingLog: builder.mutation({
      query: (newLog) => ({
        url: '/riding-logs',
        method: 'POST',
        body: newLog,
      }),
      invalidatesTags: ['RidingLog', 'Horse'],
    }),
    updateRidingLog: builder.mutation({
      query: ({ id, ...updatedLog }) => ({
        url: `/riding-logs/${id}`,
        method: 'PUT',
        body: updatedLog,
      }),
      invalidatesTags: ['RidingLog', 'Horse'],
    }),
    deleteRidingLog: builder.mutation({
      query: (id) => ({
        url: `/riding-logs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RidingLog', 'Horse'],
    }),
    getMedicalRecords: builder.query({
      query: () => '/medical-records',
      providesTags: ['MedicalRecord'],
    }),
    addMedicalRecord: builder.mutation({
      query: (newRecord) => ({
        url: '/medical-records',
        method: 'POST',
        body: newRecord,
      }),
      invalidatesTags: ['MedicalRecord', 'Horse'],
    }),
    updateMedicalRecord: builder.mutation({
      query: ({ id, ...updatedRecord }) => ({
        url: `/medical-records/${id}`,
        method: 'PUT',
        body: updatedRecord,
      }),
      invalidatesTags: ['MedicalRecord', 'Horse'],
    }),
    deleteMedicalRecord: builder.mutation({
      query: (id) => ({
        url: `/medical-records/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MedicalRecord', 'Horse'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useSignoutMutation,
  useGetHorsesQuery,
  useGetHorseQuery,
  useAddHorseMutation,
  useUpdateHorseMutation,
  useDeleteHorseMutation,
  useAddHorseMediaMutation,
  useDeleteHorseMediaMutation,
  useGetRidingLogsQuery,
  useAddRidingLogMutation,
  useUpdateRidingLogMutation,
  useDeleteRidingLogMutation,
  useGetMedicalRecordsQuery,
  useAddMedicalRecordMutation,
  useUpdateMedicalRecordMutation,
  useDeleteMedicalRecordMutation,
} = apiSlice;
