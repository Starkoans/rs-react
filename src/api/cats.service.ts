import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Cat } from '@/sources/types/cat';
import {
  API_BASE_URL,
  API_ENDPOINTS,
  API_KEY,
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from '@/sources/constants';

interface CatsBreedQueryParams {
  breed?: string;
  limit?: number;
  page?: number;
}

export const catsApi = createApi({
  reducerPath: 'catsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('x-api-key', API_KEY);
      return headers;
    },
  }),
  tagTypes: ['Cats'],

  endpoints: (build) => ({
    getAllCatsByBreed: build.query<Cat.BreedsResponse, CatsBreedQueryParams>({
      query: ({ breed }) => {
        return breed
          ? `${API_BASE_URL}${API_ENDPOINTS.breeds}${API_ENDPOINTS.search}/?q=${breed}`
          : `${API_BASE_URL}${API_ENDPOINTS.breeds}`;
      },

      transformResponse: (response: Cat.Breed[], _, arg) => {
        const {
          page = PAGINATION_DEFAULT_PAGE,
          limit = PAGINATION_DEFAULT_LIMIT,
        } = arg;
        const start = (page - 1) * limit;
        const catsPage = response.slice(start, start + limit);

        return {
          data: catsPage,
          pagination: {
            limit,
            page,
            totalItems: response.length,
            totalPages: Math.ceil(response.length / limit),
          },
        };
      },

      providesTags: (result) => (result ? [{ type: 'Cats', id: 'List' }] : []),
    }),

    getCatById: build.query<Cat.Breed, string>({
      query: (id: string) => `${API_BASE_URL}${API_ENDPOINTS.breeds}/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Cats', id }],
    }),

    getCatImg: build.query<Cat.Image, string>({
      query: (imageId: string) =>
        `${API_BASE_URL}${API_ENDPOINTS.images}/${imageId}`,
      providesTags: (_res, _err, id) => [{ type: 'Cats', id }],
    }),
  }),
});

export const {
  useLazyGetAllCatsByBreedQuery,
  useGetAllCatsByBreedQuery,
  useGetCatByIdQuery,
  useGetCatImgQuery,
} = catsApi;
